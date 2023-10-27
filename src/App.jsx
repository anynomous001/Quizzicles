import React from 'react';
import './App.css';
import Questions from './Questions';


async function fetchQuestions(category, level) {

  const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${level}&type=multiple`);
  const data = await res.json();
  return data.results;
}


function App() {

  const [questions, setQuestions] = React.useState([]);
  const [start, setStart] = React.useState(false);

  const getQuestions = async () => {

    const category = document.getElementById('category').value
    const level = document.getElementById('level').value
    const questions = await fetchQuestions(category, level);
    console.log(document.getElementById('category').value);
    console.log(document.getElementById('level').value);

    setQuestions(questions);
    setStart(true);
  };


  return (
    <div className="app">
      <div className="main">
        <div className={`start-container ${start ? 'game-start' : ''}`}>
          <h1>Quizzicle</h1>
          <p className='label-category' >Select Category :</p>
          <select id='category' className='category' name="category">
            <option value='9'>General Knowledge</option>
            <option value='10'>Entertainment: Books</option>
            <option value='11'>Entertainment: Film</option>
            <option value='12'>Entertainment: Music</option>
            <option value='13'>Entertainment: Musicals & Theatres</option>
            <option value='14'>Entertainment: Television</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='16'>Entertainment: Board Games</option>
            <option value='17'>Science & Nature</option>
            <option value='18'>Science: Computers</option>
            <option value='19'>Science: Mathematics</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Art</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
            <option value='28'>Entertainment: Comics</option>
            <option value='29'>Science: Gadgets</option>
            <option value='30'>Entertainment: Japanese Anime & Manga</option>
            <option value='31'>Entertainment: Cartoon & Animations</option>
          </select>


          <p className='label-difficulty' >Select Difficulty :</p>
          <select id="level" className='level' name="level">
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          <button className="start-btn" onClick={getQuestions}>
            Start Quiz
          </button>
        </div>

        <div className="quiz-setup">
          <Questions questions={questions} start={start} setStart={setStart} />
        </div>
      </div>
    </div>
  );
}

export default App;