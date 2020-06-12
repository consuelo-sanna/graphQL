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

  # questo mi aiuta a scrivere poi su mutations gli input
  input PostInput {
    title: String!
    description: String!
  }

  # mutations
  type Mutation {
    newPost(input: PostInput!): Post!
  }
`;
