import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Card from '@/components/common/Card';
import { Layers, Droplet, Search, BarChart3, Bot } from 'lucide-react';

const solutions = [
    {
        id: 'soil',
        title: 'Soil Health Management',
        icon: <Layers size={40} />,
        desc: 'Get precise NPK sensors data and recover soil fertility with tailored fertilizer recommendations.'
    },
    {
        id: 'irrigation',
        title: 'Smart Irrigation',
        icon: <Droplet size={40} />,
        desc: 'Monitor soil moisture at root zones and automate irrigation to save water and improve yield.'
    },
    {
        id: 'disease',
        title: 'Crop Disease Diagnosis',
        icon: <Search size={40} />,
        desc: 'Early warning system for blights and rusts using computer vision and local weather patterns.'
    },
    {
        id: 'market',
        title: 'Market Intelligence',
        icon: <BarChart3 size={40} />,
        desc: 'Forecast prices and find the best mandis to sell your produce for maximum profit.'
    },
    {
        id: 'ai',
        title: 'AI Advisory',
        icon: <Bot size={40} />,
        desc: 'Your personal agri-expert available 24/7 in Hindi, English and regional languages.'
    }
];

export default function Solutions() {
    return (
        <div className="page-content">
            <SectionWrapper bg="dark">
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Our Solutions</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
                    End-to-end technologies for every stage of the farming cycle.
                </p>
            </SectionWrapper>

            <SectionWrapper>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {solutions.map((s, i) => (
                        <Card key={i} id={s.id} hoverable>
                            <div style={{ color: 'hsl(var(--color-primary))', marginBottom: '20px' }}>{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.6' }}>{s.desc}</p>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
