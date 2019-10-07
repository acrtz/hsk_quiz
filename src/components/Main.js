import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../context/app';
import Student from '../api/student';
import AnswerButton from './AnswerButton';

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
  const [error, setError] = useState(null);

  const getNextWord = (words, answers, level) => {
    const currentLevelWords = words.filter(word => word.level === level);
    const answerDefinitions = answers.map(answer => answer.simplified)

    const possibleWords = currentLevelWords.filter(word => !answerDefinitions.includes(word.simplified));

    return possibleWords[Math.floor(Math.random() * possibleWords.length)];
  }

  const loadQuiz = async () => {
    const words = await Student.getHskQuiz();
    return { words }
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
    const answers = [newWord];

    while (answers.length < 4) {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      if (!isSynonym(newWord, randomWord)) {
        answers.push(randomWord);
      }
    }
    return shuffle(answers);
  }

  useEffect(() => {
    const getWords = async () => {
      const { words: { quiz } } = await loadQuiz().catch(err => console.log(err.message));
      const newWord = getNextWord(quiz, [], 1);
      const wordsWithoutNewWord = quiz.filter(word => word.definition !== newWord.definition)
      setCurrentWord(newWord);
      setWords(wordsWithoutNewWord);
      setPossibleAnswers(createAnswers(newWord, wordsWithoutNewWord));
    }
    getWords();
  }, []);

  return (
    <Main>
      <Progress completion={answers.length}></Progress>
      <Word>{currentWord.simplified}</Word>
      <Answers>
        {possibleAnswers.map(answer => <AnswerButton definition={answer.definition} />)}
      </Answers>
    </Main>
  )
}

// const Main = styled.div`
//   min-height: calc(100vh - 100px);
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   padding-top: 40px;
//   box-sizing: border-box;
//   overflow: hidden;
//   overflow-y: scroll; 
// `;

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