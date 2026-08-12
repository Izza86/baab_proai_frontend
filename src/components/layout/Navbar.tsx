import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import styles from './Layout.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : 'AI';

  return (
    <header className={styles.navbar}>
      <div className={styles.brandContainer}>
        <button
          className={styles.menuToggleBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className={styles.brandLogo}>B</div>
        <span className={styles.brandName}>Baab ProAI</span>
      </div>

      <div className={styles.navRight}>
        <div className={styles.userBadge}>
          <div className={styles.avatar}>{initials}</div>
          <span>{user?.email ?? 'Guest'}</span>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-muted, #666)',
              padding: '6px 10px',
              borderRadius: '6px',
            }}
          >
            <LogOut size={18} />
            <span style={{ fontSize: '14px' }}>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
