const { ApolloServer } = require("apollo-server");
require("dotenv").config();

/* to create a graphql server you need to define the type and resolvers
 * types: query/mutations/subscription
 * resolvers: functions that will resolve the query (usa stesso nome)
 */

const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

//gql server

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.listen(process.env.PORT, () => {
  console.log("graphql server is running..");
});
