import React from 'react';
import './App.css';
import Questions from './Questions';


async function fetchQuestions(category, level) {

  try {
    const res = await fetch(`https://opentdb.com/api.php?amount=5&category=555&difficulty=${level}&type=multiple`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('An error occurred:', error);
    return null
  }

}


function App() {

  const [questions, setQuestions] = React.useState([]);
  const [start, setStart] = React.useState(false);

  const getQuestions = async (e) => {
    e.preventDefault()

    const form = document.getElementById('quiz-form')

    const formdata = new FormData(form)
    const category = formdata.get('category')
    const level = formdata.get('level')

    const questions = await fetchQuestions(category, level);
    console.log(questions)
    setQuestions(questions);
    setStart(true);
  };

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
          <Questions questions={questions} start={start} setStart={setStart} />
        </div>
      </div>
    </div>
  );
}

export default App;