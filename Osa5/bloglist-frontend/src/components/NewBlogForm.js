import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ user, handleNotification, handleError, createBlog }) => {
  const [blogName, setBlogName] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();
    try {
      createBlog({
        title: blogName,
        author: blogAuthor,
        url: blogUrl,
        user: user.id,
      });
      setBlogName("");
      setBlogAuthor("");
      setBlogUrl("");
      handleNotification("Uuden blogin lisäys onnistui!");
    } catch (exception) {
      handleError("Blogin lisääminen epäonnistui :(");
    }
  };

  return (
    <form onSubmit={addNewBlog}>
      <div>
        <h3>Lisää uusi blogi</h3>
        <div>
          Blogin nimi:{" "}
          <input
            id="blogName"
            value={blogName}
            onChange={({ target }) => setBlogName(target.value)}
          />
        </div>
        <div>
          Blogin tekijä:{" "}
          <input
            id="blogAuthor"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          Blogin osoite:{" "}
          <input
            id="blogUrl"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
      </div>
      <div>
        <button id="addBtn" type="submit">
          Lisää
        </button>
      </div>
    </form>
  );
};

NewBlogForm.propTypes = {
  handleNotification: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default NewBlogForm;
