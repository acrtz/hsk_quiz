import React from 'react';

export default (props) => {
  const { row } = props;

  return (
    <tr>
      <td>{`HSK ${row.level}`}</td>
      <td>{row.correct}</td>
      <td>{row.incorrect}</td>
    </tr>)
}