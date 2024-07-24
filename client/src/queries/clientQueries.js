import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients($first: Int!, $after: String, $keyword: String) {
    getClients(first: $first, after: $after, keyword: $keyword) {
      edges {
        id
        name
        email
        mobileNumber
        hasWhatsapp
        address
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const SEARCH_CLIENTS = gql`
  query GetClients($first: Int!, $after: String, $keyword: String) {
    getClients(first: $first, after: $after, keyword: $keyword) {
      edges {
        id
        name
        email
        mobileNumber
        hasWhatsapp
        address
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query getClientById($id: ID!) {
    getClientById(id: $id) {
      name
      email
      mobileNumber
      hasWhatsapp
      address
      createdBy
      registedDate
      lastModifiedBy
      lastModifiedDate
    }
  }
`;
