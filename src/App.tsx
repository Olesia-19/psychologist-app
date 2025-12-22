import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Psychologists from "./pages/Psychologists";
// import Favorites from "./pages/Favorites";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
