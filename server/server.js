const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
require("dotenv").config();

const app = express();

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

// applyMiddleware method connects ApolloServer to a specific HTTP framework, like express
// express server è anche graphql server cosi
apolloServer.applyMiddleware({
  app,
});

const httpServer = http.createServer(app);

// rest endpoint. graphql si trova a /graphql
app.get("/rest", function (req, res) {
  res.json({
    data: " you hit rest endpoint",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
  console.log(
    `server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
