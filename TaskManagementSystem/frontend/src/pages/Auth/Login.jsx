import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FormGroup, Label, Input, Button } from '../../components/general/FormElements.jsx';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        
        // Save token and user data to global context
        login(userData, jwtToken);
        
        // SMART ROUTING: Admins go to Projects, Users go to Tasks
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
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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