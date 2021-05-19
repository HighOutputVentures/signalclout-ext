import { gql } from "graphql-request";

export const BITCLOUT_PRICE_QUERY = gql`
  query bitCloutPrice {
    bitCloutPrice {
      satoshisPerBitClout
      usdBitcoinLast
    }
  }
`;

export default {};
