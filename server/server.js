const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
require("dotenv").config();
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

const app = express();

// typeDefs loaded from the folder typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./typeDefs")));

// resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

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
