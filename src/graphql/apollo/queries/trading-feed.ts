import { gql } from "@apollo/client";

export const TRADING_FEED = gql`
  query tradingFeed(
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
          creator {
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
