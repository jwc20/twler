import ReactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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
