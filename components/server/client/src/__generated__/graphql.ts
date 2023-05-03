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

export type CollectMinibrandInput = {
  quantity: Scalars['Int'];
};

export type CollectedMinibrand = {
  __typename?: 'CollectedMinibrand';
  dateCollected?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  minibrand?: Maybe<MiniBrand>;
  minibrandId?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type GoogleAuth = {
  __typename?: 'GoogleAuth';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type LocalAuth = {
  __typename?: 'LocalAuth';
  email?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type MiniBrand = {
  __typename?: 'MiniBrand';
  collectors?: Maybe<Array<CollectedMinibrand>>;
  id: Scalars['Int'];
  imgUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  series?: Maybe<MiniBrandSeries>;
  seriesId?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<MiniBrandTag>>;
  type?: Maybe<MiniBrandType>;
  typeId?: Maybe<Scalars['Int']>;
};

export type MiniBrandInput = {
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  seriesId: Scalars['Int'];
  tagIds: Array<Scalars['Int']>;
  typeId: Scalars['Int'];
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
  collectMinibrand: CollectedMinibrand;
  deleteMiniBrand: MiniBrand;
  saveMiniBrand: MiniBrand;
  saveMiniBrandsMetaData: MiniBrandsMetaData;
  updateCollectedMinibrand: CollectedMinibrand;
  updateMiniBrand: MiniBrand;
};


export type MutationCollectMinibrandArgs = {
  id: Scalars['Int'];
  input: CollectMinibrandInput;
};


export type MutationDeleteMiniBrandArgs = {
  id: Scalars['Int'];
};


export type MutationSaveMiniBrandArgs = {
  input: MiniBrandInput;
};


export type MutationSaveMiniBrandsMetaDataArgs = {
  series: Array<MiniBrandSeriesInput>;
  tags: Array<MiniBrandTagInput>;
  types: Array<MiniBrandTypeInput>;
};


export type MutationUpdateCollectedMinibrandArgs = {
  id: Scalars['Int'];
  input: UpdateCollectedMinibrandInput;
};


export type MutationUpdateMiniBrandArgs = {
  id: Scalars['Int'];
  input: UpdateMiniBrandInput;
};

export type Query = {
  __typename?: 'Query';
  getImageUploadLink: Scalars['String'];
  getMe?: Maybe<User>;
  getMiniBrand: MiniBrand;
  getMiniBrands: Array<MiniBrand>;
  getMiniBrandsMetaData: MiniBrandsMetaData;
};


export type QueryGetImageUploadLinkArgs = {
  name: Scalars['String'];
};


export type QueryGetMiniBrandArgs = {
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'Admin',
  Member = 'Member'
}

export type UpdateCollectedMinibrandInput = {
  quantity: Scalars['Int'];
};

export type UpdateMiniBrandInput = {
  imgUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  seriesId?: InputMaybe<Scalars['Int']>;
  tagIds?: InputMaybe<Array<Scalars['Int']>>;
  typeId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  collected?: Maybe<Array<CollectedMinibrand>>;
  googleAuth?: Maybe<GoogleAuth>;
  id?: Maybe<Scalars['Int']>;
  localAuth?: Maybe<LocalAuth>;
  role?: Maybe<Role>;
};

export type GetImageUploadLinkQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetImageUploadLinkQuery = { __typename?: 'Query', getImageUploadLink: string };

export type SaveMiniBrandMutationVariables = Exact<{
  input: MiniBrandInput;
}>;


export type SaveMiniBrandMutation = { __typename?: 'Mutation', saveMiniBrand: { __typename?: 'MiniBrand', id: number, name?: string | null, seriesId?: number | null, typeId?: number | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null } };

export type DeleteMiniBrandMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMiniBrandMutation = { __typename?: 'Mutation', deleteMiniBrand: { __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null } };

export type GetMiniBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMiniBrandsQuery = { __typename?: 'Query', getMiniBrands: Array<{ __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null, series?: { __typename?: 'MiniBrandSeries', id: number, value: string } | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null, type?: { __typename?: 'MiniBrandType', id: number, value: string } | null }> };

export type GetMiniBrandsMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMiniBrandsMetaDataQuery = { __typename?: 'Query', getMiniBrandsMetaData: { __typename?: 'MiniBrandsMetaData', series: Array<{ __typename?: 'MiniBrandSeries', id: number, value: string }>, tags: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }>, types: Array<{ __typename?: 'MiniBrandType', id: number, value: string }> } };

export type MutationMutationVariables = Exact<{
  types: Array<MiniBrandTypeInput> | MiniBrandTypeInput;
  series: Array<MiniBrandSeriesInput> | MiniBrandSeriesInput;
  tags: Array<MiniBrandTagInput> | MiniBrandTagInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', saveMiniBrandsMetaData: { __typename?: 'MiniBrandsMetaData', series: Array<{ __typename?: 'MiniBrandSeries', id: number, value: string }>, tags: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }>, types: Array<{ __typename?: 'MiniBrandType', id: number, value: string }> } };

export type CollectMinibrandMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CollectMinibrandInput;
}>;


export type CollectMinibrandMutation = { __typename?: 'Mutation', collectMinibrand: { __typename?: 'CollectedMinibrand', dateCollected?: string | null, id: number, minibrandId?: number | null, quantity?: number | null, userId?: number | null, minibrand?: { __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null } | null } };

export type UpdateCollectedMinibrandMutationVariables = Exact<{
  input: UpdateCollectedMinibrandInput;
  id: Scalars['Int'];
}>;


export type UpdateCollectedMinibrandMutation = { __typename?: 'Mutation', updateCollectedMinibrand: { __typename?: 'CollectedMinibrand', dateCollected?: string | null, id: number, minibrandId?: number | null, quantity?: number | null, userId?: number | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'User', id?: number | null, role?: Role | null, googleAuth?: { __typename?: 'GoogleAuth', email?: string | null, id?: string | null, userId?: number | null } | null, localAuth?: { __typename?: 'LocalAuth', email?: string | null, passwordHash?: string | null, userId?: number | null } | null, collected?: Array<{ __typename?: 'CollectedMinibrand', dateCollected?: string | null, id: number, minibrandId?: number | null, quantity?: number | null, userId?: number | null, minibrand?: { __typename?: 'MiniBrand', name?: string | null, id: number } | null }> | null } | null };


export const GetImageUploadLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetImageUploadLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImageUploadLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<GetImageUploadLinkQuery, GetImageUploadLinkQueryVariables>;
export const SaveMiniBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveMiniBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveMiniBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<SaveMiniBrandMutation, SaveMiniBrandMutationVariables>;
export const DeleteMiniBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMiniBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMiniBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]}}]} as unknown as DocumentNode<DeleteMiniBrandMutation, DeleteMiniBrandMutationVariables>;
export const GetMiniBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMiniBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMiniBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]}}]} as unknown as DocumentNode<GetMiniBrandsQuery, GetMiniBrandsQueryVariables>;
export const GetMiniBrandsMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetMiniBrandsMetaDataQuery, GetMiniBrandsMetaDataQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTypeInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"series"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandSeriesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTagInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveMiniBrandsMetaData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"series"},"value":{"kind":"Variable","name":{"kind":"Name","value":"series"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const CollectMinibrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectMinibrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectMinibrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectMinibrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CollectMinibrandMutation, CollectMinibrandMutationVariables>;
export const UpdateCollectedMinibrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectedMinibrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectedMinibrandInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollectedMinibrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectedMinibrandMutation, UpdateCollectedMinibrandMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"passwordHash"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"collected"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"minibrand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;