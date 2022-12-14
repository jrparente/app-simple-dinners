import React from "react";

export default function Header(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className={`header flex ${props.isMobile ? "flex-reverse" : ""} `}>
      <p>
        Hi {user.username} here's your weekly menu for {user.household} people!
      </p>
      <div className={` flex ${props.isMobile ? "header-buttons" : ""} `}>
        <button onClick={props.createNewMeal}>New Menu</button>
        {props.menu && (
          <button
            aria-controls="primary-nav"
            aria-expanded="false"
            className={`nav-toggle flex ${props.showToggle ? "" : "hide"}`}
            onClick={props.changeShow}
          >
            <svg
              viewBox="0 0 448 512"
              width="30"
              title="bars"
              aria-hidden="true"
              className={`icon-open ${props.showSidebar ? "hide" : ""}`}
            >
              <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
            </svg>
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              width="30"
              title="cross"
              aria-hidden="true"
              className={`icon-close ${props.showSidebar ? "" : "hide"}`}
            >
              <g>
                <path d="M617.2,495.8l349.1,350.9c31.7,31.8,31.7,83.5,0,115.3c-31.7,31.9-83.1,31.9-114.8,0L502.4,611.2L149.8,965.6c-32,32.2-83.8,32.2-115.8,0c-32-32.1-32-84.3,0-116.4l352.6-354.5L48.2,154.6c-31.7-31.9-31.7-83.5,0-115.4c31.7-31.9,83.1-31.9,114.7,0l338.4,340.2l343.3-345c32-32.1,83.8-32.1,115.8,0c32,32.2,32,84.3,0,116.4L617.2,495.8z" />
              </g>
            </svg>
            <span className="sr-only">Menu</span>
          </button>
        )}
      </div>
    </header>
  );
}
