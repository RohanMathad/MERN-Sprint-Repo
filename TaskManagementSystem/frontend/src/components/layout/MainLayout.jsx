import styled from 'styled-components';
import Sidebar from './Sidebar.jsx';

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${(props) => props.theme?.colors?.background || '#f8f9fa'};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme?.colors?.background || '#f8f9fa'};
  overflow: hidden;
  height: 100vh;
`;

const ContentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 0;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainContent>
        <ContentContainer>{children}</ContentContainer>
      </MainContent>
    </LayoutWrapper>
  );
};

export default MainLayout;
