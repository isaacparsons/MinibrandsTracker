import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

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
  cache: new InMemoryCache({ addTypename: false })
});

export default client;
