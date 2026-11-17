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
  
  /* 1. Broaden the modal: Increased from 450px to 600px */
  max-width: 600px; 
  
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  
  max-height: 90vh; 
  overflow-y: auto; 

  /* 2. Custom Scrollbar Styling to match your dark theme */
  &::-webkit-scrollbar {
    width: 8px; /* Slimmer scrollbar */
  }
  
  &::-webkit-scrollbar-track {
    background: transparent; /* Removes the ugly white background */
    margin: 4px 0; /* Keeps it slightly away from the rounded corners */
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border}; /* Matches your UI lines */
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.textSecondary}; /* Highlights on hover */
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      {/* stopPropagation prevents clicks inside the box from closing the modal */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;