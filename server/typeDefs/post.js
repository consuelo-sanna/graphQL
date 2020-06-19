/** create and exports type for graphql */

const { gql } = require("apollo-server-express");

// const typeDefs = `
//     type Query {
//         totalPosts: Int!
//     }
// `;

module.exports = gql`
  type Post {
    _id: ID!
    content: String!
    image: Image
    postedBy: User
  }

  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
    singlePost(postId: String!): Post!
  }

  # questo mi aiuta a scrivere poi su mutations gli input
  input PostCreateInput {
    content: String!
    image: ImageInput
  }

  input PostUpdateInput {
    _id: String!
    content: String!
    image: ImageInput
  }

  # mutations
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
    postUpdate(input: PostUpdateInput!): Post!
    postDelete(postId: String!): Post!
  }
`;
