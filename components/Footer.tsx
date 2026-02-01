import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.brandColumn}>
                    <h3>SmartKisan</h3>
                    <p className={styles.brandText}>
                        Empowering Indian farmers with data-driven insights for precision farming and sustainable growth.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4>Solutions</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/solutions#soil">Soil Health</Link></li>
                        <li><Link href="/solutions#irrigation">Smart Irrigation</Link></li>
                        <li><Link href="/solutions#disease">Disease Detection</Link></li>
                        <li><Link href="/solutions#market">Market Intelligence</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Company</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/partners">Partners</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Resources</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/help">Help Center</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>© 2026 SmartKisan Technologies. All rights reserved.</p>
                <div>
                    {/* Language Selector Placeholder */}
                    <span>English (IN) ▾</span>
                </div>
            </div>
        </footer>
    );
}
