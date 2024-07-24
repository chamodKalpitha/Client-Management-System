import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getClients: {
          keyArgs: false,
          merge(
            existing = { edges: [], pageInfo: {} },
            incoming,
            { args: { after }, readField }
          ) {
            const existingEdges = existing.edges ? existing.edges.slice(0) : [];
            const incomingEdges = incoming.edges ? incoming.edges.slice(0) : [];

            const offset = after
              ? existingEdges.findIndex(
                  (edge) => readField("id", edge) === after
                ) + 1
              : 0;
            if (offset === 0) return incoming;

            // Merge incoming edges into existing edges at the calculated offset
            const mergedEdges = [
              ...existingEdges.slice(0, offset),
              ...incomingEdges,
            ];

            return {
              edges: mergedEdges,
              pageInfo: incoming.pageInfo,
            };
          },
        },
        getProjects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getUSers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const link = createHttpLink({
  uri: "http://localhost:4000/api/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache,
  link,
});

export default client;
