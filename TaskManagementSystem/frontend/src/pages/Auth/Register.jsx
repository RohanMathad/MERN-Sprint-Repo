import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axiosInstance.js';
import { FormGroup, Label, Input, Button } from '../../components/general/FormElements.jsx';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding-right: 40px;
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
    color: ${(props) => props.theme.colors.eye};
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { 
        name, 
        email, 
        password,
        project_id: 7 
      });
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <AuthContainer>
      <h2 style={{ textAlign: 'center', color: 'var(--text)', marginBottom: '20px' }}>Create Account</h2>
      {error && <p style={{ color: '#dc3545', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
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
        <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Register</Button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--textSecondary)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
      </p>
    </AuthContainer>
  );
};

export default Register;