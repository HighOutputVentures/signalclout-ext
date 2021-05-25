import { gql } from "@apollo/client";

export const HISTORY = gql`
  query($publicKey: String!, $first: Int, $after: Binary) {
    profile(publicKey: $publicKey) {
      id
      username
      history(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            type
            previousCreatorBasisPoints
            currentCreatorBasisPoints
            previousUsername
            currentUsername
            transactionAmountBitCloutNanos
            transactionAmountUSD
            creatorCoinsInCirculationChange
            dateTimeCreated
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
