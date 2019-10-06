import React, { useEffect } from 'react';
import styled from 'styled-components';
import Student from '../api/student';

export default () => {
  useEffect(() => {
    loadQuiz();
  });

  const loadQuiz = async () => {
    const words = await Student.getHskQuiz();
    console.log({ words });
  }

  return (
    <Main>
      <div>HSK QUIZ</div>
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