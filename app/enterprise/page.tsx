import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/common/Button';

export default function Enterprise() {
    return (
        <div>
            <SectionWrapper bg="dark">
                <h1 style={{ fontSize: '3rem' }}>For Government & Enterprise</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Scale sustainable agriculture with data-driven policy and supply chain management.</p>
                <div style={{ marginTop: '30px' }}>
                    <Button variant="primary" size="lg">Talk to Sales</Button>
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div>
                        <h3>Data & Insights Portal</h3>
                        <p>Access aggregated, anonymized farm data to track regional crop health, predict yield, and manage supply chains.</p>
                    </div>
                    <div>
                        <h3>Custom Deployment</h3>
                        <p>White-label solutions for FPOs and Co-operatives with custom branding and feature sets.</p>
                    </div>
                    <div>
                        <h3>API Integrations</h3>
                        <p>Seamlessly feed our soil and weather data into your existing ERP or insurance models.</p>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
