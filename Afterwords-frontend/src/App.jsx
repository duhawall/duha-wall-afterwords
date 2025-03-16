import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import HeaderNav from "./components/HeaderNav/HeaderNav.jsx";
import PhotoSinglePage from "./pages/PhotoSinglePage/PhotoSinglePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomepageOptions from "./components/HomepageOptions/HomepageOptions.jsx";

function App() {

  return (
    <BrowserRouter>
      {/* <HeaderNav /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<HomepageOptions />} />
        <Route path="/howto" element={<HomepageOptions />} />
        <Route path="/login" element={<HomepageOptions />} />
        <Route path="/photos/:id" element={<PhotoSinglePage />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
