import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function DataPortal() {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
            <Card hoverable style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Enterprise Login</h2>
                <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Access aggregated farm data</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="email" placeholder="Corporate Email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <Button fullWidth>Login</Button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
                    Don't have access? <a href="/enterprise" style={{ color: 'var(--color-primary)' }}>Contact Sales</a>
                </p>
            </Card>
        </div>
    );
}
