import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { dateScalar } from "../scalars/date.scalar.mjs";

export const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    mobileNumber: { type: GraphQLString },
    hasWhatsapp: { type: GraphQLBoolean },
    address: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    registedDate: { type: dateScalar },
    lastModifiedBy: { type: GraphQLString },
    lastModifiedDate: { type: dateScalar },
  },
});

export const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    endCursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean },
  },
});

export const ClientConnectionType = new GraphQLObjectType({
  name: "ClientConnection",
  fields: {
    edges: { type: new GraphQLList(ClientType) },
    pageInfo: { type: PageInfoType },
  },
});
