import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Settings as SettingsIcon, LogIn, X } from 'lucide-react';
import styles from './Layout.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
    { label: 'Login', path: '/login', icon: LogIn },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className={styles.mobileDrawerOverlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandContainer}>
            <div className={styles.brandLogo}>B</div>
            <span className={styles.brandName}>Baab ProAI</span>
          </div>
          <button
            className={styles.menuToggleBtn}
            onClick={onClose}
            style={{ marginLeft: 'auto' }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            Day 1 Trial • Frontend System
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
