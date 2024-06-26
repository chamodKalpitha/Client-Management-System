import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
  mutation AddClients($name: String!, $email: String!, $phone: String!) {
    addClients(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
