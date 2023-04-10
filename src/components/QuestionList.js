import { useEffect, useState } from "react";
import { getAllQuestions, getHealth } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function handleGetAllQuestions() {
      try {
        const health = await getHealth();
        if (health.data.status !== "OK") {
          setError("API error");
          return;
        }
        const response = await getAllQuestions();
        setQuestions(response.data);
      } catch (error) {
        toast.error("An error has occured", error.message);
      }
    }
    handleGetAllQuestions();
  }, []);

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
          return <li><h3 key={question.id}>{question.question}</h3></li>;
        })}
      </ul>
    </>
  );
}

export default QuestionList;
