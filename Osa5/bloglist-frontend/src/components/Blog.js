import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({
  blog,
  index,
  getAllBlogs,
  handleNotification,
  handleError,
  loggedUser,
  addNewLike,
}) => {
  const [expandedBlog, setExpandedBlog] = useState(false);
  const showBlog = () => {
    setExpandedBlog(!expandedBlog);
  };

  const handleRemoveClick = async () => {
    if (window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}?`)) {
      try {
        await blogService.deleteBlog({
          id: blog.id,
        });
        getAllBlogs();
        window.scrollTo(0, 0);
        handleNotification(`Blogi "${blog.title}" poistettu tietokannasta!`);
      } catch (exception) {
        handleError("Blogin poistaminen epäonnistui :(");
      }
    }
  };

  const blogStyle = {
    paddingTop: 5,
    marginBottom: 5,
  };

  const infoStyle = {
    border: "solid",
    borderWidth: 2,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
  };

  const removeBtnStyle = {
    backgroundColor: "#8198de",
    border: "none",
  };

  return (
    <div>
      {expandedBlog === true ? (
        <div style={infoStyle} className="blog">
          <h4>
            {blog.author} : {blog.title}{" "}
            <button id="hideBtn" onClick={showBlog}>
              Piilota tiedot
            </button>
          </h4>
          <div id="likes" data-cy={`likes${index}`} style={blogStyle}>
            Tykkäykset: {blog.likes}{" "}
            <button id="likeBtn" onClick={() => addNewLike(blog)}>
              Tykkää
            </button>
          </div>
          <div style={blogStyle}>Blogin osoite: {blog.url}</div>
          <div style={blogStyle}>
            Lisännyt: {(blog.user && blog.user.username) || "-"}
          </div>
          {blog.user && blog.user.id === loggedUser.id && (
            <button
              id="removeBtn"
              style={removeBtnStyle}
              onClick={handleRemoveClick}
            >
              Poista
            </button>
          )}
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button id="showBtn" onClick={showBlog}>
            Näytä tiedot
          </button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  handleNotification: PropTypes.func.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
