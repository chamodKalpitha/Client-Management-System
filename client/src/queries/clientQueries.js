import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  {
    getClients {
      id
      name
      email
      phone
    }
  }
`;
