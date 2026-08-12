import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { Button } from '../components/ui/Button/Button';
import { Input } from '../components/ui/Input/Input';
import { Card, CardHeader, CardBody } from '../components/ui/Card/Card';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const { error } = await signUp(email, password);

    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
      toast.error('Signup failed: ' + error.message);
      return;
    }

    toast.success('Account created! You can now log in.');
    navigate('/login');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardHeader>Sign Up</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
            {errorMsg && <p style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</p>}
            <Button type="submit" variant="primary" isLoading={isSubmitting} style={{ marginTop: '16px' }}>
              Sign Up
            </Button>
          </form>
          <p style={{ marginTop: '12px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Signup;