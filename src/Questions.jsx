import React from 'react'
import './App.css'
import { nanoid } from 'nanoid';


const Questions = ({ error, questions, start, setStart }) => {

    /*  Answers state for storing all the shuffled answer*/

    const [correctCount, setCorrectCount] = React.useState(0)
    const [toggle, setToggle] = React.useState(false)
    const [restart, setRestart] = React.useState(false)
    const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questions.length).fill(null))



    console.log(questions)



    /*ShuffleArray function for Shuffling correct and incorrect answers
    
answers: (4) ['Notebook', 'Money', 'Watch', 'Keys']
correctAnswer: "Watch"
id: "SX9AnH7pckZXpCr2zeJiy"
question: "In past times, what would a gentleman keep in his fob pocket?"

    */



    /*function handleSelect(questionId, userSelectedAnsId) {
            console.log(selectedAnswers)
    
            setSelectedAnswers((prevSelectedAnswers) => {
                let newSelectedAnswers = [];
    
                if (prevSelectedAnswers) {
                    newSelectedAnswers = [...prevSelectedAnswers];
                    newSelectedAnswers[questionId] = userSelectedAnsId;
                    return newSelectedAnswers;
                } else {
                    newSelectedAnswers[questionId] = userSelectedAnsId;
                    return newSelectedAnswers;
                }
    
            });
        }*/

    const quizQuestions = questions.map((question, questionIndex) => {
        return (
            <div className='quizes' key={questionIndex}>
                <h3>{question.question}</h3>
                <div className='answers-div'>
                    {question.answers?.map((answer, index) => {
                        const uniqueAnsId = nanoid()
                        return <button
                            key={index}
                            id={uniqueAnsId}
                            onClick={() => handleSelect(question.id, uniqueAnsId)}
                            className={`${questionIndex} answer_span  ${selectedAnswers[question.id] === uniqueAnsId ? 'select' : ''}  `}
                        >{answer}</button>
                    })}
                </div>
                <hr></hr>
            </div>
        )
    })



    function checkAnswers() {
        setToggle(true);
        setRestart(true)
        questions.forEach((question, index) => {
            const userAnswer = selectedAnswers[index];
            const correctAnswerId = question.correct_answer;

            document.getElementById(correctAnswerId).classList.add('correct');

            if (userAnswer !== undefined) {
                if (correctAnswerId === userAnswer) {
                    setCorrectCount(correctCount + 1);
                } else {
                    document.getElementById(userAnswer).classList.add('wrong');
                }
            }

            answers[index].forEach((answer) => {
                if (answer !== correctAnswerId && answer !== userAnswer) {
                    document.getElementById(answer).disabled = true;
                }
            });

        });
    }
    function playAgain() {
        setStart(false)
        setRestart(false)
        setToggle(false)
    }

    return (
        <div className='quiz-div'>
            {error ?
                <h1>{error}</h1>
                : quizQuestions}
            {  /*{restart ?
                < button className={`play-again-btn ${start ? '' : 'btn'}`} onClick={playAgain}>Play Again</button>
                : < button className={`check-btn ${start ? '' : 'btn'}`} onClick={checkAnswers}>Check Answer</button>
            }*/}
            {toggle && <h3 className='score-msg'>You got <span className='score'>{correctCount}/{questions.length}</span> Correct Answers</h3>}
        </div>
    )
}
export default Questions;

