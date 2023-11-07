import React, { useState } from "react";
import Login from "./_components/Login";
import Register from "./_components/Register";
import styles from "./auth.module.css";

function Auth() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container flex flex-col">
      {!showRegister ? (
        <>
          <Login />
          <div className={styles.secondContainer}>
            New Here?
            <div
              role="button"
              className={styles.link}
              onClick={() => setShowRegister(true)}
            >
              Create an Account
            </div>
          </div>
        </>
      ) : (
        <>
          <Register />
          <div className={styles.secondContainer}>
            Already have an account?
            <div
              role="button"
              className={styles.link}
              onClick={() => setShowRegister(false)}
            >
              Login here.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
