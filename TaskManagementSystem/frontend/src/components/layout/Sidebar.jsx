import { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListChecks, Folder, Sun, Moon, SignOut, CheckCircle } from '@phosphor-icons/react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useAppTheme } from '../../context/ThemeContext.jsx';

const SidebarContainer = styled.aside`
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background-color: ${(props) => props.theme?.colors?.surface || '#ffffff'};
  border-right: 1px solid ${(props) => props.theme?.colors?.border || '#dee2e6'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
`;

const TopSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid ${(props) => props.theme?.colors?.border || '#dee2e6'};
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${(props) => props.theme?.colors?.text || '#212529'};
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  svg {
    color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
  }

  span {
    color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
  }
`;

const NavSection = styled.nav`
  flex: 1;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${(props) => props.theme?.colors?.textSecondary || '#6c757d'};
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    color: ${(props) => props.theme?.colors?.text || '#212529'};
    background-color: ${(props) => props.theme?.colors?.background || '#f8f9fa'};
  }

  &.active {
    color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
    background-color: rgba(13, 110, 253, 0.12);
    font-weight: 600;

    svg {
      color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
    }
  }
`;

const BottomSection = styled.div`
  padding: 16px 14px;
  border-top: 1px solid ${(props) => props.theme?.colors?.border || '#dee2e6'};
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${(props) => props.theme?.colors?.surface || '#ffffff'};
`;

const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  border: 1px solid ${(props) => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 6px;
  background-color: ${(props) => props.theme?.colors?.background || '#f8f9fa'};
  color: ${(props) => props.theme?.colors?.text || '#212529'};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
    color: ${(props) => props.theme?.colors?.primary || '#0d6efd'};
  }
`;

const UserBadgeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme?.colors?.background || '#f8f9fa'};
  border: 1px solid ${(props) => props.theme?.colors?.border || '#dee2e6'};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  max-width: 130px;
`;

const UserName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${(props) => props.theme?.colors?.text || '#212529'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 10px;
  display: inline-block;
  background-color: ${(props) => (props.$isSuperAdmin ? '#cfe2ff' : '#e2e3e5')};
  color: ${(props) => (props.$isSuperAdmin ? '#084298' : '#41464b')};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 14px;
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 6px;
  background-color: transparent;
  color: #dc3545;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc3545;
    color: #ffffff;
    border-color: #dc3545;
  }
`;

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const theme = useAppTheme();
  const navigate = useNavigate();

  const isDarkMode = theme?.isDarkMode ?? false;
  const toggleTheme = theme?.toggleTheme;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <SidebarContainer>

      <TopSection>
        <Brand to="/">
          <CheckCircle size={28} weight="fill" />
          <div>Task<span>Flow</span></div>
        </Brand>
      </TopSection>

      <NavSection>
        <NavItem to="/" end>
          <ListChecks size={20} />
          <span>Tasks</span>
        </NavItem>

        {isSuperAdmin && (
          <NavItem to="/projects">
            <Folder size={20} />
            <span>Projects</span>
          </NavItem>
        )}
      </NavSection>

      <BottomSection>
        {toggleTheme && (
          <ThemeToggleButton type="button" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </ThemeToggleButton>
        )}

        {user && (
          <UserBadgeCard>
            <UserDetails>
              <UserName title={user.name || user.email}>
                {user.name || user.email}
              </UserName>
            </UserDetails>
            <UserRole $isSuperAdmin={isSuperAdmin}>
              {isSuperAdmin ? 'Admin' : 'User'}
            </UserRole>
          </UserBadgeCard>
        )}

        <LogoutButton type="button" onClick={handleLogout}>
          <SignOut size={18} weight="bold" />
          <span>Logout</span>
        </LogoutButton>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
