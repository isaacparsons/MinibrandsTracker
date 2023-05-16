import { gql } from '../__generated__/gql';

export const GET_IMAGE_UPLOAD_LINK = gql(/* GraphQL */ `
  query GetImageUploadLink($name: String!) {
    getImageUploadLink(name: $name)
  }
`);

export const SAVE_MINIBRAND = gql(/* GraphQL */ `
  mutation SaveMiniBrand($input: MiniBrandInput!) {
    saveMiniBrand(input: $input) {
      id
      name
      seriesId
      typeId
      tags {
        id
        value
      }
    }
  }
`);

export const DELETE_MINIBRAND = gql(/* GraphQL */ `
  mutation DeleteMiniBrand($id: Int!) {
    deleteMiniBrand(id: $id) {
      id
      imgUrl
      name
      seriesId
      typeId
    }
  }
`);

export const GET_MINIBRANDS = gql(/* GraphQL */ `
  query GetMiniBrands {
    getMiniBrands {
      id
      imgUrl
      name
      series {
        id
        value
      }
      seriesId
      tags {
        id
        value
      }
      type {
        id
        value
      }
      typeId
    }
  }
`);

export const GET_MINIBRANDS_METADATA = gql(/* GraphQL */ `
  query GetMiniBrandsMetaData {
    getMiniBrandsMetaData {
      series {
        id
        value
      }
      tags {
        id
        value
      }
      types {
        id
        value
      }
    }
  }
`);

export const SAVE_MINIBRANDS_METADATA = gql(/* GraphQL */ `
  mutation Mutation(
    $types: [MiniBrandTypeInput!]!
    $series: [MiniBrandSeriesInput!]!
    $tags: [MiniBrandTagInput!]!
  ) {
    saveMiniBrandsMetaData(types: $types, series: $series, tags: $tags) {
      series {
        id
        value
      }
      tags {
        id
        value
      }
      types {
        id
        value
      }
    }
  }
`);

export const COLLECT_MINIBRAND = gql(/* GraphQL */ `
  mutation CollectMinibrand($id: Int!, $input: CollectMinibrandInput!) {
    collectMinibrand(id: $id, input: $input) {
      dateCollected
      id
      minibrand {
        id
        imgUrl
        name
        seriesId
        typeId
      }
      minibrandId
      quantity
      userId
    }
  }
`);

export const UPDATE_COLLECTED_MINIBRAND = gql(/* GraphQL */ `
  mutation UpdateCollectedMinibrand(
    $input: UpdateCollectedMinibrandInput!
    $id: Int!
  ) {
    updateCollectedMinibrand(input: $input, id: $id) {
      dateCollected
      id
      minibrandId
      quantity
      userId
    }
  }
`);

export const GET_COLLECTED_MINIBRANDS = gql(/* GraphQL */ `
  query GetCollectedMinibrands($userId: Int!) {
    getCollectedMinibrands(userId: $userId) {
      cursor
      data {
        dateCollected
        id
        minibrand {
          id
          name
          imgUrl
          series {
            id
            value
          }
          tags {
            id
            value
          }
          type {
            id
            value
          }
        }
        quantity
      }
    }
  }
`);
