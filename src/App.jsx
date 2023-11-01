
import React from 'react';
import './App.css';
import Questions from './Questions';
import { nanoid } from 'nanoid';
import { shuffleArray } from './utils'
import { options } from './topicoptions'





function App() {

  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [error, setError] = React.useState(null)



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
    e.preventDefault()

    const form = document.getElementById('quiz-form')

    const formdata = new FormData(form)
    const category = formdata.get('category')
    const level = formdata.get('level')

    setStart(true);


    try {
      const questions = await fetchQuestions(category, level);
      setError(null); // Clear any previous errors
      setQuizQuestions(() => {
        return questions.map((question) => {
          const questionId = nanoid(); // Generate a unique ID for the question

          return {
            key: questionId, // Use the generated ID as the key
            question: question.question,
            id: questionId,
            correctAnswer: question.correct_answer,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          };
        });
      });
    } catch (error) {
      setError(error.message); // Set the error message
    }

  };


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
                  <option value={option.value}>{option.label}</option>

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
          <Questions error={error} questions={quizQuestions} start={start} setStart={setStart} />
        </div>
      </div>
    </div>
  );
}


export default App;