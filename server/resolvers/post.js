const { gql } = require("apollo-server-express");

const { posts } = require("../temp");

// queries
const totalPosts = () => posts.length;

const allPosts = () => posts;

// mutations.
// per args ovviamente puoi usare object destructur
const newPost = (parent, args) => {
  const post = {
    id: posts.length + 1,
    title: args.title,
    description: args.description,
  };
  // push the new post
  posts.push(post);

  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
