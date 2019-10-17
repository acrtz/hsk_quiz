import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../context/app';
import Student from '../api/student';
import AnswerButton from './AnswerButton';
import { create } from 'handlebars';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr;
}

export default () => {
  const { answers, setAnswers, words, setWords } = useContext(AppContext);
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const getNextWord = ({ words, answers, level }) => {
    const currentLevelWords = words.filter(word => word.level === level);
    const answerDefinitions = answers.map(answer => answer.simplified)

    const possibleWords = currentLevelWords.filter(word => !answerDefinitions.includes(word.simplified));

    return possibleWords[Math.floor(Math.random() * possibleWords.length)];
  }

  const loadQuiz = async () => {
    const { quiz: words } = await Student.getHskQuiz();
    setNextQuestion({ words })
  }

  const isSynonym = (targetWord, possibleSynonym) => {
    const targetDefinitions = targetWord.definition.split(";").map(word => word.trim());
    const synonymDefinitions = possibleSynonym.definition.split(";").map(word => word.trim());

    for (let targetDef of targetDefinitions) {
      if (synonymDefinitions.includes(targetDef)) {
        return true;
      }
    }

    return false;
  }

  const createAnswers = (newWord, words) => {
    // three random answers that are not synonym with the correct word
    const answers = [{ ...newWord, correct: true, selected: false }];

    while (answers.length < 4) {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      if (!isSynonym(newWord, randomWord) && !answers.find(answer => answer.simplified === randomWord.simplified)) {
        answers.push({ ...randomWord, correct: false, selected: false });
      }
    }
    return shuffle(answers);
  }

  const determineNextLevel = (answers) => {
    let level = currentLevel;

    if (answers.length <= 1) {
      return level;
    }

    const sameLevelTwoInARowCorrect = answers[answers.length - 1]['correct'] &&
      answers[answers.length - 2]['correct'] &&
      answers[answers.length - 1].level === answers[answers.length - 2].level;

    if (sameLevelTwoInARowCorrect) {
      if (level !== 6) {
        level++;
      }
      return level;
    }

    if (level !== 1 && !answers[answers.length - 1]['correct']) {
      level--;
    }
    return level;
  }

  useEffect(() => {
    loadQuiz();
  }, []);

  const setNextQuestion = ({ words, answer }) => {
    const answersArray = [...answers];

    //skipped for the initial setup
    if (answer)
      answersArray.push(answer);

    const newLevel = determineNextLevel(answersArray)
    const newWord = getNextWord({ words, answers: answersArray, level: newLevel })
    const wordsWithoutNewWord = words.filter(word => word.definition !== newWord.definition)

    setAnswers(answersArray)
    setCurrentWord(newWord);
    setWords(wordsWithoutNewWord);
    setCurrentLevel(newLevel);
    setPossibleAnswers(createAnswers(newWord, wordsWithoutNewWord));
  }

  const onSubmit = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setNextQuestion({ words, answer })
    }, answers.correct ? 2000 : 3000);
  }

  return (
    <Main>
      <Progress completion={answers.length}></Progress>
      <Word>{currentWord.simplified}</Word>
      <Answers>
        {possibleAnswers.map(answer => <AnswerButton onSubmit={() => onSubmit(answer)} key={answer.definition} answer={answer} selectedAnswer={selectedAnswer} />)}
      </Answers>
    </Main>
  )
}

const Main = styled.div`
  margin: 20px;
  display: grid;
  grid-template: 100px 180px 300px / 40px 40px 80px auto 80px 40px 40px;
  grid-template-areas: 
  "p p p p p p p"
  ". . . w . . ."
  ". a a a a a .";
`;

const Progress = styled.progress.attrs(props => ({
  max: "30",
  value: props.completion
}))`
  grid-area: p;
  justify-self: center;
  align-self: center;
  width: 100%;
`;

const Word = styled.h1`
  grid-area: w;
  justify-self: center;
  align-self: baseline;
  font-size: 40px;
`;

const Answers = styled.div`
  grid-area: a;
  align-items: auto;
  display: flex;
  justify-content: center;
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
`

const SelectionStatusBox = styled.div`
  color: ${props => props.status === 'incorrect' ? "red" : "green"};
  text-transform: capitalized;
`