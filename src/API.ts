import {shuffle} from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
// The function below fetches the data and then returns an array of questions which was twitched to have a new child of shuffled answers
export const fetchData = async (amount:number, difficulty : Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    const results = data.results || [];
    return results.map((question: Question) => (
        {
            ...question,
            answers: shuffle([...question.incorrect_answers, question.correct_answer])
        }
    )) // this return the edited data from the API
}