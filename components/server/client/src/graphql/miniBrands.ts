import { gql } from '../__generated__/gql';

export const GET_IMAGE_UPLOAD_LINK = gql(/* GraphQL */ `
  query GetImageUploadLink($name: String!) {
    getImageUploadLink(name: $name)
  }
`);

export const GET_MINIBRANDS_METADATA = gql(/* GraphQL */ `
  query GetMiniBrandsMetaData {
    getMiniBrandsMetaData {
      series {
        value
      }
      tags {
        value
      }
      types {
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
