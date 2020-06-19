import React from "react";
import Image from "./Image";
import { Link, useHistory } from "react-router-dom";

const PostCard = ({
  post,
  showUpdateButton = false,
  showDeleteButton = false,
  handleDelete = (f) => f,
}) => {
  const { image, content, postedBy } = post;
  const history = useHistory();
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Link to={`/post/${post._id}`}>
          <Image image={image} />
        </Link>
        <h4 className="text-primary">@{post.postedBy.username}</h4>
        <hr />
        <small>{content}</small>
        <br />
        <br />
        {showDeleteButton && (
          <button
            onClick={() => handleDelete(post._id)}
            className="btn m-2 btn-danger"
          >
            Delete
          </button>
        )}
        {showUpdateButton && (
          <button
            className="btn m-2 btn-warning"
            onClick={() => history.push(`/post/update/${post._id}`)}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
