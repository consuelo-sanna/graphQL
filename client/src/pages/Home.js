import React, { useState, useContext } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { GET_ALL_POSTS } from "../gql/queries";

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  // useLazyQuery is a hook that returns a function and some data in an object
  // when use more than one useQuery, they always return in the same variables.. so u can change those name

  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  // access context
  const { state, dispatch } = useContext(AuthContext);
  // react router
  let history = useHistory();

  const updateUserName = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Consuelo Sanna",
    });
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container p-5">
      <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{p.title}</h4>
                  </div>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn-btn-raised btn-primary"
        >
          Fetch posts
        </button>
      </div>
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <hr />
      <button className="btn btn-primary" onClick={updateUserName}>
        Change user name
      </button>
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
