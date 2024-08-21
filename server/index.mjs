import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.config.mjs";
import passport from "passport";
import "./strategy/jwtStrategy.mjs";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes.mjs";

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

app.use(router);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/api/graphql`
  );
});
