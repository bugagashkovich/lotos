import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://109.167.145.3",
  cache: new InMemoryCache(),
});

export { client };
