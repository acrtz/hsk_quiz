import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../context/app';


export default (props) => {
  const { definition } = props;

  return (<AnswerButton>{definition}</AnswerButton>)
}

const AnswerButton = styled.button`
  border-radius: 10px;
  font-size: 20px;
  margin: 15px;
  background-color: rgb(221, 231, 251);
  border: solid 4px rgb(199, 209, 229);

  :hover {
    filter: brightness(105%);
  }
`;