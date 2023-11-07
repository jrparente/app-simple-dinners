import React from "react";
import styles from "../auth.module.css";

function Form({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  error,
  successMessage,
}) {
  return (
    <div className={styles.authContainer}>
      {label === "Login" ? (
        <>
          <h2>Welcome Back!</h2>
          <p>Use your credentials to enter your account.</p>
        </>
      ) : (
        <>
          <h2>Create a new Account</h2>
          <p>Get started today in creating your new cookbook!</p>
        </>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor={`${label}-username`}>Username: </label>
          <input
            type="text"
            id={`${label}-username`}
            placeholder="Select a username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={`${label}-password`}>Password: </label>
          <input
            type="password"
            id={`${label}-password`}
            placeholder="Select a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit">{label}</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
