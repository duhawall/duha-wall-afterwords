import "./Homepage.scss";
// import PhotoList from "../../components/PhotoList/PhotoList.jsx";
import OptionSelected from "../../components/OptionSelected/OptionSelected.jsx";
import OptionsList from "../../components/OptionsList/OptionsList.jsx";
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const words = ["Light,", "Warmth,", "Legacy,", "Words,", "Messages,", "Story,"];
  const [index, setIndex] = useState(0);
  // const [optionStatus, setOptionStatus] = useState("");
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
      navigate("/");
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
      <HeaderNav isHomePage={true} filtersShowClick={filtersShowClick} showTags={showTags} />
      <main className="main__section">
        <OptionsList
          handleTagClick={handleTagClick}
          showTags={showTags}
          selectedTag={selectedTag}
        />
        <OptionSelected words={words} index={index} selectedTag={selectedTag} handleTagClick={handleTagClick} />
        {/* <section className="mission__section">
          <div alt="light blue sky background" className="background-photo">
          </div>
          <h3 className="mission__text">
              Your <span className="mission__text mission__text--changing">{words[index]},</span>
              <br></br>
              Their Comfort
            </h3>
          <div className="about__section">
              <p className="about__text">Afterwords understands that there is no right time to speak
                of loss, as it is one of life’s most profound challenges.
              </p>
              <p className="about__text">
                So we wanted to create
                a space designed to shift and encourage a deeper focus towards embracing the love we
                carry for our loved ones and sharing its beauty in a deeply meaningful way.
              </p>
              <p className="about__text">
                Our aim is to help you leave the love and support for your loved ones, that
                can only be truly felt through you. Your entries are meant to offer comfort,
                guidance, and healing during their time of grief.
              </p>
              <p className="about__text">
                Our mission is simple: share what you want to leave your loved one(s) with
                in a way that transcends time.</p>
            </div>
          <ul className="how-to__section">
            <li className="how-to__instructions"><strong>1. Sign Up:</strong>
              <br></br>Create an account on Afterwords to access and store your entries.</li>

            <li className="how-to__instructions"><strong>2. Add a Loved One:</strong>
              <br></br>
              Enter their name to start writing.
              <br></br>
              You’ll get a Unique Code (UIC)—share it with them!</li>

            <li className="how-to__instructions"><strong>3. Write Messages:</strong>
              <br></br>
              Leave up to 31 messages per person,
              <br></br>
              to encourage deep reflection. Edit anytime.</li>

            <li className="how-to__instructions"><strong>4. Safe & Secure:</strong>
              <br></br>
              Entries are saved securely and encrypted, so only
              <br></br>
              you and your loved ones with the UIC can see them.</li>

            <li className="how-to__instructions"><strong>5. Lost Code?</strong>
              <br></br>Our future updates will provide more authentication options.</li>

            <li className="how-to__instructions"><strong>6. Leave a Legacy:</strong>
              <br></br>Your words will comfort and support them forever.</li>
          </ul>
        </section> */}
      </main>
    </>
  );
}

export default Homepage;
