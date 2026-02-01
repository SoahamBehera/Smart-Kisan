import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import { Cpu, Smartphone, Wifi, Battery } from 'lucide-react';

export default function Product() {
    return (
        <div>
            <SectionWrapper bg="light">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: 'hsl(var(--color-primary))', fontWeight: 'bold', textTransform: 'uppercase' }}>Hardware</span>
                        <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>SmartKisan IoT Node</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '30px' }}>
                            Rugged, solar-powered, and easy to install. The only device you need for precision farming.
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '20px' }}>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Battery size={24} color="hsl(var(--color-primary))" /> 7-day battery life + Solar Charging
                            </li>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Wifi size={24} color="hsl(var(--color-primary))" /> GSM + LoRaWAN Connectivity
                            </li>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <Cpu size={24} color="hsl(var(--color-primary))" /> Quad-core AI Processor Edge
                            </li>
                        </ul>
                    </div>

                    <div style={{
                        height: '400px',
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #eee'
                    }}>
                        <img src="https://via.placeholder.com/400x300?text=Device+Render" alt="Device" style={{ maxWidth: '100%', borderRadius: '20px' }} />
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Future Roadmap</h2>
                    <p>We are constantly innovating. Coming soon in Phase 2:</p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
                        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px', minWidth: '200px' }}>
                            <strong>Drone Integration</strong>
                        </div>
                        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px', minWidth: '200px' }}>
                            <strong>Automated Soil Labs</strong>
                        </div>
                        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px', minWidth: '200px' }}>
                            <strong>Blockchain Traceability</strong>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
