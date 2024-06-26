import Dashboard from "./pages/Dashboard";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Login from "./pages/Login";

// Solve : `Cache data may be lost when replacing the getClients field of a Query object` [Warning].
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getClients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getProjects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>
    </>
  );
}

export default App;
