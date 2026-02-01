import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function Contact() {
    return (
        <SectionWrapper>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Contact Us</h1>
                <Card>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Your Name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                            <input type="email" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="you@company.com" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                            <textarea rows="4" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="How can we help you?" />
                        </div>
                        <Button fullWidth>Send Message</Button>
                    </form>
                </Card>
            </div>
        </SectionWrapper>
    );
}
