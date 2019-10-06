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
      <div>
        <div>progess bar</div>
        <h1></h1>
      </div>
    </Main>
  )
}

const Main = styled.div`
  min-height: calc(100vh - 100px);
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll; 
`;