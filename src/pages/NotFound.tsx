import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card/Card';
import Button from '../components/ui/Button/Button';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4)',
      }}
    >
      <Card style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        <CardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            padding: 'var(--spacing-8)',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={36} />
          </div>

          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>404</h1>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Page Not Found</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            The page route you requested does not exist or has been moved.
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/dashboard')}
            style={{ marginTop: 'var(--spacing-2)' }}
          >
            <Home size={16} />
            Return to Dashboard
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFound;
