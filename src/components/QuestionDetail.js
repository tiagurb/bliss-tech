import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHealth, getQuestion } from "../api";
import { toast } from "react-toastify";

function QuestionDetail() {
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState("");
  const { questionId } = useParams();

  useEffect(() => {
    async function handleGetQuestionDetail() {
      try {
        const health = await getHealth();
        if (health.data.status !== "OK") {
          setError("API error");
          return;
        }
        const response = await getQuestion(questionId);
        setQuestion(response.data);
      } catch (error) {
        toast.error("An error has occured", error.message);
      }
    }
    handleGetQuestionDetail();
  }, [questionId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (question.length === 0) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <h1>Question Details :</h1>
      <div>
        <img src={question.image_url} alt={question.question}/>
        <h3>{question.question}</h3>
        <p>Date of publishement: {new Date(question.published_at).toLocaleDateString()}</p>
        <div>
          {question.choices.map(({choice, votes}) => {
            return (
              <div key={choice}>
                <p>{choice}</p>
                <p>Votes: {votes}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
  


}

export default QuestionDetail;
