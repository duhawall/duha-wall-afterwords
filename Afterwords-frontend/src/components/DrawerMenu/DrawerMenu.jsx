import "./DrawerMenu.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function DrawerMenu({ handleTagClick, showTags, selectedTag, isHomeOptions, user }) {
  const [tags, setTags] = useState(null);

  useEffect(() => { }, [tags]);

  return (
    <>
      {isHomeOptions ? (
        <div
          className={`filters-container ${showTags === true ? "filters-container--open" : ""
            }`}
        >
          <ul className="filters__drawer">
            <li
              className={`filters__tag ${selectedTag === "/about" && "filters__tag--selected"}`}
              onClick={() => handleTagClick("about", "/about")}
            >
              About
            </li>
            <li
              className={`filters__tag ${selectedTag === "/how-to" && "filters__tag--selected"}`}
              onClick={() => handleTagClick("how-to", "/how-to")}
            >
              How To
            </li>
            <li
              className={`filters__tag ${selectedTag === "/login" && "filters__tag--selected"}`}
              onClick={() => handleTagClick("login", "/login")}
            >
              Login
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={`filters-container ${showTags === true ? "filters-container--open" : ""
            }`}
        >
          <ul className="filters__drawer filters__drawer--extended">
            <li
              className={`filters__tag ${selectedTag === "/add-loved-one" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("add-loved-one", "/add-loved-one")}
            >
              Add A Loved One
            </li>
            <li
              className={`filters__tag ${selectedTag === "/add-entry" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("add-entry", "/add-entry")}
            >
              Add Entry
            </li>
            <li
              className={`filters__tag ${selectedTag === `/loved-ones/${user.id}/all` ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("loved-ones", `/loved-ones/${user.id}/all`)}
            >
              View Loved Ones
            </li>
            <li
              className={`filters__tag ${selectedTag === "/logged" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("logged", "/logged")}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default DrawerMenu;
