import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../context/app';
import Student from '../api/student';

export default () => {
  const { answers, setAnswers, words, setWords } = useContext(AppContext);
  const { currentWord, setCurrentWord } = useState(null);

  useEffect(() => {
    const getWords = async () => {
      const { words: { quiz } } = await loadQuiz();
      setWords(quiz);
      getNextWord([], 1)
    }
    getWords();
  }, []);

  const getNextWord = (answers, level) => {
    let answer;
    console.log(answers);
    console.log(level);
    return answer;
  }

  const loadQuiz = async () => {
    const words = await Student.getHskQuiz();
    // console.log({ words });
    return { words }
  }

  return (
    <Main>
      <Progress max={30} value={10}></Progress>
      <Word>星期</Word>
      <Answers>
        <AnswerButton>week; CL:個|个[ge4]</AnswerButton>
        <AnswerButton>time; length of time; moment; period</AnswerButton>
        <AnswerButton>time; length of time; moment; period</AnswerButton>
        <AnswerButton>computer; CL:臺|台[tai2]</AnswerButton>
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

const Progress = styled.progress`
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

const AnswerButton = styled.button`
  border-radius: 10px;
  font-size: 20px;
  margin: 15px;
  background-color: rgb(221, 231, 251);
  border: solid 4px rgb(199, 209, 229);
`;