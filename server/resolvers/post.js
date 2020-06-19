const { gql, UserInputError } = require("apollo-server-express");
const { authCheck } = require("../helpers/auth");
const { posts } = require("../temp");
const { DateTimeResolver } = require("graphql-scalars");
const Post = require("../models/post");
const User = require("../models/user");

// queries
const totalPosts = () => posts.length;

// mutations.
// per args ovviamente puoi usare object destructur o spread operator { id: posts.length +1 ...args.input}
const postCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  // validation
  if (args.input.content.trim() === "") throw new Error("Content is required");

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDb._id,
  })
    .save()
    .then((post) => post.populate("postedBy", "_id username").execPopulate());

  return newPost;
};

const allPosts = async (parent, args) => {
  return await Post.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: -1 })
    .exec();
};

const postsByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Post.find({ postedBy: currentUserFromDb })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: { allPosts, postsByUser },
  Mutation: { postCreate },
};
