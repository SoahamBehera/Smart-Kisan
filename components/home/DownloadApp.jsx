import React from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import styles from './DownloadApp.module.css';
import { Smartphone } from 'lucide-react';

export default function DownloadApp() {
    return (
        <SectionWrapper id="download" className={styles.downloadSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>Start Your Smart Farming Journey Today</h2>
                <p className={styles.desc}>
                    Download the SmartKisan app to access real-time insights, marketplace, and expert advice.
                </p>

                <div className={styles.badgeContainer}>
                    <div className={styles.storeBadge}>
                        <Smartphone size={24} />
                        <div className={styles.storeText}>
                            <small>GET IT ON</small>
                            <strong>Google Play</strong>
                        </div>
                    </div>
                    {/* Apple Store optional for Indian rural context, but good for completeness */}
                    {/* <div className={styles.storeBadge}> ... </div> */}
                </div>
            </div>
        </SectionWrapper>
    );
}
