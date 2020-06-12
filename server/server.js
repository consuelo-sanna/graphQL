const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

const app = express();

// db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DB_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connected..");
  } catch (error) {
    console.log("DB connection error ", error);
  }
};

// execute database connection
db();

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
