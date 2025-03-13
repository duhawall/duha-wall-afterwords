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
        <section className="filters__section">
          <ul className="filters__drawer">
            {["About", "How To", "Login"].map((option, index) => (
              <li
                className={`filters__tag ${selectedTag === option ? "filters__tag--selected" : ""
                  }`}
                key={index}
                onClick={() => handleTagClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default OptionsList;
