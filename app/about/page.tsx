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
                <p style={{ color: 'var(--color-text-light)', marginBottom: '40px' }}>
                    A group of Computer Science and IoT students passionate about transforming Indian agriculture.
                </p>

                {/* Team grid */}
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    {[
                        { name: 'Soaham Behera', role: 'Founder & CEO', initials: 'SB' },
                        { name: 'Sneha Mandal', role: 'Co-Founder & COO', initials: 'SM' },
                        { name: 'Prajukta Saha', role: 'Co-Founder & CMO', initials: 'PS' },
                    ].map((member) => (
                        <div
                            key={member.name}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                gap: '14px', flex: '0 0 auto', width: '160px',
                                background: 'white', borderRadius: '16px',
                                padding: '28px 20px', textAlign: 'center',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                            }}
                        >
                            {/* Avatar circle with initials */}
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.4rem', fontWeight: 700, color: 'white',
                                letterSpacing: '1px',
                            }}>
                                {member.initials}
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#1b5e20' }}>
                                    {member.name}
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#777' }}>
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
