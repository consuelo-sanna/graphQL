/** create and exports type for graphql. in this case a query for me type */

const { gql } = require("apollo-server-express");

// const typeDefs = `
//     type Query {
//         totalPosts: Int!
//     }
// `;

module.exports = gql`
  type Query {
    me: String!
  }
`;
