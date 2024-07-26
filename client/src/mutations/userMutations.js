import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation RegisterUser(
    $email: String!
    $name: String!
    $empId: String!
    $address: String!
    $role: role!
  ) {
    registerUser(
      email: $email
      name: $name
      empId: $empId
      address: $address
      role: $role
    ) {
      id
      email
      name
      empId
      address
      role
    }
  }
`;

export const DELETE_PROFILE_PICTURE = gql`
  mutation DeleteProfilePicture($id: ID!) {
    deleteProfilePicture(id: $id) {
      id
      profilePicture
      email
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfilePicture($id: ID!, $url: String!) {
    UpdateProfilePicture(id: $id, url: $url) {
      id
      profilePicture
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: ID!
    $name: String
    $address: String
    $profilePicture: String
  ) {
    updateUserProfile(
      id: $id
      name: $name
      address: $address
      profilePicture: $profilePicture
    ) {
      id
      name
      address
      profilePicture
    }
  }
`;
