import "./App.scss";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage.jsx";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";

function App() {
  // const [user, setUser] = useState({ id: "1", name: "Dina" });
  const [user, setUser] = useState({ id: "2", name: "Duha" });
  const [loggedIn, setLoggedIn] = useState(true);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  // const navigate = useNavigate();

  function filtersShowClick() {
    setShowTags(!showTags);
    // console.log("show me your tags", setShowTags);
    // console.log("hide your tags", showTags);
  }

  function handleTagClick(clickedTag, path) {
    if (selectedTag != clickedTag) {
      setSelectedTag(clickedTag);
      return <Navigate to={path} />
    } else {
      setSelectedTag("");
    }
    // console.log("selected tag is:",  selectedTag);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page Components */}
        <Route path="/" element={<HomePage
          isHomePage={true}
          loggedIn={loggedIn}
          filtersShowClick={filtersShowClick}
          showTags={showTags}
          handleTagClick={handleTagClick} />} />
        <Route path="/about" element={<HomePage loggedIn={loggedIn} />} />
        <Route path="/how-to" element={<HomePage loggedIn={loggedIn} />} />
        <Route path="/login" element={<HomePage isHomePage={true}
          user={user}
          setLoggedIn={setLoggedIn} />} />

        {/* LoggedIn Page Components */}
        <Route path="/add-loved-one" element={<LoggedInPage user={user}
        // setLoggedIn={setLoggedIn}
        // filtersShowClick={filtersShowClick}
        // showTags={showTags}
        // handleTagClick={handleTagClick} 
        />
        } />
        <Route path="/loved-ones" element={<LoggedInPage loggedIn={loggedIn} user={user} />} />
        <Route path="/loved-ones/:id/all" element={<LoggedInPage loggedIn={loggedIn} user={user} />} />
        <Route path="/logged" element={<LoggedInPage loggedIn={loggedIn} user={user} />} />
        <Route path="/logout" element={<Navigate to="/" replace loggedIn={loggedIn} />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
