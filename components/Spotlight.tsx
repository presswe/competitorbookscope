'use client';

import { useEffect, useState } from 'react';

export default function Spotlight() {
    const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
    const [spotlightPosition, setSpotlightPosition] = useState({ x: -200, y: -200 });
    const [isFocus, setIsFocus] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;

            // Check if hovering over a BookCard for focus effect
            const isCard = !!target.closest('[class*="BookCard_card"]');
            setIsFocus(isCard);

            // Check if inside the sideColumn
            const isSidebar = !!target.closest('[class*="sideColumn"]');
            setIsHidden(isSidebar);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth follow logic using rAF-like interval for simplicity or just CSS transition
    // Actually, CSS transition: transform 0.1s is already decent,
    // but focus expansion needs to be snappy yet smooth.

    useEffect(() => {
        let frameId: number;
        const smoothFollow = () => {
            setSpotlightPosition(prev => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.15,
                y: prev.y + (mousePosition.y - prev.y) * 0.15,
            }));
            frameId = requestAnimationFrame(smoothFollow);
        };
        frameId = requestAnimationFrame(smoothFollow);
        return () => cancelAnimationFrame(frameId);
    }, [mousePosition]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isFocus ? '500px' : '350px',
                height: isFocus ? '500px' : '350px',
                borderRadius: '50%',
                background: '#F7E08E',
                transform: `translate(${spotlightPosition.x - (isFocus ? 250 : 175)}px, ${spotlightPosition.y - (isFocus ? 250 : 175)}px)`,
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen',
                opacity: isHidden ? 0 : (isFocus ? 0.8 : 0.5),
                transition: 'width 0.4s cubic-bezier(0.19, 1, 0.22, 1), height 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s ease',
            }}
        />
    );
}
