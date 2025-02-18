import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://sandbox-api-test.samyroad.com/graphql', // URL de la API GraphQL
  }),
  cache: new InMemoryCache(), // Usamos la caché en memoria para optimizar las consultas
});

export default client;
