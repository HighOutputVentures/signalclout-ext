import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
  query transactions(
    $first: Int
    $after: Binary
    $filter: ProfileTransactionFilterInput!
  ) {
    transactions(first: $first, after: $after, filter: $filter) {
      totalSoldUSD
      totalBoughtUSD
      totalCount
      edges {
        node {
          id
          transactor {
            id
            username
          }
          bitCloutNanos
          coins
          founderReward
          fromTotalBitCloutNanoLocked
          toTotalBitCloutNanoLocked
          fromCoinsInCirculation
          transaction
          type
          toCoinsInCirculation
          dateTimeCreated
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
