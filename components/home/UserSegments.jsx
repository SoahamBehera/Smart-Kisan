import React from 'react';
import { User, Users, Building2, Store, Landmark, CheckCircle } from 'lucide-react';
import SectionWrapper from '@/components/common/SectionWrapper';
import styles from './UserSegments.module.css';
import Button from '@/components/common/Button';

const segments = [
    {
        title: "Small & Marginal Farmers",
        icon: <User size={32} />,
        desc: "Affordable tech to maximize every inch of land.",
        benefits: ["Low cost device", "Regional language support", "Easy Install"],
        primary: true
    },
    {
        title: "FPOs",
        icon: <Users size={32} />,
        desc: "Manage hundreds of member farms efficiently.",
        benefits: ["Group analytics", "Bulk procurement", "Market linkage"],
        primary: false
    },
    {
        title: "Government",
        icon: <Landmark size={32} />,
        desc: "Data-driven policy making and subsidization.",
        benefits: ["Regional dashboards", "Impact tracking", "Custom reports"],
        primary: false
    },
    {
        title: "Agri-Input Retailers",
        icon: <Store size={32} />,
        desc: "Recommend right products based on soil data.",
        benefits: ["Customer loyalty", "Inventory planning", "Digital catalog"],
        primary: false
    }
];

export default function UserSegments() {
    return (
        <SectionWrapper id="segments">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2>Built for the Entire Ecosystem</h2>
                <p>Connecting every stakeholder in agriculture</p>
            </div>

            <div className={styles.segmentGrid}>
                {segments.map((seg, index) => (
                    <div key={index} className={`${styles.segmentCard} ${seg.primary ? styles.primary : ''}`}>
                        {seg.primary && <span className={styles.primaryLabel}>Recommended</span>}
                        <div className={styles.icon}>{seg.icon}</div>
                        <h3 className={styles.segmentTitle}>{seg.title}</h3>
                        <p className={styles.segmentDesc}>{seg.desc}</p>
                        <ul className={styles.benefits}>
                            {seg.benefits.map((b, i) => (
                                <li key={i}><CheckCircle size={16} className={styles.check} /> {b}</li>
                            ))}
                        </ul>
                        <div style={{ marginTop: '20px' }}>
                            <Button
                                variant={seg.primary ? 'primary' : 'outline'}
                                size="sm"
                                fullWidth
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
