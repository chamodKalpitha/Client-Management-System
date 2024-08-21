import { GraphQLList } from "graphql";
import { ProjectType } from "../typeDefs/project.typeDefs.mjs";
import ProjectModel from "../../models/ProjectModel.mjs";

export const getProjects = {
  type: new GraphQLList(ProjectType),
  resolve: () => {
    return ProjectModel.find();
  },
};
