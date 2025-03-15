import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import HeaderNav from "./components/HeaderNav/HeaderNav.jsx";
import PhotoSinglePage from "./pages/PhotoSinglePage/PhotoSinglePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import OptionSelected from "./components/OptionSelected/OptionSelected.jsx";

function App() {

  return (
    <BrowserRouter>
      {/* <HeaderNav /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<OptionSelected />} />
        <Route path="/howto" element={<OptionSelected />} />
        <Route path="/login" element={<OptionSelected />} />
        <Route path="/photos/:id" element={<PhotoSinglePage />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
