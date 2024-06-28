import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.mjs";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.mjs";
import passport from "passport";
import "./strategy/jwtStrategy.mjs";
import { ExtractJwt } from "passport-jwt";

const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(passport.initialize());

app.use(cors());

// app.use(
//   "/graphql",
//   createHandler({
//     schema,
//   })
// );

app.use(
  "/graphql",
  (req, res, next) => {
    const tokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = tokenExtractor(req);

    console.log(token);
    if (token)
      return passport.authenticate("jwt", { session: false })(req, res, next);
    console.log("printed");
    next();
  },
  createHandler({
    schema,
    context: ({ req }) => ({
      user: req.user, // Pass the user to the GraphQL context
    }),
  })
);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
