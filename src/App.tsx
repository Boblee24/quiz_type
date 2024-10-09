import React, { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchData, QuestionState } from "./API";
import { Difficulty } from "./API";
import { useQuery } from "@tanstack/react-query";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;
const App = () => {
  // using react query to handle the data fetched from the api
  const {data, isLoading} = useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchData(TOTAL_QUESTION, Difficulty.Easy),// AND the query function modifies the data fetched
  });


  const [questions, SetQuestions] = useState<QuestionState[]>([]);// this is the state of the questions
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  
  const startApp = async () => {
    const questions = await fetchData(TOTAL_QUESTION, Difficulty.Easy);
    SetQuestions(questions);
    setNumber(0);
    setSelectedAnswers([]);
    setScore(0);
    setGameOver(false);
  };
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) setScore((prev) => prev + 1);
    //save answer in the array for user answers
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setSelectedAnswers((prev) => [...prev, answerObject]);
  };
  const nextQuestion = () => {};

  console.log(questions)
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Welcome to the trivia quiz</h1>
      {gameOver || selectedAnswers.length === TOTAL_QUESTION ? (
        <button className="start" onClick={startApp}>
          Start
        </button>
      ) : null }
      {!gameOver && <QuestionCard
        question={questions[number].question}
        TotalQuestion={TOTAL_QUESTION}
        questionNumber={number + 1}
        callback={checkAnswer}
        answers={questions[number].answers}
        selectedAnswer={selectedAnswers ? selectedAnswers[number] : number}
      />}
    </div>
  );
};

export default App;
