/* eslint-disable import/no-extraneous-dependencies */
import _ from 'underscore';
import { clearPage } from "../../utils/render";

const main = document.querySelector('main');

const HomePage = () => {
  renderGame();
};

function renderGame(level) {
  clearPage();

  fetch('http://localhost:3000/questions')
    .then(response => response.json())
    .then((questions) => {
      const randomQuestions = getRandomQuestions(questions, level);
      let qAndR = ``;
      let questionIndex = 0;
      randomQuestions.forEach(question => {
        qAndR += `<h4>${question.question}</h4>`;
        let answerIndex = 0;
        question.answers.forEach((answer) => {
          qAndR += `<p>${answer.text} <input type="radio" name="${questionIndex}" value="${answerIndex}"></p>`;
          answerIndex += 1;
        })
        questionIndex += 1;
      })
      
      qAndR += `<button id="calculateBtn">Calculate my score</button>`;

      main.innerHTML = qAndR;
      main.className = 'p-5';

      const check = document.querySelector('#calculateBtn');
      check.addEventListener('click', () => {
        const score = calculateScore(randomQuestions);
        main.innerHTML = `<h4>Your score is ${score} / 3 !</h4>
        <div><button id="playAgain">Play again</button></div>`;
        const button = document.querySelector('#playAgain');
        button.addEventListener('click', HomePage);

      });
    })
    .catch((err => {
      // eslint-disable-next-line no-console
      console.log(err);
    }))
}

function getRandomQuestions(questions, level) {
  if (level) {
    const filteredQuestions = questions.filter((question => question.level === level));
    return _.sample(filteredQuestions, 3, false);
  }
  return _.sample(questions, 3, false);
}

function calculateScore(questionsFiltered) {
  let score = 0;
  const radioButtons = document.querySelectorAll('input');

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      if (questionsFiltered[Number(radioButton.name)].answers[Number(radioButton.value)].isCorrect) {
        score += 1;
      }
    }
  });
  return score;
}

export default HomePage;
