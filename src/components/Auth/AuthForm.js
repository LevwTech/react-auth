import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import classes from "./AuthForm.module.css";
import types from "../../store/actionTypes";
import { Redirect } from "react-router-dom";

const AuthForm = () => {
  const [goToHome, setGoToHome] = useState(false);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  // const token = useSelector((state) => state.token);
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);

  function onChangeEmailHandler(e) {
    setEmail(e.target.value);
  }
  function onChangePasswordHandler(e) {
    setPassword(e.target.value);
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function submitHandler(e) {
    e.preventDefault();
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuseaVZfJgxqYPMwsGInpPAov6bgkx-As";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuseaVZfJgxqYPMwsGInpPAov6bgkx-As";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error.message);
        else {
          dispatch({ type: types.LOGIN, payload: data.idToken });
          setGoToHome(true);
        }
      })
      .catch((e) => alert(e.message));
  }
  return (
    <React.Fragment>
      {goToHome && <Redirect to="/"></Redirect>}
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={onChangeEmailHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={onChangePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default AuthForm;
