import React from "react";
import styles from "./Landing.module.css";
import logo from "./images/logo.svg";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className={styles.landing}>
      <nav>
        <img className={styles.landing__logo} src={logo} alt="" />
      </nav>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <h2>
            Job <span>Board</span>
          </h2>
          <p>
            Get your dream job
          </p>
          <Link to="/register" className={styles.registerLink_button}>
            <button>Login/Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
