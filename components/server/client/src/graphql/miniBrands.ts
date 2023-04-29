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
