import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./graphqlSchema/schema.mjs";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.mjs";
import passport from "passport";
import "./strategy/jwtStrategy.mjs";
import jwt from "jsonwebtoken";
import UserModel from "./models/UserModel.mjs";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { checkSchema, matchedData, validationResult } from "express-validator";
import LoginValidationSchema from "./validationSchema/AuthSchema.mjs";
import GraphiQL from "graphiql";
import nodemailer from "nodemailer";
import hashPassword from "./utilities/hashedPassword.mjs";

const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// app.use(
//   "/api/graphql",
//   (req, res, next) => {
//     console.log("GraphQL endpoint hit");
//     next();
//   },
//   passport.authenticate("jwt", { session: false }),
//   createHandler({
//     schema,
//     context: (req) => req.raw.user,
//   })
// );

app.use(
  "/api/graphql",
  (req, res, next) => {
    console.log("GraphQL endpoint hit");
    console.log(req.body);
    next();
  },
  createHandler({
    schema,
    context: (req) => req.raw.user,
  })
);

app.post(
  "/api/auth/login",
  checkSchema(LoginValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    const { email, password, rememberMe } = matchedData(req);

    try {
      const user = await UserModel.findOne({ email });
      if (!user)
        return res.status(400).json({
          error:
            "The email or password you entered is incorrect. Please try again.",
        });
      const isPasswordMatch = bcrypt.compareSync(password, user.password);

      if (!isPasswordMatch)
        return res.status(400).send({
          error:
            "The email or password you entered is incorrect. Please try again.",
        });
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: rememberMe ? "30d" : "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : null,
      });
      const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(200).send(userWithoutPassword);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("profile endpoitn");
  }
);

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).send({ error: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "1d",
    });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL_ADDRESS,
        pass: process.env.COMPANY_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.COMPANY_EMAIL_ADDRESS,
      to: email,
      subject: "Reset Your Password",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset the password for your account. Click the link below to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${user._id}/${token}" 
         style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
      <p>Thank you,</p>
      <p>Your IT Company Team</p>
      <footer style="margin-top: 20px; font-size: 12px; color: #777;">
        <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
        <p><a href="http://localhost:5173/reset-password/${user._id}/${token}" style="color: #007bff;">http://localhost:5173/reset-password/${user._id}/${token}</a></p>
      </footer>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res
          .status(404)
          .send({ error: "Something went wrong!. Try again" });
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

app.post("/api/auth/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const passwordhashed = hashPassword(password);
  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send({ error: "User not found" });
    await UserModel.findByIdAndUpdate(id, { password: passwordhashed });
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Error with token" });
  }
});

app.get("/api/auth/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(200).send({ error: "No token" });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = await UserModel.findById(id).select("-password");
    if (!user) return res.status(404).send({ error: "User not found" });
    return res.status(200).send({ status: "Success", user: user });
  } catch (error) {
    return res.status(400).send({ error: "Error with token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/api/graphql`
  );
});
