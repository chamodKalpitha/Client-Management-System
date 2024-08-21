import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../typeDefs/auth.typeDefs.mjs";
import UserModel from "../../models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    empId: { type: GraphQLString },
    address: { type: GraphQLString },
    role: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const user = new UserModel({
      ...args,
      password: hashedPassword,
    });
    return await user.save();
  },
};

export const login = {
  type: GraphQLString,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const valid = bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  },
};
