import React from 'react';
import styles from './SectionWrapper.module.css';

export default function SectionWrapper({
    children,
    bg = 'white',
    id = '',
    className = ''
}: any) {
    return (
        <section id={id} className={`${styles.section} ${styles[bg]} ${className}`}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}
