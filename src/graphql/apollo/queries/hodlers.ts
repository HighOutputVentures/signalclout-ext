import { gql } from "@apollo/client";

export const HODLERS = gql`
  query($publicKey: String!, $first: Int, $after: Binary) {
    profile(publicKey: $publicKey) {
      id
      hodlers(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            profile {
              id
              publicKey
              username
              image
            }
            balanceNanos
            supplyValue
            valueUSD
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
