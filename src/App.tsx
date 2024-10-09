import { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchData, QuestionState } from "./API";
import { Difficulty } from "./API";
import { useQuery } from "@tanstack/react-query";


const TOTAL_QUESTION = 10;
const App = () => {
  // using react query to handle the data fetched from the api
  const {data, isLoading} = useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchData(TOTAL_QUESTION, Difficulty.Easy),// AND the query function modifies the data fetched
  });
  const [questions, SetQuestions] = useState<QuestionState[]>([]);// this is the state of the questions
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  console.log(questions)
  const startApp = async () => {
    const questions = await fetchData(TOTAL_QUESTION, Difficulty.Easy);
    SetQuestions(questions);
    setNumber(0);
    setSelectedAnswers([]);
    setScore(0);
    setGameOver(false);
  };
  const checkAnswer = () => {};
  const nextQuestion = () => {};

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Welcome to the trivia quiz</h1>
      <button onClick={startApp}>Start quiz</button>
      {/* <QuestionCard
        question={questions[number].question}
        TotalQuestion={TOTAL_QUESTION}
        questionNumber={number + 1}
        callback={checkAnswer}
        answers={questions[number].answer}
        selectedAnswer={selectedAnswers ? selectedAnswers[number] : number}
      /> */}
    </div>
  );
};

export default App;
