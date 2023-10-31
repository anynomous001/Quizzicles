
import React from 'react';
import './App.css';
import Questions from './Questions';
import { nanoid } from 'nanoid';





function App() {

  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [error, setError] = React.useState(null)



  async function fetchQuestions(category, level) {

    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${level}&type=multiple`);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error)
      setError(error)
    }

  }














  const getQuestions = async (e) => {
    e.preventDefault()

    // I am afraid using vanilla JS is not the best idea
    // You can extract the form itself from the "event"
    // event.currentTarget <-- The element that has the event handler attached to
    // event.target <-- The element that has been dispatched the event
    // In your case both of these values will point to the same element,
    // event.target is used when you want to use the even bubbling to handle user actions
    const form = document.getElementById('quiz-form')

    const formdata = new FormData(form)
    const category = formdata.get('category')
    const level = formdata.get('level')



    // I think it would be nice to extract this into a utils.js as a utility function
    // so it won't live inside the component making your code more compact, easier
    // to read and maintain
    function shuffleArray(array) {
      // Can you think of a way do make this function even shorter?
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const questions = await fetchQuestions(category, level);

    // You cannot check the error this way because of scope works
    // The error should be handled in the main component scope
    if (!error) {
      // This could go inside the "fetchQuestions" function
      setQuizQuestions(() => {
        return questions.map((question) => {
          return {
            key: question.correct_answer,
            question: question.question,
            id: nanoid(),
            correctAnswer: question.correct_answer,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          }
        })

      });
    }

    setStart(true);
  };

  // I would extract this into a constants.js as this will unlikely to change
  // and it causes is a little bit of a "noise" in your component
  const options = [
    { value: '9', label: 'General Knowledge' },
    { value: '10', label: 'Entertainment: Books' },
    { value: '11', label: 'Entertainment: Film' },
    { value: '12', label: 'Entertainment: Music' },
    { value: '13', label: 'Entertainment: Musicals & Theatres' },
    { value: '14', label: 'Entertainment: Television' },
    { value: '15', label: 'Entertainment: Video Games' },
    { value: '16', label: 'Entertainment: Board Games' },
    { value: '17', label: 'Science & Nature' },
    { value: '18', label: 'Science: Computers' },
    { value: '19', label: 'Science: Mathematics' },
    { value: '20', label: 'Mythology' },
    { value: '21', label: 'Sports' },
    { value: '22', label: 'Geography' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
    { value: '25', label: 'Art' },
    { value: '26', label: 'Celebrities' },
    { value: '27', label: 'Animals' },
    { value: '28', label: 'Entertainment: Comics' },
    { value: '29', label: 'Science: Gadgets' },
    { value: '30', label: 'Entertainment: Japanese Anime & Manga' },
    { value: '31', label: 'Entertainment: Cartoon & Animations' }
  ];


  return (
    <div className="app">
      <div className="main">
        <div className={`start-container ${start ? 'game-start' : ''}`}>
          <h1>Quizzicle</h1>
          {/* 
            The following can be simplified: 
            FROM: onSubmit={(e) => getQuestions(e)}
            TO: onSubmit={getQuestions}

            // It is exactly the same but a bit less key strokes
            // Use the one you prefer, it doesn't make any difference :)
          
          */}
          <form id='quiz-form' onSubmit={(e) => getQuestions(e)}>
            <p className='label-category' >Select Category :</p>
            <select id='category' className='category' name="category">
              {options.map((option) => {
                return (
                  // Tiny mistake, you forgot to specify the "key"
                  // attribute on the "option" element which is important
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
