import {
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import ClientModel from "../models/ClientModel.mjs";
import ProjectModel from "../models/ProjectModel.mjs";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
  },
});

const ProjectType = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Projects

    getProjects: {
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return ProjectModel.find();
      },
    },

    getProjectById: {
      type: ProjectType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return ProjectModel.findById(args.id);
      },
    },
    // Clients
    getClients: {
      type: new GraphQLList(ClientType),
      resolve: () => {
        return ClientModel.find();
      },
    },
    getClientById: {
      type: ClientType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return ClientModel.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Clients
    addClients: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const client = new ClientModel({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return ClientModel.findByIdAndDelete(args.id);
      },
    },

    //Projects

    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progess" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        const project = new ProjectModel({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", // Must be unique
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progess" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: (_, args) => {
        return ProjectModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return ProjectModel.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default schema;
