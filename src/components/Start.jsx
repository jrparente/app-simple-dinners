import React, { useState } from "react";

export default function Start(props) {
  const [hideStartingScreen, setHideStartingScreen] = useState(false);
  const [user, setUser] = useState({ username: "", household: {} });

  // function to hide initial screen and show Starting Quiz
  function getStarted() {
    setHideStartingScreen(true);
  }

  // handle form
  function handleChange(event) {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submitToApi(formData)
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    props.createNewMeal();
  }

  return (
    <section className="start-quiz">
      {!hideStartingScreen && (
        <>
          <div className="flex flex-column hidden-header">
            <p className="title lh-400">
              Tired of trying to think about what to have for dinner?
            </p>
            <img src="/cooking.svg" alt="" className="header-image" />
            <p>
              Get simple dinner ideas and generate a shopping list for the week!
            </p>
            <button onClick={getStarted} className="margin-inline-auto">
              Get Started
            </button>
          </div>
        </>
      )}

      {hideStartingScreen && (
        <form onSubmit={handleSubmit} className="form flex flex-column">
          <label htmlFor="username">What's your name?</label>
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={handleChange}
            value={user.username}
            required="required"
          />
          <label htmlFor="household">
            How many people are there in your household?
          </label>
          <input
            type="number"
            name="household"
            onChange={handleChange}
            value={user.household}
            required="required"
          />

          <button className="margin-inline-auto">Get me my Dinners!</button>
        </form>
      )}
    </section>
  );
}
