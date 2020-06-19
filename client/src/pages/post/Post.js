import React, { useState, useContext, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import FileUpload from "../../components/FileUpload";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { content, image } = values;

  const handleSubmit = () => {
    //
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="10"
          className="md-textarea form-control"
          placeholder="Write something cool"
          maxLength="150"
          disabled={loading}
        ></textarea>
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create</h4>}
      <div className="row">
        <div className="col-md-3">
          <FileUpload
            values={values}
            setValues={setValues}
            loading={loading}
            setLoading={setLoading}
            singleUpload
          />
        </div>
        <div className="col-md-9">{createForm()}</div>
      </div>
      <hr />
      {JSON.stringify(values.content)}
    </div>
  );
};

export default Post;
