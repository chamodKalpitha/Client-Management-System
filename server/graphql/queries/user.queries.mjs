import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../typeDefs/auth.typeDefs.mjs";
import UserModel from "../../models/UserModel.mjs";

export const getUsers = {
  type: new GraphQLList(UserType),
  resolve: () => {
    return UserModel.find().select("-password");
  },
};

export const getUserByEmail = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  resolve: (_, args) => {
    return UserModel.findOne({ email: args.email }).select("-password");
  },
};
