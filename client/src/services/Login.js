import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [response, setResponse] = useState('');
  const handleClick = async () => {
    const response = await fetch('http://localhost:9992/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setResponse(`Server response: ${data.message}`);
    console.log(data.token)
  };

  

  return (
    <CSSTransition
      classNames="transition"
      in={true}
      timeout={500}
      unmountOnExit
    >
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" >
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="button"  onClick={handleClick}>Log In</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("register")}
         
        >
          Don't have an account? Register here.
        </button>
        <p>{response}</p>
      </div>
    </CSSTransition>
  );
};
