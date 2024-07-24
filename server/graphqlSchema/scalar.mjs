import { GraphQLScalarType } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
});
