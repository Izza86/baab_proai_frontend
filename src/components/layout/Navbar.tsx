import React from 'react';
import { Menu } from 'lucide-react';
import styles from './Layout.module.css';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
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
          <div className={styles.avatar}>AI</div>
          <span>Intern Account</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
