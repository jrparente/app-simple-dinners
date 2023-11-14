import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

function Home() {
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");

  return (
    <div className={`${styles.container}`}>
      {userID ? (
        <section className={styles.heroContainer}>
          <div className={styles.content}>
            <h2>Welcome to the Meal Plan Generator!</h2>
            <p>
              Your personalized recipe and meal planning assistant. Add your
              favorite recipes, generate meal ideas, and create your weekly
              shopping list.
            </p>
            <button role="link" onClick={() => navigate("/create-recipe")}>
              Start Planning
            </button>
          </div>
          <div className={styles.image}>
            <img src="/cooking.svg" alt="Meal Plan Generator" />
          </div>
        </section>
      ) : (
        <section className={styles.heroContainer}>
          <div className={styles.content}>
            <h2>Tired of trying to think about what to have for dinner?</h2>
            <p>
              Start planning your meals with the Meal Plan Generator. Add your
              favorite recipes, generate simple dinner ideas, and create your
              shopping list for the week.
            </p>
            <button role="link" onClick={() => navigate("/auth")}>
              Get Started
            </button>
          </div>
          <div className={styles.image}>
            <img src="/cooking.svg" alt="Meal Plan Generator" />
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
