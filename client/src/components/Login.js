import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../style/Login.css"

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        if(email=="admin@gmail.com"){
          setAuth(2);
        }
        else{
          setAuth(1);
        }
        toast.success("Logged in Successfully");
      } else {
        setAuth(0);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
      /* <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class="btn btn-success btn-block">Submit</button>
      </form>
      </div> */
      /* <Link to="/register">register</Link> */
      <div className="body text-center login-body">

        <main className="login-form-signin">
          <form onSubmit={onSubmitForm}>
            {/* <img class="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
            <h1 className="h3 mb-5 fw-normal">Please sign in</h1>

            <div className="form-floating form-group form-inline">
              <input type="email" className="form-control" id="floatingInput" placeholder="Email" name="email" value={email} onChange={e => onChange(e)}/>
            </div>
            <div className="form-floating form-group form-inline">
              <input type="password" name="password" className="form-control my-3" value={password} onChange={e => onChange(e)} id="password" placeholder="Password" />
            </div>

            {/* <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div> */}
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            {/* <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
          </form>
        </main>
      </div>
  );
};

export default Login;
