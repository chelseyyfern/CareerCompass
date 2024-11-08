import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login"; // Add this import statement
import Quiz from "./Quiz";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route> 
          <Route path="/home" element={<Home />}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;