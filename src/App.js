import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionList from "./components/QuestionList";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<QuestionList/>}/>
    </Routes>
    </div>
  );
}

export default App;
