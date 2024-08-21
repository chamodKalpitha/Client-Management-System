import { GraphQLNonNull, GraphQLString } from "graphql";
import { ProjectType } from "../typeDefs/project.typeDefs.mjs";
import ProjectModel from "../../models/ProjectModel.mjs";

export const addProject = {
  type: ProjectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const project = new ProjectModel(args);
    return await project.save();
  },
};

export const updateProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    return await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
  },
};

export const deleteProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    return await ProjectModel.findByIdAndDelete(args.id);
  },
};
