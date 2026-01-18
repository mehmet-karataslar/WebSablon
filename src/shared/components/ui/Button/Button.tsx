import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/helpers';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            leftIcon,
            rightIcon,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    styles.button,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    loading && styles.loading,
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <span className={styles.spinner}>
                        <svg viewBox="0 0 24 24" fill="none" className={styles.spinnerIcon}>
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="31.4 31.4"
                            />
                        </svg>
                    </span>
                )}
                {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                <span className={styles.content}>{children}</span>
                {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
