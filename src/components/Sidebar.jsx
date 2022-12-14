import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(props) {
  const displaySavedMenus = props.dinners.map((dinner, index) => (
    <div key={dinner.id}>
      <div
        className={`saved-menus-title ${
          dinner.id === props.currentDinnerID ? "selected-menu" : ""
        }`}
        onClick={() => props.changeDisplayedDinner(dinner.id)}
      >
        <h4 className="sidebar-menus-title">Menu {index + 1}</h4>
        <FontAwesomeIcon
          icon={faTrash}
          className="sidebar-trash-icon"
          onClick={(event) => props.deleteMenu(event, dinner.id)}
        />
      </div>
    </div>
  ));

  return (
    <section className={`${props.showSidebar ? "hide" : ""} pane sidebar`}>
      <div className="sidebar--header">
        <p className="sidebar-title">Saved Dinners</p>
        <button onClick={props.clearLocalStorage}>Delete All Menus</button>
      </div>
      {displaySavedMenus}
    </section>
  );
}
