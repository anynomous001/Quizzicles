import React from 'react';
import './App.css';
import Questions from './Questions';

async function fetchQuestions() {
  const res = await fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple');
  const data = await res.json();
  return data.results;
}

function App() {

  const [questions, setQuestions] = React.useState([]);
  const [start, setStart] = React.useState(false);

  const getQuestions = async () => {
    const questions = await fetchQuestions();
    setQuestions(questions);
    setStart(true);
  };

  return (
    <div className="app">
      <div className="main">
        <div className={`start-container ${start ? 'game-start' : ''}`}>
          <h1>Quizzicle</h1>
          <button className="start-btn" onClick={getQuestions}>
            Start Quiz
          </button>
        </div>

        <div className="quiz-setup">
          <Questions questions={questions} start={start} />
        </div>
      </div>
    </div>
  );
}

export default App;