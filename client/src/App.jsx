import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Toggle from "./Page/Toggle";
import Filter from "./Page/Filter";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Toggle />} />
          <Route exact path="/filter" element={<Filter />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
