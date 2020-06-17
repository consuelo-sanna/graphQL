const { gql } = require("apollo-server-express");
const { authCheck } = require("../helpers/auth");
const { posts } = require("../temp");

// queries
const totalPosts = () => posts.length;

const allPosts = async (parent, args, { req }) => {
  await authCheck(req);
  return posts;
};

// mutations.
// per args ovviamente puoi usare object destructur o spread operator { id: posts.length +1 ...args.input}
const newPost = (parent, args) => {
  const post = {
    id: posts.length + 1,
    title: args.input.title,
    description: args.input.description,
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
