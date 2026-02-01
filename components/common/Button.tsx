import React from 'react';
import styles from './Button.module.css';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
