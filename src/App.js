import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Depositamount from "./Deposit";
import Applyloan from "./applyloan";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/depositamount" element={<Depositamount />} />
          <Route path="/applyloan" element={<Applyloan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
