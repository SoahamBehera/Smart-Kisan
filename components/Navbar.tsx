import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                🌱 SmartKisan
            </Link>

            <div className={styles.navLinks}>
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href="/solutions" className={styles.navLink}>Solutions</Link>
                <Link href="/product" className={styles.navLink}>Product</Link>
                <Link href="/enterprise" className={styles.navLink}>Enterprise</Link>
                <Link href="/about" className={styles.navLink}>About Us</Link>
            </div>

            <button className={styles.ctaButton}>Download App</button>
        </nav>
    );
}
