import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';

export default function About() {
    return (
        <SectionWrapper>
            <h1>About SmartKisan</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', maxWidth: '800px' }}>
                Founded in 2026, SmartKisan is on a mission to democratize precision agriculture for the 100 million+ smallholder farmers in India. We believe technology should be accessible, affordable, and actionable.
            </p>

            <div style={{ marginTop: '60px' }}>
                <h2>Our Mission</h2>
                <p>To double farmer income by 2035 through intelligent resource management.</p>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2>Founding Team</h2>
                <p>A group of Computer Science and IOT students.</p>
            </div>
        </SectionWrapper>
    );
}
