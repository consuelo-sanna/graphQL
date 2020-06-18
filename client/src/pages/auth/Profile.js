import React, { useState, useMemo, Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import omitDeep from "omit-deep"; /** package that can remove some data from mutations headers */
import { PROFILE } from "../../gql/queries";
import { USER_UPDATE } from "../../gql/mutations";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";

const Profile = () => {
  const { state } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      console.log("dati ", data);
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"]),
      });
    }
  }, [data]);

  // mutation, uso l'hook per farmi rendere la funzione che esegue la mutazione e posso usare con userUpdate(input)
  // e restituisce un oggetto con lo stato della mutazione eseguita
  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("USER UPDATE MUTATION IN PROFILE ", data);
      toast.success("Profile Udpated");
    },
  });

  const { username, name, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit, dati che passo: ", values);
    setLoading(true);
    userUpdate({ variables: { input: values } });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12 pb-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Profile</h4>
          )}
        </div>
        <FileUpload
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
        />
      </div>
      <UserProfile
        {...values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
