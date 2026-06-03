import React from 'react';
import "../Auth.main.scss";
import "../button.style.scss";

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <div className="form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button className="button primary-button">Login</button>
        </div>
      </div>
    </main>
  )
}

export default Login