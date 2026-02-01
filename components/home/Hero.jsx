import React from 'react';
import Button from '@/components/common/Button';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <span className={styles.badge}>#1 Agritech Solution in India</span>
                    <h1 className={styles.title}>
                        Empowering Farmers Through <span style={{ color: 'hsl(var(--color-primary))' }}>Precision Agriculture</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Maximize yields, reduce costs, and get real-time market insights with our integrated IoT device and AI-powered app.
                    </p>
                    <div className={styles.buttonGroup}>
                        <Button size="lg">Buy Now</Button>
                        <Button size="lg" variant="outline">Request Demo</Button>
                        {/* <Button size="lg" variant="secondary">Download App</Button> */}
                    </div>
                </div>

                <div className={styles.imageContent}>
                    {/* Placeholder for Hero Image - Ideally using a real image or generated asset */}
                    <div style={{
                        width: '100%',
                        height: '400px',
                        background: 'hsl(var(--color-primary)/0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        color: 'hsl(var(--color-primary))',
                        fontWeight: '600'
                    }} className={styles.heroImage}>
                        Dashboard / IoT Device Preview
                    </div>
                </div>
            </div>
        </section>
    );
}
