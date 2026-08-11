import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card/Card';
import Button from '../components/ui/Button/Button';
import Modal from '../components/ui/Modal/Modal';
import useToast from '../hooks/useToast';
import { Activity, ShieldCheck, Users, Zap, Layers } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const handleSimulateAction = () => {
    setIsLoadingDemo(true);
    setTimeout(() => {
      setIsLoadingDemo(false);
      toast.success('Dashboard metrics re-synchronized!');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>Analytics & Overview</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Welcome to the Smart Zone Leaders Baab ProAI Portal.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <Button variant="outline" size="md" onClick={() => setIsModalOpen(true)}>
            Open System Modal
          </Button>
          <Button variant="primary" size="md" isLoading={isLoadingDemo} onClick={handleSimulateAction}>
            Refresh Sync
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--spacing-6)',
        }}
      >
        <Card>
          <CardBody style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={24} />
            </div>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>System Status</span>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>99.98%</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Validation Engine</span>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>Active</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--color-warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={24} />
            </div>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Active Users</span>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>1,420</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(147, 51, 234, 0.15)',
                color: '#c084fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Activity size={24} />
            </div>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Components</span>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>5 Primitives</h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Card Demo Section */}
      <Card>
        <CardHeader
          title="Custom Component Design System"
          subtitle="All components built strictly using pure CSS tokens and vanilla React + TypeScript."
        />
        <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            This application enforces zero reliance on external CSS utility frameworks like Tailwind. It showcases modular component primitives: Button, Card, Input, Modal, and Toast Context.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <Button variant="primary" onClick={() => toast.success('Success notification triggered!')}>
              Test Success Toast
            </Button>
            <Button variant="destructive" onClick={() => toast.error('Error notification triggered!')}>
              Test Error Toast
            </Button>
            <Button variant="secondary" onClick={() => toast.info('System notification triggered!')}>
              Test Info Toast
            </Button>
          </div>
        </CardBody>
       
      </Card>

      {/* Modal Primitive Demo */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System Diagnostics Modal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
            <Layers size={24} />
            <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Modal Primitive Working</h4>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            This modal demonstrates backdrop blurring, focus trapping, Escape key event listening, and smooth CSS entry animations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Close Modal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                toast.success('Modal action acknowledged!');
              }}
            >
              Confirm Action
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
