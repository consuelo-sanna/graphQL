/** create and exports type for graphql */

const { gql } = require("apollo-server-express");

// const typeDefs = `
//     type Query {
//         totalPosts: Int!
//     }
// `;

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    totalPosts: Int!
    allPosts: [Post!]!
  }

  # mutations
  type Mutation {
    newPost(title: String!, description: String!): Post!
  }
`;
