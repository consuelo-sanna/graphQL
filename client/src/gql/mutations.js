import { USER_INFO } from "./fragments";
import { gql } from "apollo-boost";

// creo la query per la mutazione.
export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;
