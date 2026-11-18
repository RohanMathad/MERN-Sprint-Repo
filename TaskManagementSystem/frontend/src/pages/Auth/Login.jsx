import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FormGroup, Label, Input, Button } from '../../components/general/FormElements.jsx';
import { Eye, EyeSlash } from '@phosphor-icons/react'; // 1. Import the icons

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 20px;
`;

const ErrorMsg = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  text-align: center;
`;

// 2. Wrapper to position the eye icon inside the input field
const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding-right: 40px; /* Leave space for the icon */
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 3. State for visibility toggle
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const userData = response.data.data;
        const jwtToken = response.data.token;
        
        login(userData, jwtToken);
        
        if (userData.role === 'super_admin') {
          navigate('/projects');
        } else {
          navigate('/'); 
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <AuthContainer>
      <Title>Sign In to Workspace</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <form onSubmit={handleLogin}>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <PasswordWrapper>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <EyeButton type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </EyeButton>
          </PasswordWrapper>
        </FormGroup>
        <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</Button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--textSecondary)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
      </p>
    </AuthContainer>
  );
};

export default Login;