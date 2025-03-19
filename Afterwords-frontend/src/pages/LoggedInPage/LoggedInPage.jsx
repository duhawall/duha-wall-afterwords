import "./LoggedInPage.scss";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import DrawerMenu from "../../components/DrawerMenu/DrawerMenu.jsx";
import LoggedComponents from "../../components/LoggedComponents/LoggedComponents.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LoggedInPage({ user, isHomePage }) {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();

  function filtersShowClick() {
    setShowTags(!showTags);
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
        <DrawerMenu
          isHomeOptions={false}
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
          user={user}
        />
        <LoggedComponents handleTagClick={handleTagClick} selectedTag={selectedTag} user={user} />
      </main>
    </>
  );
}

export default LoggedInPage;
