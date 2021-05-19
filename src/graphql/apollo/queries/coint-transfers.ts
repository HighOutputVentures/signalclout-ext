import { gql } from "@apollo/client";

export const COIN_TRANSFERS = gql`
  query($publicKey: String!, $first: Int, $after: Binary) {
    profile_next(publicKey: $publicKey) {
      id
      coinTransferTransactions(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            creator {
              id
              username
            }
            sender {
              id
              username
            }
            receiver {
              id
              username
            }
            coins
            transaction
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
