import React from 'react';
import styled from 'styled-components';


export default (props) => {
  const { answer, selectedAnswer, onSubmit } = props
  const correct = selectedAnswer && selectedAnswer.correct && answer.simplified === selectedAnswer.simplified;
  const incorrect = selectedAnswer && !selectedAnswer.correct && answer.simplified === selectedAnswer.simplified;
  return (
    <AnswerButton correct={correct} incorrect={incorrect} onClick={onSubmit} >
      {answer.definition}
    </AnswerButton>
  );
}

const AnswerButton = styled.button`
  border-radius: 10px;
  font-size: 20px;
  margin: 15px;
  background-color: rgb(221, 231, 251);
  border: solid 4px rgb(199, 209, 229);

  ${({ correct }) =>
    correct ? `
      color: rgb(70, 116, 37);
      background-color: rgb(218, 231, 212);
      border-color: rgb(202, 220, 189);
    ` :
      null
  }

  ${({ incorrect }) =>
    incorrect ? `
      color: rgb(183, 50, 48);
      background-color: rgb(237, 204, 203);
      border-color: rgb(212, 174, 171);
    ` :
      null
  }

  :hover {
    filter: brightness(105%);
  }
`;