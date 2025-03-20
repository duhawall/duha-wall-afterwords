import "./App.scss";
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage.jsx";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";

function App() {
  const { id } = useParams();
  const [user, setUser] = useState({ id: "1", name: "Duha" });
  const [loggedIn, setLoggedIn] = useState(true);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  console.log(user);

  function filtersShowClick() {
    setShowTags(!showTags);
    console.log("show me your tags", setShowTags);
    console.log("hide your tags", showTags);
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
        {/* <Route path="/loved-ones" element={<LoggedInPage loggedIn={loggedIn} user={user} />} /> */}
        <Route path="/loved-ones/:id/all" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} />} />
        <Route path="/:id/add-entry" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} />} />
        <Route path="/logged" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} />} />
        <Route path="/logged" element={<Navigate to={`/loved-ones/${user.id}/all`} id={id} loggedIn={loggedIn} user={user} replace />} />
        {/* <Route path="/logged" element={<LoggedInPage id={id} loggedIn={loggedIn} user={user} />} /> */}
        <Route path="/logout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
