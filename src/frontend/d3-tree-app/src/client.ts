import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI, // Set the URL of your Spring GraphQL endpoint
    cache: new InMemoryCache(),
});

export default client;