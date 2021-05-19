import { gql } from "graphql-request";

export const SUGGEST_KEYWORD = gql`
  mutation suggestKeyword($input: SuggestKeywordInput!) {
    suggestKeyword(input: $input)
  }
`;

export default {};
