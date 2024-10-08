import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  "App-body": {
    fontSize: "1.4rem",
    padding: "1.2em",
    height: "45%",
  },

  "form-inputs": {
    display: "flex",
    gap: ".2em",
  },

  input: {
    height: "1.4rem",
  },
  small: {
    "@media (max-width: 900px)": {
      display: "flex",
      flexDirection: "column",
    },
  },

  button: {
    width: "auto",
    "@media (max-width: 900px)": {
      width: "20%",
      fontSize: "1rem",
    },
  },
});

function Login() {
  return (
    <React.Fragment>
      <div className={css(styles["App-body"])}>
        <p>Login to access the full dashboard</p>
        <form className={css(styles["form-inputs"], styles.small)}>
          <label htmlFor="email">Email:</label>
          <input className={css(styles.input)} type="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input
            className={css(styles.input)}
            type="password"
            name="password"
          />
          <button className={css(styles.button)}>OK</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
