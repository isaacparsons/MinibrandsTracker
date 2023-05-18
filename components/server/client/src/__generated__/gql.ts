/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetFriends {\n    getFriends {\n      requests {\n        receiverId\n        senderId\n        status\n        sender {\n          username\n          role\n          id\n        }\n        receiver {\n          id\n          role\n          username\n        }\n      }\n      friends {\n        receiver {\n          username\n          id\n          role\n        }\n        receiverId\n        sender {\n          username\n          id\n          role\n        }\n        senderId\n        status\n      }\n    }\n  }\n": types.GetFriendsDocument,
    "\n  mutation CreateFriendRequest($userId: Int!) {\n    createFriendRequest(userId: $userId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n": types.CreateFriendRequestDocument,
    "\n  mutation UpdateFriendRequest($senderId: Int!, $status: FriendRequestStatus!) {\n    updateFriendRequest(senderId: $senderId, status: $status) {\n      receiverId\n      senderId\n      status\n    }\n  }\n": types.UpdateFriendRequestDocument,
    "\n  mutation DeleteFriend($friendRequestId: Int!) {\n    deleteFriend(friendRequestId: $friendRequestId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n": types.DeleteFriendDocument,
    "\n  query GetImageUploadLink($name: String!) {\n    getImageUploadLink(name: $name)\n  }\n": types.GetImageUploadLinkDocument,
    "\n  mutation SaveMiniBrand($input: MiniBrandInput!) {\n    saveMiniBrand(input: $input) {\n      id\n      name\n      seriesId\n      typeId\n      tags {\n        id\n        value\n      }\n    }\n  }\n": types.SaveMiniBrandDocument,
    "\n  mutation DeleteMiniBrand($id: Int!) {\n    deleteMiniBrand(id: $id) {\n      id\n      imgUrl\n      name\n      seriesId\n      typeId\n    }\n  }\n": types.DeleteMiniBrandDocument,
    "\n  query GetMiniBrands($cursor: Int) {\n    getMiniBrands(cursor: $cursor) {\n      cursor\n      data {\n        id\n        imgUrl\n        name\n        series {\n          id\n          value\n        }\n        seriesId\n        tags {\n          id\n          value\n        }\n        type {\n          id\n          value\n        }\n        typeId\n      }\n    }\n  }\n": types.GetMiniBrandsDocument,
    "\n  query GetMiniBrandsMetaData {\n    getMiniBrandsMetaData {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n": types.GetMiniBrandsMetaDataDocument,
    "\n  mutation Mutation(\n    $types: [MiniBrandTypeInput!]!\n    $series: [MiniBrandSeriesInput!]!\n    $tags: [MiniBrandTagInput!]!\n  ) {\n    saveMiniBrandsMetaData(types: $types, series: $series, tags: $tags) {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n": types.MutationDocument,
    "\n  mutation CollectMinibrand($id: Int!, $input: CollectMinibrandInput!) {\n    collectMinibrand(id: $id, input: $input) {\n      dateCollected\n      id\n      minibrand {\n        id\n        imgUrl\n        name\n        seriesId\n        typeId\n      }\n      minibrandId\n      quantity\n      userId\n    }\n  }\n": types.CollectMinibrandDocument,
    "\n  mutation UpdateCollectedMinibrand(\n    $input: UpdateCollectedMinibrandInput!\n    $id: Int!\n  ) {\n    updateCollectedMinibrand(input: $input, id: $id) {\n      dateCollected\n      id\n      minibrandId\n      quantity\n      userId\n    }\n  }\n": types.UpdateCollectedMinibrandDocument,
    "\n  query GetCollectedMinibrands($userId: Int!) {\n    getCollectedMinibrands(userId: $userId) {\n      cursor\n      data {\n        dateCollected\n        id\n        minibrand {\n          id\n          name\n          imgUrl\n          series {\n            id\n            value\n          }\n          tags {\n            id\n            value\n          }\n          type {\n            id\n            value\n          }\n        }\n        quantity\n      }\n    }\n  }\n": types.GetCollectedMinibrandsDocument,
    "\n  query GetMe {\n    getMe {\n      googleAuth {\n        email\n        id\n        userId\n      }\n      id\n      localAuth {\n        email\n        passwordHash\n        userId\n      }\n      role\n      username\n      collected {\n        dateCollected\n        id\n        minibrandId\n        quantity\n        userId\n        minibrand {\n          name\n          id\n        }\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  query getMyAchievements {\n    getMyAchievements {\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n      tag {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n": types.GetMyAchievementsDocument,
    "\n  query SearchUsers($query: String!, $cursor: Int) {\n    searchUsers(query: $query, cursor: $cursor) {\n      cursor\n      data {\n        id\n        username\n      }\n    }\n  }\n": types.SearchUsersDocument,
    "\n  query GetAchievements($userId: Int!) {\n    getAchievements(userId: $userId) {\n      tag {\n        collectedCount\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n        totalCount\n        type {\n          id\n          value\n        }\n      }\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n": types.GetAchievementsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFriends {\n    getFriends {\n      requests {\n        receiverId\n        senderId\n        status\n        sender {\n          username\n          role\n          id\n        }\n        receiver {\n          id\n          role\n          username\n        }\n      }\n      friends {\n        receiver {\n          username\n          id\n          role\n        }\n        receiverId\n        sender {\n          username\n          id\n          role\n        }\n        senderId\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFriends {\n    getFriends {\n      requests {\n        receiverId\n        senderId\n        status\n        sender {\n          username\n          role\n          id\n        }\n        receiver {\n          id\n          role\n          username\n        }\n      }\n      friends {\n        receiver {\n          username\n          id\n          role\n        }\n        receiverId\n        sender {\n          username\n          id\n          role\n        }\n        senderId\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateFriendRequest($userId: Int!) {\n    createFriendRequest(userId: $userId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFriendRequest($userId: Int!) {\n    createFriendRequest(userId: $userId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateFriendRequest($senderId: Int!, $status: FriendRequestStatus!) {\n    updateFriendRequest(senderId: $senderId, status: $status) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFriendRequest($senderId: Int!, $status: FriendRequestStatus!) {\n    updateFriendRequest(senderId: $senderId, status: $status) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteFriend($friendRequestId: Int!) {\n    deleteFriend(friendRequestId: $friendRequestId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteFriend($friendRequestId: Int!) {\n    deleteFriend(friendRequestId: $friendRequestId) {\n      receiverId\n      senderId\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetImageUploadLink($name: String!) {\n    getImageUploadLink(name: $name)\n  }\n"): (typeof documents)["\n  query GetImageUploadLink($name: String!) {\n    getImageUploadLink(name: $name)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveMiniBrand($input: MiniBrandInput!) {\n    saveMiniBrand(input: $input) {\n      id\n      name\n      seriesId\n      typeId\n      tags {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SaveMiniBrand($input: MiniBrandInput!) {\n    saveMiniBrand(input: $input) {\n      id\n      name\n      seriesId\n      typeId\n      tags {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMiniBrand($id: Int!) {\n    deleteMiniBrand(id: $id) {\n      id\n      imgUrl\n      name\n      seriesId\n      typeId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMiniBrand($id: Int!) {\n    deleteMiniBrand(id: $id) {\n      id\n      imgUrl\n      name\n      seriesId\n      typeId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMiniBrands($cursor: Int) {\n    getMiniBrands(cursor: $cursor) {\n      cursor\n      data {\n        id\n        imgUrl\n        name\n        series {\n          id\n          value\n        }\n        seriesId\n        tags {\n          id\n          value\n        }\n        type {\n          id\n          value\n        }\n        typeId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMiniBrands($cursor: Int) {\n    getMiniBrands(cursor: $cursor) {\n      cursor\n      data {\n        id\n        imgUrl\n        name\n        series {\n          id\n          value\n        }\n        seriesId\n        tags {\n          id\n          value\n        }\n        type {\n          id\n          value\n        }\n        typeId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMiniBrandsMetaData {\n    getMiniBrandsMetaData {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMiniBrandsMetaData {\n    getMiniBrandsMetaData {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation(\n    $types: [MiniBrandTypeInput!]!\n    $series: [MiniBrandSeriesInput!]!\n    $tags: [MiniBrandTagInput!]!\n  ) {\n    saveMiniBrandsMetaData(types: $types, series: $series, tags: $tags) {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation(\n    $types: [MiniBrandTypeInput!]!\n    $series: [MiniBrandSeriesInput!]!\n    $tags: [MiniBrandTagInput!]!\n  ) {\n    saveMiniBrandsMetaData(types: $types, series: $series, tags: $tags) {\n      series {\n        id\n        value\n      }\n      tags {\n        id\n        value\n      }\n      types {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CollectMinibrand($id: Int!, $input: CollectMinibrandInput!) {\n    collectMinibrand(id: $id, input: $input) {\n      dateCollected\n      id\n      minibrand {\n        id\n        imgUrl\n        name\n        seriesId\n        typeId\n      }\n      minibrandId\n      quantity\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CollectMinibrand($id: Int!, $input: CollectMinibrandInput!) {\n    collectMinibrand(id: $id, input: $input) {\n      dateCollected\n      id\n      minibrand {\n        id\n        imgUrl\n        name\n        seriesId\n        typeId\n      }\n      minibrandId\n      quantity\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCollectedMinibrand(\n    $input: UpdateCollectedMinibrandInput!\n    $id: Int!\n  ) {\n    updateCollectedMinibrand(input: $input, id: $id) {\n      dateCollected\n      id\n      minibrandId\n      quantity\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCollectedMinibrand(\n    $input: UpdateCollectedMinibrandInput!\n    $id: Int!\n  ) {\n    updateCollectedMinibrand(input: $input, id: $id) {\n      dateCollected\n      id\n      minibrandId\n      quantity\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCollectedMinibrands($userId: Int!) {\n    getCollectedMinibrands(userId: $userId) {\n      cursor\n      data {\n        dateCollected\n        id\n        minibrand {\n          id\n          name\n          imgUrl\n          series {\n            id\n            value\n          }\n          tags {\n            id\n            value\n          }\n          type {\n            id\n            value\n          }\n        }\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollectedMinibrands($userId: Int!) {\n    getCollectedMinibrands(userId: $userId) {\n      cursor\n      data {\n        dateCollected\n        id\n        minibrand {\n          id\n          name\n          imgUrl\n          series {\n            id\n            value\n          }\n          tags {\n            id\n            value\n          }\n          type {\n            id\n            value\n          }\n        }\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    getMe {\n      googleAuth {\n        email\n        id\n        userId\n      }\n      id\n      localAuth {\n        email\n        passwordHash\n        userId\n      }\n      role\n      username\n      collected {\n        dateCollected\n        id\n        minibrandId\n        quantity\n        userId\n        minibrand {\n          name\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    getMe {\n      googleAuth {\n        email\n        id\n        userId\n      }\n      id\n      localAuth {\n        email\n        passwordHash\n        userId\n      }\n      role\n      username\n      collected {\n        dateCollected\n        id\n        minibrandId\n        quantity\n        userId\n        minibrand {\n          name\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMyAchievements {\n    getMyAchievements {\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n      tag {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMyAchievements {\n    getMyAchievements {\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n      tag {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchUsers($query: String!, $cursor: Int) {\n    searchUsers(query: $query, cursor: $cursor) {\n      cursor\n      data {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($query: String!, $cursor: Int) {\n    searchUsers(query: $query, cursor: $cursor) {\n      cursor\n      data {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAchievements($userId: Int!) {\n    getAchievements(userId: $userId) {\n      tag {\n        collectedCount\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n        totalCount\n        type {\n          id\n          value\n        }\n      }\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAchievements($userId: Int!) {\n    getAchievements(userId: $userId) {\n      tag {\n        collectedCount\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n        totalCount\n        type {\n          id\n          value\n        }\n      }\n      totalCollected\n      type {\n        collectedCount\n        totalCount\n        type {\n          id\n          value\n        }\n        subCategories {\n          collectedCount\n          totalCount\n          type {\n            id\n            value\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;