import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.mjs";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.mjs";
import passport from "passport";
import "./strategy/jwtStrategy.mjs";
import jwt from "jsonwebtoken";
import UserModel from "./models/UserModel.mjs";
import bcrypt from "bcrypt";

const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(passport.initialize());

app.use(cors());

app.use(
  "/api/graphql",
  passport.authenticate("jwt", { session: false }),
  createHandler({
    schema,
    context: (req) => ({
      user: req.user, // Pass the user to the GraphQL context
    }),
  })
);

app.post("/api/auth/login", async (req, res) => {
  console.log("run");
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid password" });
    const payload = { id: user.id };
    console.log(user.id);
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/api/graphql`
  );
});
