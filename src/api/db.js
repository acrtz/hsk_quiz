import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: 'http://mandarinpro-api.com/graphql',
  // uri: 'mandarinpro-api.com/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization: ''
      }
    });
  },
});