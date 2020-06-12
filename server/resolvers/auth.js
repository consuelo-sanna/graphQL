const { gql } = require("apollo-server-express");

const me = () => "Consu";

module.exports = {
  Query: {
    me,
  },
};
