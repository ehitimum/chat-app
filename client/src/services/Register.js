import React, { useState } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

export const Register = (props) => {
    
    
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9992/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };


    return (
        <CSSTransition
      classNames="transition"
      in={true}
      timeout={500}
      unmountOnExit
    >
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={username} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            {error && <div>{error}</div>}
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div></CSSTransition>
    )
}