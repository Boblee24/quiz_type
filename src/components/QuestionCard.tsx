import * as React from "react";

interface QuestionProps {
  question: string;
  answers: string[];
  selectedAnswer: any;
  questionNumber: number;
  TotalQuestion: number;
  callback: (answer:string | number) => void;
}

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  answers,
  selectedAnswer,
  TotalQuestion,
  questionNumber,
  callback
}) => {
  return(
    <div>
        <p>
            Question: {questionNumber}/{TotalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{__html:question}} />
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={selectedAnswer} value={answer} onClick={callback}>
                      <span dangerouslySetInnerHTML={{ __html:  answer  }}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default QuestionCard;
