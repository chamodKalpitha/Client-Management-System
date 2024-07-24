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
