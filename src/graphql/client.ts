import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://api.signalclout.com/graphql", {
  headers: {},
});

interface Variables {
  first?: number;
  after?: string | null;
  filter?: Record<string, any> | null;
  id?: any;
  publicKey?: any;
}

export const transfersFetcher = (
  query: string,
  id: string,
  first: number,
  after: string | null,
  filter: Record<string, any>
): any => {
  return client.request(query, { id, first, after, filter });
};

export const generalFetcher = (
  query: string,
  first: number,
  after: string | null,
  filter: Record<string, any>
): any => {
  return client.request(query, { first, after, filter });
};

export const fetcher = <T>(variables?: Variables) => (query: string): any => {
  return client.request<T>(query, variables);
};

export default {};
