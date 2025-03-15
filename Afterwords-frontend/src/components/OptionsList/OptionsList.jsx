import "./OptionsList.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "ninjatuna";
function OptionsList({ handleTagClick, showTags, selectedTag, clickedTag }) {
  const [tags, setTags] = useState(null);

  useEffect(() => { }, [tags]);

  return (
    <>
      <div
        className={`filters-container ${showTags === true ? "filters-container--open" : ""
          }`}
      >
        <ul className="filters__drawer">
          <li
            className={`filters__tag ${selectedTag === "/about" ? "filters__tag--selected" : ""
              }`}
            onClick={() => handleTagClick("/about")}
          >
            About
          </li>
          <li
            className={`filters__tag ${selectedTag === "/howto" ? "filters__tag--selected" : ""
              }`}
            onClick={() => handleTagClick("/howto")}
          >
            How To
          </li>
          <li
            className={`filters__tag ${selectedTag === "/login" ? "filters__tag--selected" : ""
              }`}
            onClick={() => handleTagClick("/login")}
          >
            Login
          </li>
        </ul>
      </div>
    </>
  );
}

export default OptionsList;
