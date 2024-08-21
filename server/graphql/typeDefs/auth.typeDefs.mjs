import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

export const UserType = new GraphQLObjectType({
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

export const RoleEnumType = new GraphQLEnumType({
  name: "role",
  values: {
    ASSISTANT: { value: "Assistant" },
    MANAGER: { value: "Manager" },
    ADMIN: { value: "Admin" },
  },
});
