import "./LoggedInPage.scss";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import OptionsList from "../../components/OptionsList/OptionsList.jsx";
import LoggedComponents from "../../components/LoggedComponents/LoggedComponents.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LoggedInPage() {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();

  function filtersShowClick() {
    setShowTags(!showTags);
    console.log("show me your tags", setShowTags);
    console.log("hide your tags", showTags);
  }

  function handleTagClick(clickedTag, path) {
    if (selectedTag != clickedTag) {
      setSelectedTag(clickedTag);
      navigate(path);
    } else {
      setSelectedTag("");
    }
  }

  return (
    <>
      <HeaderNav
        isHomePage={false}
        filtersShowClick={filtersShowClick}
        showTags={showTags} />
      <main className="main__section">
        <OptionsList
          isHomeOptions={false}
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
        />
        <LoggedComponents handleTagClick={handleTagClick} />
      </main>
    </>
  );
}

export default LoggedInPage;
