import styles from "./footer.module.css";
import React from "react";

function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} Meal Plan Generator
    </footer>
  );
}

export default Footer;
