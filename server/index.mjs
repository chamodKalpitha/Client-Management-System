import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.mjs";
import "dotenv/config";
import connectDB from "./config/db.mjs";

const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(
  "/graphql",
  createHandler({
    schema,
  })
);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
