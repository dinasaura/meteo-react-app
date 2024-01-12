import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../file/logo.png'; 

const Navbar = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/search" className={styles.navLink}>Ricerca</Link>
        </li>
        <li>
          <Link to="/favorites" className={styles.navLink}>Preferiti</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
