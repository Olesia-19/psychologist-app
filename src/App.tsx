import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Psychologists from "./pages/Psychologists/Psychologists";
import Favorites from "./pages/Favorites/Favorites";
import Header from "./components/Header/Header";
import ModalManager from "./components/ModalManager";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      {/* <Footer /> */}
      <ModalManager />
    </Router>
  );
}

export default App;
