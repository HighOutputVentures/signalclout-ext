import { gql } from "@apollo/client";

export const HODLERS = gql`
  query($publicKey: String!, $first: Int, $after: Binary) {
    profile_next(publicKey: $publicKey) {
      id
      hodlers_next(first: $first, after: $after) {
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
