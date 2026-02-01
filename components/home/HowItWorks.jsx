import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import styles from './HowItWorks.module.css';

const steps = [
    {
        title: "Install Device",
        desc: "Place the solar-powered IoT unit in your field. No wiring needed."
    },
    {
        title: "Connect App",
        desc: "Scan the QR code to pair with the SmartKisan mobile app."
    },
    {
        title: "Get Insights",
        desc: "Receive real-time alerts on soil moisture, disease, and weather."
    },
    {
        title: "Grow Better",
        desc: "Follow AI recommendations to improve yield and reduce input costs."
    }
];

export default function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works" bg="light">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2>How It Works</h2>
                <p style={{ color: 'var(--color-text-light)' }}>Get started in minutes</p>
            </div>

            <div className={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div className={styles.stepNumber}>{index + 1}</div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                        <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
