import React from 'react'
import './App.css'
import { nanoid } from 'nanoid';
import classNames from 'classnames'

const Questions = ({ error, start, dispatch, state, questions, selectAnswer }) => {


    const quizQuestions = questions?.map((question, questionIndex) => {



        return (
            <div className='quizes' key={questionIndex}>
                <h3>{question.question}</h3>
                <div className='answers-div'>
                    {question.answers?.map((answer) => {

                        const isSelected = question.selectedAnswerId === answer.id
                        const isCorrect = question.correctAnswerId === question.selectedAnswerId && question.selectedAnswerId === answer.id



                        const classNameList = [
                            'answer_span',
                            isSelected ? 'select' : null,
                            state.answerChecked && isCorrect ? 'correct' : '',
                            isSelected && state.answerChecked && !isCorrect ? 'wrong' : ''
                        ]

                        const classNames = classNameList.filter(Boolean).join(" ")


                        return <button
                            key={answer.id}
                            id={answer.id}
                            onClick={() => selectAnswer(question.id, answer.id)}
                            disabled={state.answerChecked && !isSelected && true}
                            className={classNames}
                        >{answer.value}</button>
                    })}
                </div>
                <hr></hr>
            </div>
        )
    })




    function checkAnswers() {
        dispatch({ type: 'Answer_checked' })
        questions.forEach((question) => {
            if (question.selectedAnswerId === question.correctAnswerId) {
                dispatch({ type: 'correct-answer' })
            }
        });

    }


    return (

        start.start &&

        <div className='quiz-div'>
            {error && <h1>{error}</h1>}
            {!error && quizQuestions}

            {!state.answerChecked && (
                <button className="check-btn" onClick={checkAnswers}>Check Answer</button>
            )}

            {state.answerChecked &&
                <>
                    <button className={`play-again-btn`}
                        onClick={() => {
                            start.setStart(false);
                            dispatch({ type: 'game-restarted' })
                        }} key={nanoid()} >Play Again</button>

                    <h3 className='score-msg'>You got <span className='score'>{state.count}/{questions.length}</span> Correct Answers</h3>
                </>

            }
        </div >

    )
}
export default Questions;

// How to determine which one to use: useState OR useReducer
// useReducer ---> If you have states which are "coupled together"/"depend on each other"
// useState --->  When you states are not depending on each other, can live separately (in any other cases)

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// Derive from your state whenever you can, do not create a new state just to save a new value
// console.log(questions)

// let correctCount = 0;
// for (let i = 0; i < questions.length; i++) {
//     const question = questions[i]

//     if (false) {
//         correctCount++
//     }
// }

// const correctCount2 = questions.reduce((acc, question) => {
//     // some branching
// }, 0)

// const correctCountMemo = React.useMemo(() => {
//     if (!isGameOn) return 0

//     let count = 0;

//     for (let i = 0; i < questions.length; i++) {
//         const question = questions[i]

//         if (false) {
//             count++
//         }
//     }

//     return count
// }, [questions])


// const correctCount2Memo = React.useMemo(() => {
//     if (!isGameOn) return 0

//     return questions.reduce((acc, question) => {
//         // some branching
//     }, 0)
// }, [questions])

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// You can be creative by extracting logic into your own custom hooks
// const requestStatuses = {
//     Idle: 'idle',
//     Pending: 'pending',
//     Resolved: 'resolves',
//     Rejected: 'rejected',
// }

// const useStatus = (defaultStatus = requestStatuses.Idle) => {
//     const [status, setStatus] = React.useState(defaultStatus)

//     const isIdle = status === requestStatuses.Idle
//     const isPending = status === requestStatuses.Pending
//     const isResolved = status === requestStatuses.Resolved
//     const isRejected = status === requestStatuses.Rejected

//     return {
//         isIdle,
//         isPending,
//         isResolved,
//         isRejected,
//         status,
//         setStatus,
//     }
// }


// const decreaseCounter = () => {
//     dispatch({ type: 'decrease' })
// }

// const { isIdle, isPending, isResolved, isRejected, } = useStatus()

// const hasError = error != null // ---> error !== undefined && error !== null

// if (isIdle) {
//     return ???
// }

// if (isPending && hasError) {
//     return 'We cought and erro but still trying to load the data'
// }

// if (isPending && !hasError) {

// }


// What to do next:
// 1. Use "selectAnswer" in Questions component
// 2. Derive correctCount from your state
// 3. Have a think how you could derive the styling based on your state values:
//    (selectedAnswerId, correctAnswerId and start)
// 4. Add prettier to your codebase and setup your IDE to format on save (latter is optional but recommended)
// Don't forget to add a script to you package.json that formats your files inside your "./src" directory


/*ShuffleArray function for Shuffling correct and incorrect answers

answers: (4) ['Notebook', 'Money', 'Watch', 'Keys']
correctAnswer: "Watch"
id: "SX9AnH7pckZXpCr2zeJiy"
question: "In past times, what would a gentleman keep in his fob pocket?"

*/



/* setSelectedAnswers((prevAnswers) => {
     if (prevAnswers)
         return {
             ...prevAnswers,
             [questionIndex]: userSelectedAnsId,
         }
     else {
         return {
             [questionIndex]: userSelectedAnsId,
         }
     }

 })*/

// setSelectedAnswers((prevAnswers) => {
//     let updatedAnswers = []
//     if (prevAnswers) {
//         updatedAnswers = [...prevAnswers];
//         updatedAnswers[questionIndex] = userSelectedAnsId;
//         return updatedAnswers;

//     } else {

//         updatedAnswers[questionIndex] = userSelectedAnsId;
//         return updatedAnswers;

//     }
// });
// console.log(selectedAnswers)