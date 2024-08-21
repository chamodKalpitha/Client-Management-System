import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from "graphql";
import { ClientType } from "../typeDefs/client.typeDefs.mjs";
import ClientModel from "../../models/ClientModel.mjs";
import {
  createClientSchema,
  editClientSchema,
} from "../../validations/client.validations.mjs";

export const addClient = {
  type: ClientType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
    hasWhatsapp: { type: GraphQLBoolean },
    address: { type: GraphQLString },
    createdBy: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { error } = createClientSchema(args);
    if (error) throw new Error(error.details[0].message);

    const client = new ClientModel(args);
    return await client.save();
  },
};

export const editClient = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
    hasWhatsapp: { type: GraphQLBoolean },
    address: { type: GraphQLString },
    lastModifiedBy: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { error } = editClientSchema(args);
    if (error) throw new Error(error.details[0].message);

    return await ClientModel.findByIdAndUpdate(args.id, args, { new: true });
  },
};

export const deleteClient = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    return await ClientModel.findByIdAndDelete(args.id);
  },
};
