import React, { useContext, useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PublicRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  let history = useHistory();
  // const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      history.push("profile");
    }
  }, state.user);

  return (
    <div className="container-fluid p-5">
      <Route {...rest} />
    </div>
  );
};

export default PublicRoute;
