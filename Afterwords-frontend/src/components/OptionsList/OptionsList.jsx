import "./OptionsList.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "ninjatuna";
function OptionsList({ handleTagClick, showTags, selectedTag, clickedTag, isHomePage }) {
  const [tags, setTags] = useState(null);

  useEffect(() => { }, [tags]);

  return (
    <>
      {isHomePage ? (
        <div
          className={`filters-container ${showTags === true ? "filters-container--open" : ""
            }`}
        >
          <ul className="filters__drawer">
            <li
              className={`filters__tag ${selectedTag === "/about" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("about", "/about")}
            >
              About
            </li>
            <li
              className={`filters__tag ${selectedTag === "/howto" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("howto", "/howto")}
            >
              How To
            </li>
            <li
              className={`filters__tag ${selectedTag === "/login" ? "filters__tag--selected" : ""
                }`}
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
          <ul className="filters__drawer">
            <li
              className={`filters__tag ${selectedTag === "/about" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("addLovedOne", "/addLovedOne")}
            >
              Add Loved One
            </li>
            <li
              className={`filters__tag ${selectedTag === "/howto" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("/howto")}
            >
              Loved Ones
            </li>
            <li
              className={`filters__tag ${selectedTag === "/login" ? "filters__tag--selected" : ""
                }`}
              onClick={() => handleTagClick("/login")}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default OptionsList;
