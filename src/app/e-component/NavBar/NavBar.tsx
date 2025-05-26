import React from 'react'
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <div className={styles['navbar']}>
      <span>Logo</span>
      <span>Contact</span>
    </div>
  )
}

export default NavBar;
