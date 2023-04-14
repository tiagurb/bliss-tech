import { useEffect, useState } from "react";
import { getAllQuestions, getHealth } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CheckConnection from "./CheckConnection";

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
      <h1 className="questions">Questions</h1>
      
      <ul>
        {questions.map((question) => {
          return (
            <li className="questionItem" key={question.id}>
              <h3>
                <Link className="questionLink" to={`/questions/${question.id}`}>{question.question}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default QuestionList;
