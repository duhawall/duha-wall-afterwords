import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import HomeComponents from "./components/HomeComponents/HomeComponents.jsx";
// import HeaderNav from "./components/HeaderNav/HeaderNav.jsx";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";


function App() {

  return (
    <BrowserRouter>
      {/* <HeaderNav /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<HomeComponents />} />
        <Route path="/how-to" element={<HomeComponents />} />
        <Route path="/login" element={<HomeComponents />} />

        <Route path="/add-loved-one" element={<LoggedInPage />} />
        <Route path="/loved-ones" element={<LoggedInPage />} />
        <Route path="/logged" element={<LoggedInPage />} />
        <Route path="/photos/:id" element={<LoggedInPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
