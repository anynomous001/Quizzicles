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



    function handleSelect(questionId, userSelectedAnsId) {
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

    }
    let quizQuestions;

    // Early return statements are super useful to perform conditional rendering
    // It can make your code much more simple and easier to read
    // If you use typescript, it will also helps you with type narrowing
    // eg.:
    /**
     * const data: null | Error | string // <-- this only means, that the data can be `NULL` and `ERROR` or a `STRING` 
     * 
     * // We can narrow the types down using `if` or `switch` statement (I will use if for our demonstration)
     * 
     * // The type of `data` at the moment is ---> null | Error | string
     * 
     * if (data instanceOf Error) {
     *      // The type of `data` at the moment is ---> Error
     *      return <div>Something went wrong: {error.message}</div>
     * }
     * 
     * // It is important to use return otherwise type narrowing won't work
     * 
     * // The type of `data` at the moment is ---> null | string
     * // As you can see, we narrows the type of `data` down to `NULL` or `STRING`
     * 
     * if (data === null) {
     *      // The type of `data` at the moment is ---> null
     *      return <div>Cannot find any data</div>
     * }
     * 
     * // The type of `data` at the moment is ---> string
     * As you can seem we completely eliminated all the other paths and at this point
     * we know that `data` can only be a `STRING`, so we can simply return it
     * 
     * 
     * return <div>The data value is: {data}</div>
     * 
     * 
     * 
     * 
     * When you write your application, always try to think defensively and always cover the so called
     * `UNHAPPY` path as it is very likely to happen. Conditional rendering is a very simple and effective way
     * to handle different scenarios.
     */


    if (!error) {
        quizQuestions = questions.map((question, questionIndex) => {

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
                                // This will not work unfortunately, as you will always get back a unique ID
                                // and you the following logical operation will never be true: selectedAnswers[question.id] === uniqueAnsId
                                className={`${questionIndex} answer_span  ${selectedAnswers[question.id] === uniqueAnsId ? 'select' : ''}  `}
                            >{answer}</button>
                        })}
                    </div>
                    <hr></hr>
                </div>
            )
        })
    } else {
        quizQuestions = <p className='fail-msg'>{error}</p>
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
        // It feels like you would only need a single state to handle your application state correctly
        // as you always set toggle and restart to the same value (as far as I can tell)
        setStart(false)
        setRestart(false)
        setToggle(false)
    }

    return (
        <div className='quiz-div'>
            {start && quizQuestions}
            {  /*{restart ?
                < button className={`play-again-btn ${start ? '' : 'btn'}`} onClick={playAgain}>Play Again</button>
                : < button className={`check-btn ${start ? '' : 'btn'}`} onClick={checkAnswers}>Check Answer</button>
            }*/}
            {toggle && <h3 className='score-msg'>You got <span className='score'>{correctCount}/{questions.length}</span> Correct Answers</h3>}
        </div>
    )
}
export default Questions;

