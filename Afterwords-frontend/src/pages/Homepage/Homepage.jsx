import "./HomePage.scss";
import HomeComponents from "../../components/HomeComponents/HomeComponents.jsx";
import DrawerMenu from "../../components/DrawerMenu/DrawerMenu.jsx";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ isHomePage, loggedIn, setLoggedIn, id }) {
  const words = ["Light,", "Warmth,", "Words,", "Story,", "Legacy,"];
  const [index, setIndex] = useState(0);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();

  function filtersShowClick() {
    setShowTags(!showTags);
    // console.log("show me your tags", setShowTags);
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

  useEffect(() => {
    const wordEffectInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    // cleanup on unmount
    return () => clearInterval(wordEffectInterval);
  }, []);


  return (
    <>
      <HeaderNav
        loggedIn={loggedIn}
        isHomePage={true}
        filtersShowClick={filtersShowClick}
        showTags={showTags} />
      <main className="main__section">
        <DrawerMenu
          loggedIn={loggedIn}
          isHomeOptions={true}
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
          id={id}
        />
        <HomeComponents words={words} index={index} handleTagClick={handleTagClick} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </main>
    </>
  );
}

export default HomePage;
