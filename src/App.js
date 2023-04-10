import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetail";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<QuestionList/>}/>
      <Route path="/question/:questionId" element={<QuestionDetail />} />
    </Routes>
    </div>
  );
}

export default App;
