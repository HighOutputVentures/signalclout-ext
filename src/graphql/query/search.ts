import { gql } from "graphql-request";

export const PROFILE_SEARCH = gql`
  query profiles(
    $first: Int
    $after: Binary
    $filter: ProfileFilterInput
    $search: [String!]
  ) {
    profiles(first: $first, after: $after, filter: $filter, search: $search) {
      totalCount
      edges {
        cursor
        node {
          # id
          publicKey
          username
          image
          description
          hidden
          verified
          reserved
          creatorBasisPoints
          balanceNanos
          bitcloutLockedNanos
          coinWatermarkNanos
          coinsInCirculationNanos
          coinPriceBitCloutNanos
          walletPriceBitCloutNanos
          followersCount
          followingCount
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

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
      }
    }
  }
`;

export default {};
