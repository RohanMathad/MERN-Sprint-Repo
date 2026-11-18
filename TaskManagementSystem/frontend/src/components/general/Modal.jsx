import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  
  max-width: 600px; 
  
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  
  max-height: 90vh; 
  overflow-y: auto; 

  &::-webkit-scrollbar {
    width: 8px; 
  }
  
  &::-webkit-scrollbar-track {
    background: transparent; 
    margin: 4px 0;    
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border}; 
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.textSecondary}; 
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>

      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
      
    </ModalOverlay>
  );
};

export default Modal;