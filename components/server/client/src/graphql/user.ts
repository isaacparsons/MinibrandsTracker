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
      username
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
  query getMyAchievements {
    getMyAchievements {
      totalMinibrands
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

export const SEARCH_USERS = gql(/* GraphQL */ `
  query SearchUsers($query: String!, $cursor: Int) {
    searchUsers(query: $query, cursor: $cursor) {
      cursor
      data {
        id
        username
      }
    }
  }
`);

export const USER_ACHIEVEMENTS = gql(/* GraphQL */ `
  query GetAchievements($userId: Int!) {
    getAchievements(userId: $userId) {
      tag {
        collectedCount
        subCategories {
          collectedCount
          totalCount
          type {
            id
            value
          }
        }
        totalCount
        type {
          id
          value
        }
      }
      totalMinibrands
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
    }
  }
`);
