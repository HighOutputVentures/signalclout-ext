import { gql } from "@apollo/client";

export const SIGNALCLOUT_PROFILE = gql`
  query signalcloutProfile($publicKey: String!) {
    profile(publicKey: $publicKey) {
      id
      publicKey
      username
      image
      description
      creatorBasisPoints
      hidden
      reserved
      verified
      followersCount
      followingCount
      postsCount
      likesCount
      creatorCoinInCirculationNanos
      creatorCoinPriceBitCloutNanos
      balanceUSD
      creatorCoinPriceUSD
      walletPriceUSD
      dateTimeCreated
    }
  }
`;

export const PROFILE = gql`
  query($id: Binary!) {
    node(id: $id) {
      id
      ... on Profile {
        id
        username
        publicKey
        image
        description
        creatorCoinInCirculationNanos
        creatorCoinPriceBitCloutNanos
        creatorBasisPoints
        followersCount
        followingCount
        walletPriceBitCloutNanos
        dateTimeCreated
        postsCount
        likesCount
        transfers {
          totalDepositsUSD
          totalDepositsBitCloutNanos
          totalWithdrawalsBitCloutNanos
          totalWithdrawalsUSD
        }
      }
    }
  }
`;

export const PROFILES = gql`
  query profilesNext(
    $first: Int
    $after: Binary
    $filter: ProfileFilterInput
    $sort: ProfileSortInput
    $search: [String!]
  ) {
    profiles(
      filter: $filter
      first: $first
      after: $after
      sort: $sort
      search: $search
    ) {
      totalCount
      edges {
        node {
          id
          publicKey
          username
          image
          description
          creatorBasisPoints
          hidden
          reserved
          verified
          followersCount
          followingCount
          postsCount
          likesCount
          creatorCoinInCirculationNanos
          creatorCoinPriceBitCloutNanos
          balanceUSD
          creatorCoinPriceUSD
          walletPriceUSD
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
