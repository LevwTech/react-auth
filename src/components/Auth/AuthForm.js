import { useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

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
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuseaVZfJgxqYPMwsGInpPAov6bgkx-As",
        {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) alert(data.error.message);
          console.log(data);
        })
        .catch((e) => alert(e.message));
    }
  }
  return (
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
  );
};

export default AuthForm;
