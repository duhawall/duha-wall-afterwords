import "./PhotosPage.scss";
import PhotoList from "../../components/PhotoList/PhotoList.jsx";
import OptionsList from "../../components/OptionsList/OptionsList.jsx";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import { useState, useEffect } from "react";

function PhotosPage() {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const words = ["Light", "Warmth", "Legacy", "Words", "Messages", "Story"];
  const [index, setIndex] = useState(0);

  function filtersShowClick() {
    setShowTags(!showTags);
  }

  function handleTagClick(clickedTag) {
    if (selectedTag != clickedTag) {
      setSelectedTag(clickedTag);
    } else {
      setSelectedTag("");
    }
  }

  // set 2 seconds interval to change word
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  return (
    <>
      <HeaderNav isHomePage={true} filtersShowClick={filtersShowClick} showTags={showTags} />
      <main className="main__section">
        {/* <a href="/"><h1 className="logo">Afterwords.</h1></a> */}
      </main>
      <main className="main__section">
        <OptionsList
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
        />
        <div className="mission-photos__section">
          <section className="mission__section">
            <div alt="light blue sky background" className="background-photo">
              <h3 className="mission__text">
                Your <span className="mission__text--changing">{words[index]},</span>
                <br></br>
                Their Comfort
              </h3>
            </div>

          </section>
          {/* <PhotoList selectedTag={selectedTag} /> */}
        </div>
      </main>
    </>
  );
}

export default PhotosPage;
