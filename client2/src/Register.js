import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import FormStructure from "./FormStructure";
import Alert from "./Alert";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  //
  const initial = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initial);
  const [{ showAlert, isLoading, user }, dispatch] = useStateValue();
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR__ALERT",
      });
    }, 2000);
  };
  const displayAlert = () => {
    dispatch({
      type: "DISPLAY__ALERT",
    });
    clearAlert();
  };
  const toggle = () => {
    setValues({
      ...values,
      isMember: !values.isMember,
    });
  };
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user, navigate]);
  //
  //REGISTRING USER
  //
  const registerUser = async (currentUser) => {
    dispatch({
      type: "REGISTER_USER",
    });
    try {
      const response = await axios.post("/v1/auth/register", currentUser);
      const { user, token, location,avatar } = response.data;
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          user,
          token,
          location,
          avatar,
        },
      });
      //addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  //
  //LOGIN USER
  //
  const logInUser = async (currentUser) => {
    dispatch({
      type: "LOGIN_USER",
    });
    try {
      const response = await axios.post("/v1/auth/login", currentUser);
      const { user, token, location,avatar } = response.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          token,
          location,
          avatar
        },
      });
     // addUserToLocalStorage({ user, token, location ,avatar });
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      logInUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    //
    //console.log(values);
  };
  //
  //
  return (
    <div className={styles.register}>
      <div className={styles.register__conatiner}>
        <form onSubmit={handleSubmit} className={styles.register__form}>
          <h3 className={styles.register__h3}>
            {values.isMember ? "Login" : "Register"}
          </h3>
          {showAlert && <Alert />}
          {!values.isMember && (
            <FormStructure
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormStructure
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormStructure
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            className={styles.register__button}
          >
            {values.isMember ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.register__p}>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggle} className={styles.register__b}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
