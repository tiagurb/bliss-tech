import { useEffect, useState } from "react";
import {  getHealth, getSearch } from "../api";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import ShareLink from "../components/ShareLink";

function SearchPage() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  let query = new URLSearchParams(location.search).get("filter");

  useEffect(() => {
    async function handleGetSearchQuestions() {
      try {
        const health = await getHealth();
        if (health.data.status !== "OK") {
          setError("API error");
          return;
        }
        const response = await getSearch(query);
        setQuestions(response.data);
      } catch (error) {
        toast.error("An error has occured", error.message);
      }
    }
    handleGetSearchQuestions();
  }, [query]);

  if (error) {
    return <p>{error}</p>;
  }

  if (questions.length === 0) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <Link to={"/"}><button className="dismissBtn">Dismiss search</button></Link>

      <h1>Search result:</h1>
      
      <ul>
        {questions.map((question) => {
          return (
            <li key={question.id}>
              <h3>
                <Link to={`/questions/${question.id}`}>{question.question}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
      <ShareLink />
    </>
  );
}

export default SearchPage;