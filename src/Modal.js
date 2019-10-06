import React, { useContext } from 'react';
import AppContext from './context/app';
import styled from 'styled-components';

export default () => {
  const { modal, setModal } = useContext(AppContext);
  
  if (!modal.type)
    return null;

  return (
    <ModalWrapper>
      <Modal>
        <div>Modal Content</div>
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