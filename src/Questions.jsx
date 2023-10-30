import React from 'react'
import './App.css'
import { nanoid } from 'nanoid';


const Questions = ({ questions, start, setStart }) => {

    /*  Answers state for storing all the shuffled answer*/
    /*const [selectedAnswers, setSelectedAnswers] = React.useState({ qIndex: null, useranswer: null })*/
    const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questions.length).fill(null))
    const [correctCount, setCorrectCount] = React.useState(0)
    const [toggle, setToggle] = React.useState(false)
    const [restart, setRestart] = React.useState(false)


    console.log(questions)



    /*ShuffleArray function for Shuffling correct and incorrect answers */



    function handleSelect(questionIndex, selectedElementId) {

        setSelectedAnswers((prevAnswers) => {
            if (prevAnswers) {
                return {
                    ...prevAnswers,
                    [questionIndex]: selectedElementId,
                }
            } else {
                return {
                    [questionIndex]: selectedElementId,
                }
            }


        })

    }
    let quizQuestions;

    if (questions) {
        quizQuestions = questions.map((question, questionIndex) => {

            return (
                <div className='quizes' key={questionIndex}>
                    <h3>{question.question}</h3>
                    <div className='answers-div'>
                        {question.answers[questionIndex]?.map((answer, index) => {
                            return <button
                                key={index}
                                id={nanoid()}
                                onClick={() => handleSelect(questionIndex, answer)}
                                className={`${questionIndex} answer_span  ${selectedAnswers[questionIndex] === answer ? 'select' : ''}  `}
                            >{answer}</button>
                        })}
                    </div>
                    <hr></hr>
                </div>
            )
        })
    } else {
        quizQuestions = <p className='fail-msg'>Failed to fetch questions</p>
    }

    function checkAnswers() {
        setToggle(true);
        setRestart(true)
        questions.forEach((question, index) => {
            const userAnswer = selectedAnswers[index];
            const correctAnswerId = question.correct_answer;

            // Add the 'correct' class to the correct answer
            document.getElementById(correctAnswerId).classList.add('correct');

            if (userAnswer !== undefined) {
                if (correctAnswerId === userAnswer) {
                    setCorrectCount(correctCount + 1);
                } else {
                    // Add the 'wrong' class to the user's wrong answer
                    document.getElementById(userAnswer).classList.add('wrong');
                }
            }

            // Disable all options except the correct answer and the user's answer
            answers[index].forEach((answer) => {
                if (answer !== correctAnswerId && answer !== userAnswer) {
                    document.getElementById(answer).disabled = true;
                }
            });

            // Disable the 'Check Answer' button after checking
        });
    }
    function playAgain() {
        setStart(false)
        setRestart(false)
        setToggle(false)
    }

    return (
        <div className='quiz-div'>
            {start && quizQuestions}
            {restart ?
                < button className={`play-again-btn ${start ? '' : 'btn'}`} onClick={playAgain}>Play Again</button>
                : < button className={`check-btn ${start ? '' : 'btn'}`} onClick={checkAnswers}>Check Answer</button>
            }
            {toggle && <h3 className='score-msg'>You got <span className='score'>{correctCount}/{questions.length}</span> Correct Answers</h3>}
        </div>
    )
}
export default Questions;

