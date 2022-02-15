import "./App.css";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/hkrbooks" exact element={<Homepage />} />
        <Route path="/hkrbooks/login" exact element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
