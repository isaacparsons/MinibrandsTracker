import { gql } from '../__generated__/gql';

export const GET_ME = gql(/* GraphQL */ `
  query GetMe {
    getMe {
      googleAuth {
        email
        id
        userId
      }
      id
      localAuth {
        email
        passwordHash
        userId
      }
      role
      collected {
        dateCollected
        id
        minibrandId
        quantity
        userId
        minibrand {
          name
          id
        }
      }
    }
  }
`);
