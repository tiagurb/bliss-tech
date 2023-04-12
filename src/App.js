import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetail";
import SearchBar from "./components/SearchBar";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
    <SearchBar/>
    <Routes>
      <Route path="/" element={<QuestionList/>}/>
      <Route path="/question/:questionId" element={<QuestionDetail />} />
      <Route path="/questions?limit=10&offset=0&filter=:query" element={<SearchPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
