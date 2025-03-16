import "./Homepage.scss";
// import PhotoList from "../../components/PhotoList/PhotoList.jsx";
import HomeComponents from "../../components/HomeComponents/HomeComponents.jsx";
import OptionsList from "../../components/OptionsList/OptionsList.jsx";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const words = ["Light,", "Warmth,", "Legacy,", "Words,", "Messages,", "Story,"];
  const [index, setIndex] = useState(0);
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

  // set 2 seconds interval to change word
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  return (
    <>
      <HeaderNav
        isHomePage={true}
        filtersShowClick={filtersShowClick}
        showTags={showTags} />
      <main className="main__section">
        <OptionsList
          isHomeOptions={true}
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
        />
        <HomeComponents words={words} index={index} handleTagClick={handleTagClick} />
      </main>
    </>
  );
}

export default Homepage;
