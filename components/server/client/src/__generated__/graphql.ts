/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = {
  __typename?: 'Auth';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type MiniBrand = {
  __typename?: 'MiniBrand';
  name: Scalars['String'];
  series?: Maybe<MiniBrandSeries>;
  seriesId: Scalars['Int'];
  tags?: Maybe<Array<Maybe<MiniBrandTag>>>;
  type?: Maybe<MiniBrandType>;
  typeId: Scalars['Int'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type MiniBrandSeries = {
  __typename?: 'MiniBrandSeries';
  id: Scalars['Int'];
  miniBrands?: Maybe<Array<MiniBrand>>;
  value: Scalars['String'];
};

export type MiniBrandSeriesInput = {
  value: Scalars['String'];
};

export type MiniBrandTag = {
  __typename?: 'MiniBrandTag';
  id: Scalars['Int'];
  miniBrands?: Maybe<Array<MiniBrand>>;
  value: Scalars['String'];
};

export type MiniBrandTagInput = {
  value: Scalars['String'];
};

export type MiniBrandType = {
  __typename?: 'MiniBrandType';
  id: Scalars['Int'];
  miniBrands?: Maybe<Array<MiniBrand>>;
  value: Scalars['String'];
};

export type MiniBrandTypeInput = {
  value: Scalars['String'];
};

export type MiniBrandsMetaData = {
  __typename?: 'MiniBrandsMetaData';
  series: Array<MiniBrandSeries>;
  tags: Array<MiniBrandTag>;
  types: Array<MiniBrandType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  saveMiniBrandsMetaData: MiniBrandsMetaData;
};


export type MutationSaveMiniBrandsMetaDataArgs = {
  series: Array<MiniBrandSeriesInput>;
  tags: Array<MiniBrandTagInput>;
  types: Array<MiniBrandTypeInput>;
};

export type Query = {
  __typename?: 'Query';
  getImageUploadLink: Scalars['String'];
  getMiniBrands: Array<MiniBrand>;
  getMiniBrandsMetaData: MiniBrandsMetaData;
};


export type QueryGetImageUploadLinkArgs = {
  name: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type User = {
  __typename?: 'User';
  collected: Array<MiniBrand>;
  email: Scalars['String'];
  id: Scalars['Int'];
  passwordHash?: Maybe<Scalars['String']>;
};

export type GetImageUploadLinkQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetImageUploadLinkQuery = { __typename?: 'Query', getImageUploadLink: string };

export type GetMiniBrandsMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMiniBrandsMetaDataQuery = { __typename?: 'Query', getMiniBrandsMetaData: { __typename?: 'MiniBrandsMetaData', series: Array<{ __typename?: 'MiniBrandSeries', value: string }>, tags: Array<{ __typename?: 'MiniBrandTag', value: string }>, types: Array<{ __typename?: 'MiniBrandType', value: string }> } };

export type MutationMutationVariables = Exact<{
  types: Array<MiniBrandTypeInput> | MiniBrandTypeInput;
  series: Array<MiniBrandSeriesInput> | MiniBrandSeriesInput;
  tags: Array<MiniBrandTagInput> | MiniBrandTagInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', saveMiniBrandsMetaData: { __typename?: 'MiniBrandsMetaData', series: Array<{ __typename?: 'MiniBrandSeries', id: number, value: string }>, tags: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }>, types: Array<{ __typename?: 'MiniBrandType', id: number, value: string }> } };


export const GetImageUploadLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetImageUploadLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImageUploadLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<GetImageUploadLinkQuery, GetImageUploadLinkQueryVariables>;
export const GetMiniBrandsMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetMiniBrandsMetaDataQuery, GetMiniBrandsMetaDataQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTypeInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"series"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandSeriesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTagInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveMiniBrandsMetaData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"series"},"value":{"kind":"Variable","name":{"kind":"Name","value":"series"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;