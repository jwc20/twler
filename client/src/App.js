import ReactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/events" element={<EventPage />}></Route>
          <Route path="/result/:id" element={<ResultPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
