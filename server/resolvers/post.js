const { gql, UserInputError } = require("apollo-server-express");
const { authCheck } = require("../helpers/auth");
const { posts } = require("../temp");
const { DateTimeResolver } = require("graphql-scalars");
const Post = require("../models/post");
const User = require("../models/user");
const post = require("../typeDefs/post");
const { update } = require("../models/post");

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

const singlePost = async (parent, args) => {
  return await Post.findById({ _id: args.postId })
    .populate("postedBy", "_id username")
    .exec();
};

const postUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  // validation
  if (args.input.content.trim() === "") throw new Error("Content is required");
  // get current user mongodb _id based on email
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();
  // _id of post to update
  const postToUpdate = await Post.findById({ _id: args.input._id }).exec();
  // if currentUser id and id of the post's postedBy user id is the same, allow update
  if (currentUserFromDb._id.toString() !== postToUpdate.postedBy._id.toString())
    throw new Error("Unauthorized action");
  let updatedPost = await Post.findByIdAndUpdate(
    args.input._id,
    { ...args.input },
    { new: true }
  ).exec();
  return updatedPost;
};

const postDelete = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();
  const postToDelete = await Post.findById({ _id: args.postId }).exec();

  if (currentUserFromDb._id.toString() !== postToDelete.postedBy._id.toString())
    throw new Error("Unauthorized action");
  let deletedPost = await Post.findByIdAndDelete(args.postId).exec();
  return deletedPost;
};

module.exports = {
  Query: { allPosts, postsByUser },
  Mutation: { postCreate, postUpdate, postDelete },
};
