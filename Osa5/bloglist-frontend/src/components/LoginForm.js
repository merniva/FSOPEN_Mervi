import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Käyttäjänimi
      <input
        type="text"
        value={username}
        name="Username"
        id="username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      Salasana
      <input
        type="password"
        value={password}
        name="Password"
        id="password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="loginBtn" type="submit">Kirjaudu</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
