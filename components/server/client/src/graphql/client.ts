import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI =
  process.env.NODE_ENV === 'production'
    ? 'http://44.228.17.0:4000/graphql'
    : 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache({ addTypename: false })
});

export default client;
