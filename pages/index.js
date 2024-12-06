import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>Tocloc</h1>
        <nav className={styles.navbar}>
          <Link href="/places">
            <a className={styles.navLink}>Locais</a>
          </Link>
          <Link href="/auth/login">
            <a className={styles.navLink}>Login</a>
          </Link>
          <Link href="/auth/register">
            <a className={styles.navLink}>Registrar</a>
          </Link>
        </nav>
      </header>

      {/* Slideshow */}
      <main className={styles.mainContent}>
        <div className={styles.slideshow}>
          <div className={styles.slide}>"Pratique esportes em espaços incríveis!"</div>
          <div className={styles.slide}>"Tocloc: reservando locais esportivos de forma fácil e rápida."</div>
          <div className={styles.slide}>"Espaços disponíveis para todos os tipos de esportes."</div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
