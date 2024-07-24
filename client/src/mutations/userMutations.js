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
