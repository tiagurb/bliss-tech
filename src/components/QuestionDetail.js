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

  


}

export default QuestionDetail;
