import { gql } from "apollo-server-core";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        accountCreated
        email
        phoneNumber
        firstName
        lastName
        id
      }
    }
  }
`;
