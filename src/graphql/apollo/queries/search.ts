import { gql } from "@apollo/client";

export const SEARCH = gql`
  query search($first: Int, $after: Binary, $filter: SearchFilterInput) {
    search(filter: $filter, first: $first, after: $after) {
      totalCount
      edges {
        cursor
        node {
          id
          publicKey
          username
          image
          description
          hidden
          verified
          reserved
          creatorBasisPoints
          balanceNanos
          coinWatermarkNanos
          coinsInCirculationNanos
          coinPriceBitCloutNanos
          followersCount
          followingCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
