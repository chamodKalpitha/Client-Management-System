import { GraphQLObjectType, GraphQLString } from "graphql";

export const S3UrlType = new GraphQLObjectType({
  name: "S3Url",
  fields: {
    url: { type: GraphQLString },
  },
});
