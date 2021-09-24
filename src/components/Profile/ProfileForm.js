import classes from "./ProfileForm.module.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const userToken = useSelector((state) => state.token);
  const [goToHome, setGoToHome] = useState(false);

  function onChangeHandler(e) {
    setNewPassword(e.target.value);
  }
  function onClickHandler(e) {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBuseaVZfJgxqYPMwsGInpPAov6bgkx-As",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: userToken,
          password: newPassword,
          returnSecureToken: false,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error.message);
        else {
          setGoToHome(true);
        }
      })
      .catch((e) => alert(e));
  }
  return (
    <React.Fragment>
      {goToHome && <Redirect to="/"></Redirect>}
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input onChange={onChangeHandler} type="password" id="new-password" />
        </div>
        <div className={classes.action}>
          <button onClick={onClickHandler}>Change Password</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ProfileForm;
