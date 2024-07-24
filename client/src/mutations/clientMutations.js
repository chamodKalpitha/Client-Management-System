import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
  mutation AddClients(
    $name: String!
    $email: String!
    $mobileNumber: String!
    $hasWhatsapp: Boolean!
    $address: String!
  ) {
    addClients(
      name: $name
      email: $email
      mobileNumber: $mobileNumber
      hasWhatsapp: $hasWhatsapp
      address: $address
    ) {
      id
      name
      email
      mobileNumber
      hasWhatsapp
      address
    }
  }
`;

export const EDIT_CLIENT = gql`
  mutation editClients(
    $id: ID!
    $name: String!
    $email: String!
    $mobileNumber: String!
    $hasWhatsapp: Boolean!
    $address: String!
  ) {
    editClients(
      id: $id
      name: $name
      email: $email
      mobileNumber: $mobileNumber
      hasWhatsapp: $hasWhatsapp
      address: $address
    ) {
      id
      name
      email
      mobileNumber
      hasWhatsapp
      address
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
    }
  }
`;
