import { Router } from "express";
import authRouter from "./auth.routes.mjs";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "../graphql/schema.graphql.mjs";

const router = Router();

router.use("/api/v1/auth", authRouter);

router.use(
  "/api/v1/graphql",
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

//   passport.authenticate("jwt", { session: false }),

export default router;
