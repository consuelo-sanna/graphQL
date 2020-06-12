import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  // useLazyQuery is a hook that returns a function and some data in an object
  // when use more than one useQuery, they always return in the same variables.. so u can change those name
  const [
    fetchPosts,
    { data: postsData, loading: loadingDataPosts, error: errorPosts },
  ] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5"> Loading</p>;

  return (
    <div className="container p-5">
      <div className="row p-5">
        {data.allPosts.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>{p.title}</h4>
                </div>

                <p className="card-text"> {p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <button
        onClick={() => fetchPosts()}
        className="btn-btn-raised btn-primary"
      >
        Fetch posts
      </button>
      <hr />
      {JSON.stringify(postsData)}
    </div>
  );
};

export default Home;
