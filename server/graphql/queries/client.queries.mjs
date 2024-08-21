import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import {
  ClientType,
  ClientConnectionType,
} from "../typeDefs/client.typeDefs.mjs";
import ClientModel from "../../models/ClientModel.mjs";

export const getClients = {
  type: ClientConnectionType,
  args: {
    first: { type: new GraphQLNonNull(GraphQLInt) },
    after: { type: GraphQLString },
    keyword: { type: GraphQLString },
  },
  resolve: async (_, { first, after, keyword }) => {
    const query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    if (after) {
      query._id = { $gt: after };
    }

    const clients = await ClientModel.find(query)
      .sort({ _id: 1 })
      .limit(first + 1);
    const hasNextPage = clients.length > first;
    const edges = hasNextPage ? clients.slice(0, -1) : clients;
    const endCursor =
      edges.length > 0 ? edges[edges.length - 1]._id.toString() : null;

    return {
      edges: edges,
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    };
  },
};

export const getClientById = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, args) => {
    return ClientModel.findById(args.id);
  },
};
