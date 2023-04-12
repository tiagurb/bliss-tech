import { useEffect, useState } from "react";
import {  getHealth, getSearch } from "../api";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const { query } = useParams


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
        console.log(response.data)
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
      <h1>Questions</h1>
      
      <ul>
        {questions.map((question) => {
          return (
            <li>
              <h3 key={question.id}>
                <Link to={`/question/${question.id}`}>{question.question}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default QuestionList;