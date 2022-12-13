import React from "react";
import cooking from "../../public/cooking.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faFolder } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  return (
    <header className="header flex">
      <button onClick={props.getAllDinners}>
        {props.weeklyDinners.length > 0 ? `Get Another Menu` : `Get Dinners`}
      </button>

      {props.weeklyDinners.length > 0 ? (
        <button onClick={props.saveMenu}>
          <FontAwesomeIcon icon={faSave} />
        </button>
      ) : (
        <button onClick={props.getSavedMenu}>
          <FontAwesomeIcon icon={faFolder} />
        </button>
      )}

      {/* <img src={cooking} className="logo" /> */}
    </header>
  );
}
