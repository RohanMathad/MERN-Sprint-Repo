import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { useAppTheme } from '../../context/ThemeContext.jsx';

// --- STYLED COMPONENTS ---
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: ${(props) => props.theme.colors.surface};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MainArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
`;

const Header = styled.header`
  height: 60px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: #ffffff;
  }
`;

const ThemeButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.h2`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 30px;
`;

// --- COMPONENT ---
const Layout = () => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <LayoutContainer>
      {/* SIDEBAR */}
      <Sidebar>
        <Logo>TaskApp</Logo>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </div>
      </Sidebar>
      
      {/* MAIN CONTENT AREA */}
      <MainArea>
        {/* HEADER */}
        <Header>
          <div style={{ fontWeight: 'bold' }}>Welcome, User</div>
          <ThemeButton onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </ThemeButton>
        </Header>
        
        {/* DYNAMIC PAGE CONTENT GOES HERE */}
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainArea>
    </LayoutContainer>
  );
};

export default Layout;