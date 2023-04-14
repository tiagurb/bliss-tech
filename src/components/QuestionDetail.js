import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHealth, getQuestion, updateVotes } from "../api";
import { toast } from "react-toastify";

function QuestionDetail() {
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState("");
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

  async function handleSubmitVote(index) {
    const updatedQuestion = {...question};
    updatedQuestion.choices[index].votes = String(Number(updatedQuestion.choices[index].votes) + 1);
    await updateVotes(updatedQuestion.id, updatedQuestion);
    setQuestion(updatedQuestion);
    toast.success("Voted with success");
  }

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
        <img src={question.image_url} alt={question.question} />
        <h3>{question.question}</h3>
        <p>
          Date of publishement:{" "}
          {new Date(question.published_at).toLocaleDateString()}
        </p>
        <div>
          {question.choices.map(({ choice, votes }, index) => {
            return (
              <div key={choice}>
                <p>{choice}</p>
                <p>Votes: {votes}</p>
                <button onClick={() => handleSubmitVote(index)}>Vote here</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;
