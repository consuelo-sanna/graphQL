import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    console.log("ojadoij");
  };

  return (
    <div className="container p-5">
      <div className="row p-5">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.emai)}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
