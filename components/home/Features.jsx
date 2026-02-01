import React from 'react';
import { Leaf, Droplets, Camera, TrendingUp, MessageSquare, BatteryCharging } from 'lucide-react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Card from '@/components/common/Card';
import styles from './Features.module.css';

const features = [
    {
        icon: <Leaf size={24} />,
        title: "Soil Monitoring",
        description: "Real-time tracking of soil moisture and NPK levels to optimize fertilization."
    },
    {
        icon: <Camera size={24} />,
        title: "Disease Detection",
        description: "Instant diagnosis of crop diseases using AI. Just take a photo."
    },
    {
        icon: <TrendingUp size={24} />,
        title: "Mandi Prices",
        description: "Compare prices across different mandis to sell at the right time."
    },
    {
        icon: <MessageSquare size={24} />,
        title: "AI Assistant",
        description: "Get farming advice in your local language 24/7."
    },
    {
        icon: <BatteryCharging size={24} />,
        title: "Offline & Solar",
        description: "Designed for remote areas with offline mode and solar charging."
    },
    {
        icon: <Droplets size={24} />,
        title: "Smart Irrigation",
        description: "Water your crops precisely based on weather and soil data."
    }
];

export default function Features() {
    return (
        <SectionWrapper id="features">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Everything You Need to Grow</h2>
                <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                    Our comprehensive suite of tools helps you manage every aspect of your farm.
                </p>
            </div>

            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <Card key={index} hoverable>
                        <div className={styles.iconWrapper}>{feature.icon}</div>
                        <h3 className={styles.title}>{feature.title}</h3>
                        <p className={styles.description}>{feature.description}</p>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
}
