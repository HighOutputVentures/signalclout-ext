import { gql } from "@apollo/client";

export const TRANSFERS = gql`
  query(
    $id: Binary!
    $first: Int
    $after: Binary
    $filter: ProfileTransferFilterInput
  ) {
    node(id: $id) {
      id
      ... on Profile {
        transfers(first: $first, after: $after, filter: $filter) {
          totalCount
          totalDepositsUSD
          totalWithdrawalsUSD
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
              amountUSD
              satoshisBurned
              btcSpendAddress
              btcTransactionHash
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
    }
  }
`;
