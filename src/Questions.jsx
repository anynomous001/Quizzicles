import React from 'react'
import './App.css'


const Questions = ({ questions, start }) => {

    /*  Answers state for storing all the shuffled answer*/
    const [answers, setAnswers] = React.useState([]);
    /*const [selectedAnswers, setSelectedAnswers] = React.useState({ qIndex: null, useranswer: null })*/
    const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questions.length).fill(null))
    const [correctCount, setCorrectCount] = React.useState(0)
    const [toggle, setToggle] = React.useState(false)

    React.useEffect(() => {
        const shuffledAnswers = questions.map(q =>
            shuffleArray([...q.incorrect_answers, q.correct_answer])
        );


        /*Updating answer state with shuffled answer */

        setAnswers(shuffledAnswers);
    }, [questions]);

    /*ShuffleArray function for Shuffling correct and incorrect answers */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;


    }

    /* removing select from every answer options with same class  */
    /* function resetAllOptionsFilter(allOptions) {
         for (let options of allOptions) {
             options.classList.remove("select")
         }
     }
     /*  selecting  answer options with answer id */

    /* function updateSelectStyle(element) {
         element.classList.add('select')
     }*/

    /*Handling selected answers  */
    function handleSelect(questionIndex, selectedElementId) {
        /*const resetAllOptions = document.getElementsByClassName(questionIndex)
        resetAllOptionsFilter(resetAllOptions)
        const selectedElementId = e.target.id
        const selectedElement = document.getElementById(selectedElementId)
        updateSelectStyle(selectedElement)*/

        /*setSelectedAnswers((prev) => {
            if (prev !== null) {
                return {
                    ...prev,
                    [questionIndex]: selectedElementId, // Assuming you want to update the questionIndex with selectedElementId
                };
            } else {
                return {
                    [questionIndex]: selectedElementId,
                };
            }
        });*/
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

    if (questions.length) {
        quizQuestions = questions.map((question, questionIndex) => {

            /*   const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);*/
            return (
                <div className='quizes' key={questionIndex}>
                    <h3>{question.question}</h3>
                    <div className='answers-div'>
                        {answers[questionIndex]?.map((answer, index) => {
                            return <button
                                key={index}
                                id={answer}
                                onClick={() => handleSelect(questionIndex, answer)}
                                className={`${questionIndex} answer_span  ${selectedAnswers[questionIndex] === answer ? 'select' : ''}  `}
                            >{answer}</button>
                        })}
                    </div>
                    <hr></hr>
                </div>
            )
        })
    }

    function checkAnswers() {
        setToggle(true)
        questions.forEach((question, index) => {

            const userAnswer = selectedAnswers[index]

            document.getElementById(question.correct_answer).classList.add('correct')




            if (userAnswer !== undefined) {
                if (question.correct_answer === userAnswer) {
                    setCorrectCount(correctCount + 1);
                } else if (question.correct_answer !== userAnswer) {
                    document.getElementById(userAnswer).classList.add('wrong')
                }
            }

            document.getElementsByClassName('check-btn')[0].disabled = true

        })
    }
    return (
        <div className='quiz-div'>
            {start && quizQuestions}
            {start && < button className='check-btn' onClick={checkAnswers}>Check Answer</button>}
            {toggle && <h3 className='score-msg'>You got <span className='score'>{correctCount}/{questions.length}</span> Correct Answers</h3>}
        </div>
    )
}
export default Questions;

