import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/app';
import styled from 'styled-components';

export default () => {
  const { answers, setAnswers } = useContext(AppContext);
  const [report, setReport] = useState([])

  const countScore = (answers, level, correct) => {
    const selectedAnswers = answers.filter((answer) => {
      if (answer.level === level && answer.correct === correct) {
        return answer
      }
    });
    console.log(selectedAnswers)
    return selectedAnswers.length;
  }

  const fillReport = () => {
    const computedReport = [
      { correct: countScore(answers, 1, true), incorrect: countScore(answers, 1, false) },
      { correct: countScore(answers, 2, true), incorrect: countScore(answers, 2, false) },
      { correct: countScore(answers, 3, true), incorrect: countScore(answers, 3, false) },
      { correct: countScore(answers, 4, true), incorrect: countScore(answers, 4, false) },
      { correct: countScore(answers, 5, true), incorrect: countScore(answers, 5, false) },
      { correct: countScore(answers, 6, true), incorrect: countScore(answers, 6, false) }
    ];

    console.log(computedReport)

    setReport(computedReport);
  }

  useEffect(() => {
    fillReport();
  }, [])

  return (
    <ModalWrapper>
      <Modal>
        <Congratulations>Congratulations! You are</Congratulations>
        <HSKLvl>HSK 10</HSKLvl>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>correct</th>
              <th>incorrect</th>
            </tr>
            {report.map((row, index) => {
              <tr key={`hsk${index}`}>
                <td>{`hsk${index + 1}`}</td>
                <td>{row.correct}</td>
                <td>{row.incorrect}</td>
              </tr>
            })}
          </tbody>
        </table>
      </Modal>
    </ModalWrapper>
  )
}
const ModalWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  min-width: 300px;
  min-height: 300px; 
  background-color: #f1f1f1;
  display: flex;
  border-radius: 5px;
  box-shadow: 3px 3px 8px #d1d1d1;
`;

const Congratulations = styled.h3``

const HSKLvl = styled.h1``