
import React from 'react';
import './App.css';
import Questions from './Questions';
import { nanoid } from 'nanoid';
import { shuffleArray, LoadingSpinner } from './utils'
import { options } from './topicoptions'
import { QuizReducer, Initial_State } from './QuizReducer';







function App() {

  const [questions, setQuestions] = React.useState([]);
  const [error, setError] = React.useState(null)
  const [start, setStart] = React.useState(false)
  const [state, dispatch] = React.useReducer(QuizReducer, Initial_State)

  async function fetchQuestions(category, level) {
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${level}&type=multiple`);
      if (!res.ok) {
        throw new Error('Error took place' + res.status);
      }
      const data = await res.json();

      return data.results;
    } catch (error) {
      throw error; // Re-throw the error
    }
  }




  const getQuestions = async (e) => {
    dispatch({ type: 'Fetching_started' })
    setStart(true)
    e.preventDefault()

    console.log(e.target.category.value)

    const category = e.target.category.value
    const level = e.target.level.value

    setTimeout(async () => {
      try {
        const questions = await fetchQuestions(category, level);
        setError(null); // Clear any previous errors
        setQuestions(() => {
          return questions.map((question) => {
            const correctAnswer = {
              id: nanoid(),
              value: question.correct_answer,
            }

            const incorrectAnswers = question.incorrect_answers.map(value => ({
              id: nanoid(),
              value,
            }))

            // [
            //   { id: 'fsadfq34aegvds', value: 'Apple' },
            //   { id: '4g3qefgvewdcew', value: 'Pear' },
            // ]

            return {
              question: question.question,
              id: nanoid(),
              answers: shuffleArray([...incorrectAnswers, correctAnswer]),
              correctAnswerId: correctAnswer.id,
              selectedAnswerId: null,
            };
          });
        });
      } catch (error) {
        setError(error.message); // Set the error message
      }
      dispatch({ type: 'Fetching-success' }); // Mark loading as completed
    }, 2000);
  };

  const selectAnswer = (selectedQuestionId, selectedAnswerId) => {
    console.log(state + 'appp')
    setQuestions(prevData => {
      return prevData.map(question => {
        if (question.id !== selectedQuestionId) return question
        return {
          ...question,
          selectedAnswerId,
        }
      })
    })
  }


  return (
    <div className="app">
      <div className="main">
        <div className={`start-container ${start ? 'game-start' : ''}`}>
          <h1>Quizzicle</h1>
          <form id='quiz-form' onSubmit={(e) => getQuestions(e)}>
            <p className='label-category' >Select Category :</p>
            <select id='category' className='category' name="category">
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>{option.label}</option>
                )
              })}
            </select>


            <p className='label-difficulty' >Select Difficulty :</p>
            <select id="level" className='level' name="level">
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
            <button className="start-btn" type='submit' >
              Start Quiz
            </button>
          </form>
        </div>

        <div className="quiz-setup">
          {state.loading ? (
            <LoadingSpinner />
          ) : (
            <Questions
              error={error}
              questions={questions}
              start={{ start, setStart }}
              loading={state.loading}
              selectAnswer={selectAnswer}
            />
          )}



        </div>
      </div>
    </div>
  );
}


export default App;