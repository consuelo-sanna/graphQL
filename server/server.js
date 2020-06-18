const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const { authCheckMiddleware } = require("./helpers/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

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

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

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
  context: ({ req, res }) => ({ req, res }),
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework, like express
// express server è anche graphql server cosi
apolloServer.applyMiddleware({
  app,
});

const httpServer = http.createServer(app);

// rest endpoint. graphql si trova a /graphql
app.get("/rest", authCheckMiddleware, function (req, res) {
  res.json({
    data: " you hit rest endpoint",
  });
});

// cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload
app.post("/uploadimages", authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      res.send({
        url: result.secure_url,
        public_id: result.public_id,
      });
    },
    {
      public_id: `${Date.now()}`, // public name
      resource_type: "auto",
    }
  );
});

// remove image
app.post("/removeimage", authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.send("ok");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
  console.log(
    `server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
