import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';


export default (props) => {
  const { answer, recordSelection, selectionMade } = props

  if (!selectionMade) {
    return (
      <AnswerButton onClick={() => recordSelection(answer)} >
        {answer.definition}
      </AnswerButton>
    )
  } else {
    if (answer.correct) {
      return (<AnswerButton className={'correct'}>{answer.definition}</AnswerButton>)
    }
    if (answer.selected && !answer.correct) {
      return (<AnswerButton className={'incorrect'} > {answer.definition}</AnswerButton >)
    }
    else {
      return (<AnswerButton>{answer.definition}</AnswerButton>)
    }
  }
}

const AnswerButton = styled.button`
  border-radius: 10px;
  font-size: 20px;
  margin: 15px;
  background-color: rgb(221, 231, 251);
  border: solid 4px rgb(199, 209, 229);

  &.correct{
    color: rgb(70, 116, 37);
    background-color: rgb(218, 231, 212);
    border-color: rgb(202, 220, 189);
  }

  &.incorrect{
    color: rgb(183, 50, 48);
    background-color: rgb(237, 204, 203);
    border-color: rgb(212, 174, 171);
  }

  :hover {
    filter: brightness(105%);
  }
`;