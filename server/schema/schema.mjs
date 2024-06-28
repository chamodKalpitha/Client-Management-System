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
import UserModel from "../models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    empId: { type: GraphQLString },
    address: { type: GraphQLString },
    role: { type: GraphQLString },
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

    //Users
    getUsers: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return UserModel.find().select("-password");
      },
    },

    getUserByEmail: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return UserModel.findById(args.email).select("-password");
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

    // Users

    loginUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const user = UserModel.find((user) => user.email === args.email);
        if (user && (await bcrypt.compare(args.password, user.password))) {
          return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWTSECRET,
            { expiresIn: "1h" }
          );
        }
        throw new Error("Invalid credentials");
      },
    },

    registerUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        empId: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        role: {
          type: new GraphQLEnumType({
            name: "UserRole",
            values: {
              ASSISTANT: { value: "Assistant" },
              MANAGER: { value: "Manager" },
            },
          }),
          defaultValue: "Assistant",
        },
      },
      resolve: async (_, args) => {
        const existingUser = await UserModel.findOne({ email: args.email });
        const exisitngEmpId = await UserModel.findOne({ empId: args.empId });

        if (existingUser) {
          throw new Error("User with this email already exists.");
        }

        if (exisitngEmpId) {
          throw new Error("User with this emp Id already exists.");
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(args.password, 10);

        const user = new UserModel({
          name: args.name,
          email: args.email,
          password: hashedPassword,
          empId: args.empId,
          address: args.address,
          role: args.role,
        });
        return user.save();
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return UserModel.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default schema;
