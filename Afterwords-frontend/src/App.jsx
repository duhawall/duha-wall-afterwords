import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage.jsx";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";

function App() {
  const { id } = useParams();
  const [user, setUser] = useState({ id: "1", name: "Duha" });
  const [lovedOne, setLovedOne] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  function filtersShowClick() {
    setShowTags(!showTags);
  }

  function handleTagClick(clickedTag, path) {
    if (selectedTag != clickedTag) {
      setSelectedTag(clickedTag);
      return <Navigate to={path} />
    } else {
      setSelectedTag("");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page Components */}
        <Route path="/" element={<HomePage id={id} isHomePage={true} loggedIn={loggedIn} filtersShowClick={filtersShowClick} showTags={showTags} handleTagClick={handleTagClick} />} />

        <Route path="/about" element={<HomePage id={id} loggedIn={loggedIn} handleTagClick={handleTagClick} />} />
        <Route path="/how-to" element={<HomePage id={id} loggedIn={loggedIn} handleTagClick={handleTagClick} />} />
        <Route path="/login" element={<HomePage id={id} isHomePage={true} user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleTagClick={handleTagClick} />} />


        {/* Logged Page Components */}
        <Route path="/logged" element={<Navigate to={`/${user.id}/loved-ones/all`} id={id} loggedIn={loggedIn} user={user} lovedOne={lovedOne} replace />} />
        <Route path="/:id/loved-ones/all" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} lovedOne={lovedOne} />} />
        <Route path="/:id/:lovedOneId/entries" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} lovedOne={lovedOne} />} />
        <Route path="/:id/:lovedOneId/entry/:entryId" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} lovedOne={lovedOne} />} />
        <Route path="/logout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
