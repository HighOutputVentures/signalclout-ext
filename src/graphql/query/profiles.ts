import { gql } from "graphql-request";

export const PROFILE = gql`
  query($id: Binary!) {
    node(id: $id) {
      id
      ... on Profile {
        username
        publicKey
        image
        description
        coinsInCirculationNanos
        coinPriceBitCloutNanos
        creatorBasisPoints
        followersCount
        followingCount
        coinWatermarkNanos
        walletPriceBitCloutNanos
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

export const TRANSFERS = gql`
  query(
    $id: Binary!
    $first: Int
    $after: Binary
    $filter: ProfileTransferFilterInput
  ) {
    node_next(id: $id) {
      id
      ... on Profile_next {
        transfers(first: $first, after: $after, filter: $filter) {
          edges {
            node {
              id
              type
              sender {
                id
                username
                publicKey
              }
              receiver {
                id
                username
                publicKey
              }
              amountBitCloutNanos
              amountUSD
              satoshisBurned
              btcSpendAddress
              btcTransactionHash
              dateTimeCreated
            }
          }
          pageInfo {
            endCursor
          }
        }
      }
    }
  }
`;

export const TRANSACTIONS = gql`
  query($first: Int, $after: Binary, $filter: ProfileTransactionFilterInput!) {
    transactions(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          creator {
            username
          }
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
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

export const HODLERS = gql`
  query(
    $publicKey: String!
    $first: Int
    $after: Binary
    $filter: HodlersFilterInput
  ) {
    profile(publicKey: $publicKey) {
      username
      hodlers_next(first: $first, after: $after, filter: $filter) {
        totalBoughtUSD
        totalSoldUSD
        totalValueUSD
        totalCount
        edges {
          cursor
          node {
            creator {
              id
              image
              username
            }
            hodler {
              id
              image
              username
            }
            coins
            coinPrice
            supplyHeld
            creatorCoinsInCirculation
            cashOutCoinPrice
            totalSoldUSD
            totalBoughtUSD
            dateTimeHodle
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

export const PORTFOLIO = gql`
  query(
    $publicKey: String!
    $first: Int
    $after: Binary
    $filter: CreatorsIHodleFilterInput
  ) {
    profile(publicKey: $publicKey) {
      username
      creatorsIHodle_next(first: $first, after: $after, filter: $filter) {
        totalBoughtUSD
        totalSoldUSD
        totalValueUSD
        totalCount
        edges {
          cursor
          node {
            creator {
              id
              image
              username
            }
            hodler {
              id
              image
              username
            }
            coins
            coinPrice
            supplyHeld
            creatorCoinsInCirculation
            cashOutCoinPrice
            totalSoldUSD
            totalBoughtUSD
            dateTimeHodle
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

export const PROFILES = gql`
  query profiles($first: Int, $after: Binary, $filter: ProfileFilterInput) {
    profiles(filter: $filter, first: $first, after: $after) {
      totalCount
      edges {
        cursor
        node {
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

export const PROFILES_FOR_ID = gql`
  query profiles($first: Int, $after: Binary, $filter: ProfileFilterInput) {
    profiles(filter: $filter, first: $first, after: $after) {
      totalCount
      edges {
        cursor
        node {
          id
          username
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

export const PROFILE_METRICS = gql`
  query {
    profileMetric {
      locked
      lockedChange
      profilesCount
      profilesCountChange
      verifiedCount
      verifiedCountChange
    }
    profiles_next {
      totalCount
    }
  }
`;

export default {};
