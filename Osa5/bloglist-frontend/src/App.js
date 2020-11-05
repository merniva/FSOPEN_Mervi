import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Error from "./components/Error";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      //blogService.getUserBlogs(user.id).then((payload) => setBlogs(payload.blogs));
      blogService.getAll(user.id).then((payload) => setBlogs(payload));
    }
  }, []);

  const blogFormRef = useRef();

  const getAllBlogs = async () => {
    const payload = await blogService.getAll();
    setBlogs(payload);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject);
    await getAllBlogs();
  };

  const handleNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  const handleError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg(null);
    }, 4000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      handleNotification("Kirjautuminen onnistui!");
      const payload = await blogService.getAll(user.id);
      setBlogs(payload);
    } catch (exception) {
      handleError("Virheellinen käyttäjätieto!");
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser", JSON.stringify(user));
      blogService.setToken(null);
      setUser(null);
      handleNotification("Kirjauduit ulos");
    } catch (exception) {
      handleError("Uloskirjautuminen epäonnistui!");
    }
  };

  const addBlogForm = () => (
    <Togglable buttonLabel="Lisää blogi" ref={blogFormRef}>
      <NewBlogForm
        user={user}
        handleError={handleError}
        handleNotification={handleNotification}
        createBlog={addBlog}
      />
    </Togglable>
  );

  const addNewLike = async (blog) => {
    try {
      await blogService.addLike({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user,
      });
      getAllBlogs();
    } catch (exception) {
      handleError("Tykkäyksen lisääminen epäonnistui!");
    }
  };

  const blogList = () =>
    blogs
      //.filter((blog) => blog.user && blog.user.username === user.username)
      .sort((a, b) => a.likes - b.likes)
      .map((blog, index) => (
        <Blog
          key={blog.id}
          blog={blog}
          index={index}
          getAllBlogs={getAllBlogs}
          handleNotification={handleNotification}
          loggedUser={user}
          addNewLike={addNewLike}
        />
      ))
      .reverse();

  return (
    <div>
      <h2>Blogit</h2>
      <Notification msg={notificationMsg} />
      <Error msg={errorMsg} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        <div>
          <p>Kirjautuneena sisään nimellä {user.name}</p>
          <button onClick={handleLogOut}>Kirjaudu ulos</button>
          {addBlogForm()}
          <h3>Aiemmin lisätyt</h3>
          <div id="blogList">{blogList()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
