import "./App.css";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
