import React from 'react';
import { cn } from '@/shared/utils/helpers';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    clickable?: boolean;
    as?: 'div' | 'article' | 'section';
}

export function Card({
    children,
    variant = 'default',
    padding = 'md',
    clickable = false,
    as: Component = 'div',
    className,
    ...props
}: CardProps) {
    return (
        <Component
            className={cn(
                styles.card,
                styles[variant],
                styles[`padding-${padding}`],
                clickable && styles.clickable,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div className={cn(styles.header, className)} {...props}>
            {children}
        </div>
    );
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardBody({ children, className, ...props }: CardBodyProps) {
    return (
        <div className={cn(styles.body, className)} {...props}>
            {children}
        </div>
    );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardFooter({ children, className, ...props }: CardFooterProps) {
    return (
        <div className={cn(styles.footer, className)} {...props}>
            {children}
        </div>
    );
}

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    aspectRatio?: 'video' | 'square' | 'portrait';
}

export function CardImage({
    src,
    alt = '',
    aspectRatio = 'video',
    className,
    ...props
}: CardImageProps) {
    return (
        <div className={cn(styles.imageWrapper, styles[`aspect-${aspectRatio}`])}>
            <img src={src} alt={alt} className={cn(styles.image, className)} {...props} />
        </div>
    );
}
