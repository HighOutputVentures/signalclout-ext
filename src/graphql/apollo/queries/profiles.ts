import { gql } from "@apollo/client";

export const SIGNALCLOUT_PROFILE = gql`
  query signalcloutProfile($publicKey: String!) {
    profile_next(publicKey: $publicKey) {
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
    node_next(id: $id) {
      id
      ... on Profile_next {
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

export const PROFILES_NEXT = gql`
  query profilesNext(
    $first: Int
    $after: Binary
    $filter: ProfileFilterInput_next
    $sort: ProfileSortInput
    $search: [String!]
  ) {
    profiles_next(
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
