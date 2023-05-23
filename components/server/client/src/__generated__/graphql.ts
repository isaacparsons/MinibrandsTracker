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

export type AchievementCategory = {
  __typename?: 'AchievementCategory';
  collectedCount: Scalars['Int'];
  subCategories?: Maybe<Array<AchievementCategory>>;
  totalCount: Scalars['Int'];
  type: CategoryType;
};

export type Achievements = {
  __typename?: 'Achievements';
  tag: Array<AchievementCategory>;
  totalCollected: Scalars['Int'];
  totalMinibrands: Scalars['Int'];
  type: Array<AchievementCategory>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CategoryType = {
  __typename?: 'CategoryType';
  id: Scalars['Int'];
  value: Scalars['String'];
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

export type CollectedStatus = {
  collected: Scalars['Boolean'];
  notCollected: Scalars['Boolean'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  receiver?: Maybe<User>;
  receiverId: Scalars['Int'];
  sender?: Maybe<User>;
  senderId: Scalars['Int'];
  status: FriendRequestStatus;
};

export enum FriendRequestStatus {
  Accepted = 'Accepted',
  Declined = 'Declined',
  Pending = 'Pending'
}

export type Friends = {
  __typename?: 'Friends';
  friends: Array<FriendRequest>;
  requests: Array<FriendRequest>;
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

export type MiniBrandsFilter = {
  collectedStatus?: InputMaybe<CollectedStatus>;
  search?: InputMaybe<Scalars['String']>;
  seriesIds: Array<Scalars['Int']>;
  tagIds: Array<Scalars['Int']>;
  typeIds: Array<Scalars['Int']>;
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
  createFriendRequest: FriendRequest;
  deleteFriend: FriendRequest;
  deleteMiniBrand: MiniBrand;
  saveMiniBrand: MiniBrand;
  saveMiniBrandsMetaData: MiniBrandsMetaData;
  updateCollectedMinibrand: CollectedMinibrand;
  updateFriendRequest: FriendRequest;
  updateMiniBrand: MiniBrand;
};


export type MutationCollectMinibrandArgs = {
  id: Scalars['Int'];
  input: CollectMinibrandInput;
};


export type MutationCreateFriendRequestArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteFriendArgs = {
  friendRequestId: Scalars['Int'];
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


export type MutationUpdateFriendRequestArgs = {
  senderId: Scalars['Int'];
  status: FriendRequestStatus;
};


export type MutationUpdateMiniBrandArgs = {
  id: Scalars['Int'];
  input: UpdateMiniBrandInput;
};

export type PagedCollectedMinibrandsResults = {
  __typename?: 'PagedCollectedMinibrandsResults';
  cursor?: Maybe<Scalars['Int']>;
  data: Array<CollectedMinibrand>;
};

export type PagedUsersSearch = {
  __typename?: 'PagedUsersSearch';
  cursor?: Maybe<Scalars['Int']>;
  data: Array<User>;
};

export type PaginatedMinibrands = {
  __typename?: 'PaginatedMinibrands';
  cursor?: Maybe<Scalars['Int']>;
  data: Array<MiniBrand>;
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getAchievements: Achievements;
  getCollectedMinibrands: PagedCollectedMinibrandsResults;
  getFriends: Friends;
  getImageUploadLink: Scalars['String'];
  getMe: User;
  getMiniBrand: MiniBrand;
  getMiniBrands: PaginatedMinibrands;
  getMiniBrandsMetaData: MiniBrandsMetaData;
  getMyAchievements: Achievements;
  searchUsers: PagedUsersSearch;
  test?: Maybe<Scalars['Int']>;
};


export type QueryGetAchievementsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetCollectedMinibrandsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryGetImageUploadLinkArgs = {
  name: Scalars['String'];
};


export type QueryGetMiniBrandArgs = {
  id: Scalars['Int'];
};


export type QueryGetMiniBrandsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<MiniBrandsFilter>;
};


export type QuerySearchUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
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
  id: Scalars['Int'];
  localAuth?: Maybe<LocalAuth>;
  role?: Maybe<Role>;
  username?: Maybe<Scalars['String']>;
};

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', getFriends: { __typename?: 'Friends', requests: Array<{ __typename?: 'FriendRequest', receiverId: number, senderId: number, status: FriendRequestStatus, sender?: { __typename?: 'User', username?: string | null, role?: Role | null, id: number } | null, receiver?: { __typename?: 'User', id: number, role?: Role | null, username?: string | null } | null }>, friends: Array<{ __typename?: 'FriendRequest', receiverId: number, senderId: number, status: FriendRequestStatus, receiver?: { __typename?: 'User', username?: string | null, id: number, role?: Role | null } | null, sender?: { __typename?: 'User', username?: string | null, id: number, role?: Role | null } | null }> } };

export type CreateFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest: { __typename?: 'FriendRequest', receiverId: number, senderId: number, status: FriendRequestStatus } };

export type UpdateFriendRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
  status: FriendRequestStatus;
}>;


export type UpdateFriendRequestMutation = { __typename?: 'Mutation', updateFriendRequest: { __typename?: 'FriendRequest', receiverId: number, senderId: number, status: FriendRequestStatus } };

export type DeleteFriendMutationVariables = Exact<{
  friendRequestId: Scalars['Int'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend: { __typename?: 'FriendRequest', receiverId: number, senderId: number, status: FriendRequestStatus } };

export type GetImageUploadLinkQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetImageUploadLinkQuery = { __typename?: 'Query', getImageUploadLink: string };

export type SaveMiniBrandMutationVariables = Exact<{
  input: MiniBrandInput;
}>;


export type SaveMiniBrandMutation = { __typename?: 'Mutation', saveMiniBrand: { __typename?: 'MiniBrand', id: number, name?: string | null, seriesId?: number | null, typeId?: number | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null } };

export type UpdateMiniBrandMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateMiniBrandInput;
}>;


export type UpdateMiniBrandMutation = { __typename?: 'Mutation', updateMiniBrand: { __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null } };

export type DeleteMiniBrandMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMiniBrandMutation = { __typename?: 'Mutation', deleteMiniBrand: { __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null } };

export type GetMiniBrandsQueryVariables = Exact<{
  filter?: InputMaybe<MiniBrandsFilter>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type GetMiniBrandsQuery = { __typename?: 'Query', getMiniBrands: { __typename?: 'PaginatedMinibrands', cursor?: number | null, hasNextPage: boolean, data: Array<{ __typename?: 'MiniBrand', id: number, imgUrl?: string | null, name?: string | null, seriesId?: number | null, typeId?: number | null, series?: { __typename?: 'MiniBrandSeries', id: number, value: string } | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null, type?: { __typename?: 'MiniBrandType', id: number, value: string } | null }> } };

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

export type GetCollectedMinibrandsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetCollectedMinibrandsQuery = { __typename?: 'Query', getCollectedMinibrands: { __typename?: 'PagedCollectedMinibrandsResults', cursor?: number | null, data: Array<{ __typename?: 'CollectedMinibrand', dateCollected?: string | null, id: number, quantity?: number | null, minibrand?: { __typename?: 'MiniBrand', id: number, name?: string | null, imgUrl?: string | null, series?: { __typename?: 'MiniBrandSeries', id: number, value: string } | null, tags?: Array<{ __typename?: 'MiniBrandTag', id: number, value: string }> | null, type?: { __typename?: 'MiniBrandType', id: number, value: string } | null } | null }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: number, role?: Role | null, username?: string | null, googleAuth?: { __typename?: 'GoogleAuth', email?: string | null, id?: string | null, userId?: number | null } | null, localAuth?: { __typename?: 'LocalAuth', email?: string | null, passwordHash?: string | null, userId?: number | null } | null, collected?: Array<{ __typename?: 'CollectedMinibrand', dateCollected?: string | null, id: number, minibrandId?: number | null, quantity?: number | null, userId?: number | null, minibrand?: { __typename?: 'MiniBrand', name?: string | null, id: number } | null }> | null } };

export type GetMyAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAchievementsQuery = { __typename?: 'Query', getMyAchievements: { __typename?: 'Achievements', totalMinibrands: number, totalCollected: number, type: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string }, subCategories?: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string } }> | null }>, tag: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string }, subCategories?: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string } }> | null }> } };

