import { GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
import UserModel from "../../models/UserModel.mjs";
import { S3UrlType } from "../typeDefs/aws.typeDefs.mjs";

export const requestS3URL = {
  type: S3UrlType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    fileName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id, fileName }) => {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    const url = await generateUploadURL(fileName);
    return { url };
  },
};
