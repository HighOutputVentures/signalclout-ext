import { gql } from "@apollo/client";

export const WALLET = gql`
  query wallet($publicKey: String!, $first: Int, $after: Binary) {
    profile(publicKey: $publicKey) {
      id
      walletPriceUSD
      holdings(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            profile {
              id
              username
              creatorCoinPriceUSD
              image
            }
            balanceNanos
            supplyValue
            portfolioValue
            cashOutValueUSD
            valueUSD
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
