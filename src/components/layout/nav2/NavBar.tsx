'use client';
import React, { useState } from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const [aboutHover, setAboutHover] = useState(false);

  return (
    <header className="flex items-center justify-center border-b border-solid border-b-[#ededed] px-10 py-8 bg-neutral-50">
      <nav
        className={styles.navContainer}
        onMouseEnter={() => setAboutHover(true)}
        onMouseLeave={() => setAboutHover(false)}
      >
        <a className={styles.navItem} href="#">Home</a>
        <a className={styles.navItem} href="#">Lab</a>
        <a
          className={`${styles.navItem} ${styles.animatedItem}`}
          data-visible={aboutHover}
          href="#"
        >Now</a>
        <a
          className={styles.navItem}
          href="#"
        >About</a>
        <a
          className={`${styles.navItem} ${styles.animatedItem}`}
          data-visible={aboutHover}
          href="#"
        >Gallery</a>
      </nav>
    </header>
  );
};

export default NavBar;