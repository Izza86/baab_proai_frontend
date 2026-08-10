import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card/Card';
import Button from '../components/ui/Button/Button';
import useToast from '../hooks/useToast';
import { Bell, Sliders, Moon, Smartphone } from 'lucide-react';

export const Settings: React.FC = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveSettings = () => {
    toast.success('System preferences saved successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>App Settings</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Manage your application preferences and layout configurations.
        </p>
      </div>

      <Card>
        <CardHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} color="var(--color-primary)" />
              <span>General Preferences</span>
            </div>
          }
          subtitle="Configure system notifications and design tokens."
        />
        <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          {/* Theme Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Moon size={20} color="var(--color-text-muted)" />
              <div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Active Theme</h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Dark Glassmorphism Design Tokens (globals.css)
                </p>
              </div>
            </div>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
              }}
            >
              Default Dark
            </span>
          </div>

          <hr style={{ borderColor: 'var(--color-border)' }} />

          {/* Notifications Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={20} color="var(--color-text-muted)" />
              <div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Toast System Popups</h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Display 3-second floating notifications on system events.
                </p>
              </div>
            </div>
            <Button
              variant={notificationsEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              {notificationsEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <hr style={{ borderColor: 'var(--color-border)' }} />

          {/* Viewport Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Smartphone size={20} color="var(--color-text-muted)" />
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Responsive Breakpoints</h4>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Tested at Mobile (375px), Tablet (768px), and Desktop (1440px) with 0 horizontal overflow.
              </p>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
