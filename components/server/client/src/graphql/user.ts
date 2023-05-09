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

export const GET_ACHIEVEMENTS = gql(/* GraphQL */ `
  query GetAchievements {
    getAchievements {
      totalCollected
      type {
        collectedCount
        totalCount
        type {
          id
          value
        }
        subCategories {
          collectedCount
          totalCount
          type {
            id
            value
          }
        }
      }
      tag {
        collectedCount
        totalCount
        type {
          id
          value
        }
        subCategories {
          collectedCount
          totalCount
          type {
            id
            value
          }
        }
      }
    }
  }
`);
