import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { relayStylePagination } from "@apollo/client/utilities";
import { sha256 } from "crypto-hash";

const linkChain = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
}).concat(new HttpLink({ uri: "https://api.signalclout.com/graphql" }));

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        profiles: relayStylePagination(),
        transactions: relayStylePagination(),
      },
    },
    Profile: {
      fields: {
        transfers: relayStylePagination(),
        hodlers: relayStylePagination(),
        creatorsIHodle: relayStylePagination(),
        holdings: relayStylePagination(),
        coinTransferTransactions: relayStylePagination(),
      },
    },
  },
});

export const client = new ApolloClient({
  cache,
  link: linkChain,
});
