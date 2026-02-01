import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        quote: "My yield increased by 30% in just one season after using SmartKisan's soil monitoring data.",
        author: "Ramesh Kumar",
        role: "Wheat Farmer, Punjab"
    },
    {
        quote: "The disease detection feature saved my tomato crop from early blight. Highly recommended!",
        author: "Sunita Devi",
        role: "Vegetable Grower, Maharashtra"
    },
    {
        quote: "SmartKisan helps our FPO members get better prices by tracking mandi rates in real-time.",
        author: "Rajesh Singh",
        role: "FPO Director, UP"
    }
];

export default function Testimonials() {
    return (
        <SectionWrapper id="testimonials" bg="light">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2>Trusted by Farmers Across India</h2>
            </div>

            <div className={styles.testimonialGrid}>
                {testimonials.map((t, i) => (
                    <div key={i} className={styles.quoteCard}>
                        <p>"{t.quote}"</p>
                        <div className={styles.author}>{t.author}</div>
                        <div className={styles.role}>{t.role}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Our Partners</p>
                <div className={styles.partnersContainer}>
                    {/* Placeholders for logos */}
                    <span className={styles.partnerLogo}>eNAM</span>
                    <span className={styles.partnerLogo}>ICAR</span>
                    <span className={styles.partnerLogo}>NABARD</span>
                    <span className={styles.partnerLogo}>Digital India</span>
                </div>
            </div>
        </SectionWrapper>
    );
}
