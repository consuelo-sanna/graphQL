/** to avoid code repetition on the query you can use fragments gql */

import { gql } from "apollo-boost";

export const USER_INFO = gql`
  fragment userInfo on User {
    _id
    name
    username
    email
    images {
      url
      public_id
    }
    about
    createdAt
    updatedAt
  }
`;
