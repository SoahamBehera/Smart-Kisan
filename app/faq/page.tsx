import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';

const faqs = [
    { q: "How do I install the device?", a: "The device is plug-and-play. Just insert it into the soil and turn it on. It automatically connects to the nearest network." },
    { q: "Do I need monthly subscription?", a: "Yes, we offer affordable seasonal plans starting at ₹499/month." },
    { q: "Is the app available in Marathi?", a: "Yes, currently we support English, Hindi, Marathi, and Punjabi." }
];

export default function FAQ() {
    return (
        <SectionWrapper>
            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {faqs.map((f, i) => (
                    <div key={i} style={{ marginBottom: '20px', padding: '20px', borderBottom: '1px solid #eee' }}>
                        <h3 style={{ marginBottom: '10px' }}>{f.q}</h3>
                        <p style={{ color: 'var(--color-text-light)' }}>{f.a}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
