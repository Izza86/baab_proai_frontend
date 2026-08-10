import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card/Card';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import useToast from '../hooks/useToast';
import { LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('intern@smartzoneleaders.com');
  const [password, setPassword] = useState('Password123!');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4)',
      }}
    >
      <Card style={{ width: '100%', maxWidth: '420px' }}>
        <CardHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <LogIn size={22} color="var(--color-primary)" />
              <span>Smart Zone Leaders Portal</span>
            </div>
          }
          subtitle="Sign in to access your Day 1 trial workspace."
          style={{ textAlign: 'center' }}
        />
        <form onSubmit={handleLogin}>
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Input
              label="Work Email"
              type="email"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </CardBody>

          <CardFooter style={{ flexDirection: 'column', gap: '0.75rem' }}>
            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} style={{ width: '100%' }}>
              Sign In to Dashboard
            </Button>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Demo Account Credentials Pre-filled
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
