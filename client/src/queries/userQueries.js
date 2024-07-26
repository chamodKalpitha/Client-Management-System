import { gql } from "@apollo/client";

export const GET_USER_JWT = gql`
  {
    getUsers {
      id
      email
      name
      password
      empId
      address
      role
      profilePicture
    }
  }
`;

export const GET_SIGNED_URL = gql`
  query RequestS3URL($id: ID!, $fileName: String!) {
    requestS3URL(id: $id, fileName: $fileName) {
      url
    }
  }
`;
