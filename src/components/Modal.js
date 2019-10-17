import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/app';
import styled from 'styled-components';
import ReportRow from './ReportRow';

export default () => {
  const { answers } = useContext(AppContext);
  const [report, setReport] = useState([]);
  const [highestLvl, setHighestLvl] = useState(null);

  const countScore = (answers, level, correct) => {
    const selectedAnswers = answers.filter((answer) => {
      if (answer.level === level && answer.correct === correct) {
        return answer
      }
    });

    return selectedAnswers.length;
  }

  const fillReport = () => {
    const computedReport = [
      { level: 1, correct: countScore(answers, 1, true), incorrect: countScore(answers, 1, false) },
      { level: 2, correct: countScore(answers, 2, true), incorrect: countScore(answers, 2, false) },
      { level: 3, correct: countScore(answers, 3, true), incorrect: countScore(answers, 3, false) },
      { level: 4, correct: countScore(answers, 4, true), incorrect: countScore(answers, 4, false) },
      { level: 5, correct: countScore(answers, 5, true), incorrect: countScore(answers, 5, false) },
      { level: 6, correct: countScore(answers, 6, true), incorrect: countScore(answers, 6, false) }
    ];

    const highestScore = Math.max.apply(Math, computedReport.map(function (o) { return o.correct; }));
    const highest = computedReport[computedReport.findIndex((row) => row.correct === highestScore)];

    setHighestLvl(highest.level)
    setReport(computedReport);
  }

  useEffect(() => {
    fillReport();
  }, [])

  return (
    <ModalWrapper>
      <Modal>
        <Congratulations>Congratulations! You are</Congratulations>
        <HSKLvl>HSK {highestLvl}</HSKLvl>
        <Table>
          <tbody>
            <tr>
              <th></th>
              <th>correct</th>
              <th>incorrect</th>
            </tr>
            {report.map((row, index) => <ReportRow key={`hsk${index}`} row={row} />)}
          </tbody>
        </Table>
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
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 3px 3px 8px #d1d1d1;
  align-items: center;
  justify-content: center;
`;

const Congratulations = styled.h3`
  display: block;
`

const HSKLvl = styled.h2`
  display: block;
`

const Table = styled.table`
  width: 90%;

  td {
    text-align: center;
  }
`