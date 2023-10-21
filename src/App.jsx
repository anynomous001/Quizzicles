
import './App.css'
import React from 'react'
import Questions from './Questions'
/*import { answersContext } from './Questions'*/

function App() {
  /*const { answersHtml } = React.useContext(answersContext)*/
  const [start, setStart] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  function click() {
    fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)
      })
      .catch(error => console.log(error))

    setStart((prevStart) => !prevStart);
  }


  return (
    <div className='app'>
      <div className={`main`}>
        <div className={`start-container ${start ? 'game-start' : ''}`} >
          <h1>Quizzicle</h1>
          <h4>Some description if needed</h4>
          <button className='start-btn' onClick={click}>Start Quiz</button>
        </div>
        <div className='quiz-setup'>
          <Questions questions={questions} start={start} />
        </div>


      </div>

    </div>
  )
}

export default App
/*(5) [{…}, {…}, {…}, {…}, {…}]
    0: category: "Sports"
    correct_answer: "American Football"
    difficulty: "medium"
    incorrect_answers: (3) ['Wrestling', 'Archery', 'Horse-Racing']
    question: "Which sport is NOT traditionally played during the Mongolian Naadam festival?"
    type: "multiple"
    [[Prototype]]: Object
    1: {category: 'Sports', type: 'multiple', difficulty: 'medium', question: 'How many French Open&#039;s did Bj&ouml;rn Borg win?', correct_answer: '6', …}
    2: {category: 'Sports', type: 'multiple', difficulty: 'medium', question: 'How many premier league trophies did Sir Alex Ferguson win during his time at Manchester United?', correct_answer: '13', …}
    3: {category: 'Sports', type: 'multiple', difficulty: 'medium', question: 'What is the name of the AHL affiliate of the Toronto Maple Leafs?', correct_answer: 'Toronto Marlies', …}
    4: {category: 'Sports', type: 'multiple', difficulty: 'medium', question: 'Which of these countries&#039; national teams qualified for the 2018 FIFA World Cup in Russia?', correct_answer: 'Tunisia', …}
    length: 5[[Prototype]]: Array(0) */