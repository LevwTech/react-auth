import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./AuthForm.module.css";
import types from "../../store/actionTypes";

const AuthForm = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const token = useSelector((state) => state.token);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
        console.log(data);
        dispatch({ type: types.LOGIN, payload: data.idToken });
        console.log(token);
        console.log(isLoggedIn);
      })
      .catch((e) => alert(e.message));
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
