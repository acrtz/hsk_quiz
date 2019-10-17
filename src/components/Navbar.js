import React, { useContext } from 'react';
import AppContext from '../context/app';
import styled from 'styled-components';

export default () => {

  const { student } = useContext(AppContext);

  return (
    <Navbar>
      <Logo>LOGO</Logo>
      <Account>
        <Username src='/'>{student.username}</Username>
        <Points>HSK: {student.hsk}</Points>
      </Account>
    </Navbar>
  )
}

const Navbar = styled.div`
  display: flex;
  height: 100px; 
  width: 100vw;
  background-color: #f1f1f1;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px;
  box-sizing: border-box;
`;
const Logo = styled.div`
`;
const Account = styled.div`
  display: flex;
`;
const Username = styled.div`
  padding: 0px 20px;
`;
const Points = styled.div`
  padding: 0px 20px;
`;
