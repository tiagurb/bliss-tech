import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetail";
import SearchBar from "./components/SearchBar";
import SearchPage from "./pages/SearchPage";
import CheckConnection from "./components/CheckConnection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <CheckConnection/>
      <SearchBar />
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/questions/:questionId" element={<QuestionDetail />} />
        <Route
          path="/questions?limit=10&offset=0&filter=:query"
          element={<SearchPage />}
        />
      </Routes>
      
    </div>
  );
}

export default App;
