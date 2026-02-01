import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, className = '', hoverable = false, ...props }: any) {
    return (
        <div
            className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
