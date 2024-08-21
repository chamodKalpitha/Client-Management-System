import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { ClientType } from "./client.typeDefs.mjs";
import ClientModel from "../../models/ClientModel.mjs";

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return ClientModel.findById(parent.clientId);
      },
    },
  },
});
