import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Error from "./Error";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Error />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
