import { GraphQLSchema, GraphQLObjectType } from "graphql";
import queries from "./queries/index.queries.mjs";
import mutations from "./mutations/index.mutations.mjs";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: queries,
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: mutations,
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default schema;
