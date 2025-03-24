import "./LoggedInPage.scss";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import DrawerMenu from "../../components/DrawerMenu/DrawerMenu.jsx";
import LoggedComponents from "../../components/LoggedComponents/LoggedComponents.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoggedInPage({ user, id }) {
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
          id={id}
        />
        <LoggedComponents handleTagClick={handleTagClick} selectedTag={selectedTag} user={user} />
      </main>
    </>
  );
}

export default LoggedInPage;
