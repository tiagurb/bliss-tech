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

  async function handleSubmitVote(id, index) {
    const updatedQuestion = {...question};
    setVotes (Number(updatedQuestion.choices[index].votes) +1);
    console.log(updatedQuestion.choices[index].votes)
    await updateVotes(updatedQuestion.id, updatedQuestion);
    setQuestion(updatedQuestion);
    toast.success("Voted with success");
  }

  // async function handleVote(id, index) {
  //   const newQuestion = { ...question };
  //   if (newQuestion.choices[index]) {
  //     newQuestion.choices[index].votes =
  //       Number(newQuestion.choices[index].votes) + 1;
  //     setQuestion(newQuestion);
  //   }
  //   setQuestion(newQuestion);

  //   try {
  //     const response = await updateVotes(id, newQuestion);
  //     if (response.data.status !== "OK") {
  //       toast.error("Error updating votes");
  //       return;
  //     }
  //   } catch (error) {
  //     toast.error("An error has occurred", error.message);
  //   }
  // }

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
          {question.choices.map(({ choice, votes }) => {
            return (
              <div key={choice}>
                <p>{choice}</p>
                <p>Votes: {votes}</p>
                <button onClick={handleSubmitVote}>Vote here</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;
