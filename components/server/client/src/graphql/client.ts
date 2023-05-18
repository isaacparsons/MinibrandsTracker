import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { PagedUsersSearch, PaginatedMinibrands } from '__generated__/graphql';

const URI = `${process.env.REACT_APP_BACKEND_URL}/graphql`;

const httpLink = new HttpLink({ uri: URI, credentials: 'include' });

const errorLink = onError(
  ({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors && graphQLErrors.length > 0) {
      graphQLErrors.forEach((error) => {
        console.log('GRAPHQL ERROR!');
        console.log(error);
      });
    }

    if (networkError) {
      console.log('NETWORK ERROR');
      console.log(networkError?.cause);
      console.log(networkError?.message);
    }
    return forward(operation);
  }
);

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          searchUsers: {
            keyArgs: ['query'],
            merge(
              existing: PagedUsersSearch = { data: [] },
              incoming: PagedUsersSearch
            ) {
              return {
                data: [...existing.data, ...incoming.data],
                cursor: incoming.cursor
              };
            }
          },
          getMiniBrands: {
            keyArgs: false,
            merge(
              existing: PaginatedMinibrands = { data: [] },
              incoming: PaginatedMinibrands
            ) {
              console.log('existing');
              console.log(existing);
              console.log('incoming');
              console.log(incoming);
              return {
                data: [...existing.data, ...incoming.data],
                cursor: incoming.cursor
              };
            }
          }
        }
      }
    }
  })
});

export default client;
