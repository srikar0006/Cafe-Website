import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    imagePath: string;
    height?: string;
    children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imagePath, height = '60vh', children }) => {
    return (
        <header className="page-hero" style={{ backgroundImage: `url('${imagePath}')`, height }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <span className="section-subtitle fade-up">{subtitle}</span>
                <h1 className="fade-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>{title}</h1>
                {children}
            </div>
        </header>
    );
};
