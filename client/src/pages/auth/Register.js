import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
  const [email, setEmail] = useState("xsakura95x@hotmail.it");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    const result = await auth.sendSignInLinkToEmail(email, config);
    console.log("result ", result);

    // show toast notification to user about email sent
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    // save user email to local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear the email from the state
    setEmail(" ");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      {/* <h4>Register</h4> */}
      {loading ? <h4 className="test-danger">Loading</h4> : <h4>Register</h4>}

      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
