import {
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import { dateScalar } from "./scalar.mjs";
import ClientModel from "../models/ClientModel.mjs";
import ProjectModel from "../models/ProjectModel.mjs";
import UserModel from "../models/UserModel.mjs";
import { generateUploadURL } from "../config/awsS3Config.mjs";
import bcrypt from "bcrypt";
import "dotenv/config";

//Validation
import { validateRegisterUser } from "../validationSchema/User.mjs";
import {
  validateCreateClient,
  validateEditClient,
} from "../validationSchema/Clients.mjs";
import hashPassword from "../utilities/hashedPassword.mjs";

//Client
const ClientType = new GraphQLObjectType({
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

const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    endCursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean },
  },
});

const ClientConnectionType = new GraphQLObjectType({
  name: "ClientConnection",
  fields: {
    edges: { type: new GraphQLList(ClientType) },
    pageInfo: { type: PageInfoType },
  },
});

//Projects
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

//User

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
    profilePicture: { type: GraphQLString },
  },
});

const s3UrlType = new GraphQLObjectType({
  name: "S3Url",
  fields: {
    url: { type: GraphQLString },
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

    getClientById: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return ClientModel.findById(args.id);
      },
    },

    getClientById: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return ClientModel.findById(args.id);
      },
    },
    // Clients
    getClients: {
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

        try {
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
        } catch (error) {
          throw new Error("Error fetching clients: " + error.message);
        }
      },
    },

    getClientById: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        return ClientModel.findById(args.id);
      },
    },

    //Users
    getUsers: {
      type: new GraphQLList(UserType),
      resolve: (_, args, context) => {
        // console.log(context);
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

    requestS3URL: {
      type: s3UrlType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        fileName: { type: new GraphQLNonNull(GraphQLString) }, // Added fileName argument
      },
      resolve: async (_, { id, fileName }) => {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("User not found");
        const url = await generateUploadURL(fileName);
        return { url };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Users
    registerUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        empId: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        role: {
          type: new GraphQLEnumType({
            name: "role",
            values: {
              ASSISTANT: { value: "Assistant" },
              MANAGER: { value: "Manager" },
              ADMIN: { value: "Admin" },
            },
          }),
          defaultValue: "Assistant",
        },
      },
      resolve: async (_, args) => {
        console.log("hit");
        const { error } = validateRegisterUser.validate(args);
        if (error) {
          const errorRespond = error.details.map((err) => err.message);
          console.log(errorRespond);
          throw new Error(JSON.stringify({ messages: errorRespond }));
        }

        const hashedPassword = hashPassword(args.empId);

        try {
          const exisitngEmpId = await UserModel.findOne({
            empId: args.empId,
          });

          if (exisitngEmpId) {
            return new Error(
              JSON.stringify({
                messages: ["User with this emp Id already exists."],
              })
            );
          }

          const user = new UserModel({
            name: args.name,
            email: args.email,
            password: hashedPassword,
            empId: args.empId,
            address: args.address,
            role: args.role,
          });
          return user.save();
        } catch (error) {
          throw new Error(
            JSON.stringify({
              messages: ["Something Went Wrong"],
            })
          );
        }
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

    deleteProfilePicture: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        console.log(id);
        const user = await UserModel.findById(id);
        if (!user) throw new Error("Client not found");
        user.profilePicture =
          "https://cdn.vectorstock.com/i/500p/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg";
        await user.save();
        return user;
      },
    },

    updateUserProfile: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
      },
      resolve: async (_, { id, name, address, profilePicture }) => {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("User not found");

        if (name) user.name = name;
        if (address) user.address = address;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        return user;
      },
    },

    //Clients
    addClients: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
        hasWhatsapp: { type: new GraphQLNonNull(GraphQLBoolean) },
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const date = new Date();
        const createdBy = "Chamod Weerasinghe(EMP-001)";
        const registedDate = date;
        const lastModifiedBy = "Chamod Weerasinghe(EMP-001)";
        const lastModifiedDate = date;

        const { error } = validateCreateClient.validate(args);
        if (error) {
          const errorRespond = error.details.map((err) => err.message);
          throw new Error(JSON.stringify({ messages: errorRespond }));
        }

        try {
          const existingClient = await ClientModel.findOne({
            $or: [{ email: args.email }, { mobileNumber: args.mobileNumber }],
          });

          if (existingClient) {
            let messages = [];
            if (existingClient.email === args.email) {
              messages.push("Client with this email already exists.");
            }
            if (existingClient.mobileNumber === args.mobileNumber) {
              messages.push("Client with this mobile number already exists.");
            }
            return new Error(
              JSON.stringify({
                messages: messages,
              })
            );
          }

          console.log({
            ...args,
            createdBy,
            registedDate,
            lastModifiedBy,
            lastModifiedDate,
          });

          const client = new ClientModel({
            ...args,
            createdBy,
            registedDate,
            lastModifiedBy,
            lastModifiedDate,
          });
          return client.save();
        } catch (error) {
          console.log(error);
          throw new Error(
            JSON.stringify({
              messages: ["Something Went Wrong"],
            })
          );
        }
      },
    },

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        console.log("deleteClient resolver triggered with id:", id);
        const client = await ClientModel.findByIdAndDelete(id);
        if (!client) throw new Error("Client not found");
        return client;
      },
    },

    editClients: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
        hasWhatsapp: { type: new GraphQLNonNull(GraphQLBoolean) },
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { error } = validateEditClient.validate(args);
        if (error) {
          const errorRespond = error.details.map((err) => err.message);
          throw new Error(JSON.stringify({ messages: errorRespond }));
        }

        try {
          const clientFound = await ClientModel.findById(args.id);
          if (!clientFound) {
            return new Error(
              JSON.stringify({
                messages: ["Client not found"],
              })
            );
          }

          return ClientModel.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                email: args.email,
                mobileNumber: args.mobileNumber,
                hasWhatsapp: args.hasWhatsapp,
                address: args.address,
              },
            },
            { new: true }
          );
        } catch (error) {
          console.log(error);
          throw new Error(
            JSON.stringify({
              messages: ["Something Went Wrong"],
            })
          );
        }
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