export type SearchUsersQueryVariables = Exact<{
  query: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'PagedUsersSearch', cursor?: number | null, data: Array<{ __typename?: 'User', id: number, username?: string | null }> } };

export type GetAchievementsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAchievementsQuery = { __typename?: 'Query', getAchievements: { __typename?: 'Achievements', totalMinibrands: number, totalCollected: number, tag: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, subCategories?: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string } }> | null, type: { __typename?: 'CategoryType', id: number, value: string } }>, type: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string }, subCategories?: Array<{ __typename?: 'AchievementCategory', collectedCount: number, totalCount: number, type: { __typename?: 'CategoryType', id: number, value: string } }> | null }> } };


export const GetFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetFriendsQuery, GetFriendsQueryVariables>;
export const CreateFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;
export const UpdateFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FriendRequestStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateFriendRequestMutation, UpdateFriendRequestMutationVariables>;
export const DeleteFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendRequestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteFriendMutation, DeleteFriendMutationVariables>;
export const GetImageUploadLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetImageUploadLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImageUploadLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<GetImageUploadLinkQuery, GetImageUploadLinkQueryVariables>;
export const SaveMiniBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveMiniBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveMiniBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<SaveMiniBrandMutation, SaveMiniBrandMutationVariables>;
export const UpdateMiniBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMiniBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMiniBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMiniBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMiniBrandMutation, UpdateMiniBrandMutationVariables>;
export const DeleteMiniBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMiniBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMiniBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]}}]} as unknown as DocumentNode<DeleteMiniBrandMutation, DeleteMiniBrandMutationVariables>;
export const GetMiniBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMiniBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandsFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMiniBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMiniBrandsQuery, GetMiniBrandsQueryVariables>;
export const GetMiniBrandsMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMiniBrandsMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetMiniBrandsMetaDataQuery, GetMiniBrandsMetaDataQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"types"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTypeInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"series"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandSeriesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MiniBrandTagInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveMiniBrandsMetaData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"types"},"value":{"kind":"Variable","name":{"kind":"Name","value":"types"}}},{"kind":"Argument","name":{"kind":"Name","value":"series"},"value":{"kind":"Variable","name":{"kind":"Name","value":"series"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const CollectMinibrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectMinibrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectMinibrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectMinibrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seriesId"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CollectMinibrandMutation, CollectMinibrandMutationVariables>;
export const UpdateCollectedMinibrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectedMinibrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectedMinibrandInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollectedMinibrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectedMinibrandMutation, UpdateCollectedMinibrandMutationVariables>;
export const GetCollectedMinibrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectedMinibrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCollectedMinibrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectedMinibrandsQuery, GetCollectedMinibrandsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"passwordHash"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"collected"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateCollected"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minibrandId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"minibrand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetMyAchievementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyAchievements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyAchievements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMinibrands"}},{"kind":"Field","name":{"kind":"Name","value":"totalCollected"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyAchievementsQuery, GetMyAchievementsQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetAchievementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAchievements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAchievements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMinibrands"}},{"kind":"Field","name":{"kind":"Name","value":"totalCollected"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAchievementsQuery, GetAchievementsQueryVariables>;