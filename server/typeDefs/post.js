/** create and exports type for graphql */

const { gql } = require("apollo-server-express");

// const typeDefs = `
//     type Query {
//         totalPosts: Int!
//     }
// `;

module.exports = gql`
  type Query {
    totalPosts: Int!
  }
`;
