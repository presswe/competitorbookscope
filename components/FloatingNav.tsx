'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COMPETITORS } from '@/lib/constants';
import styles from './FloatingNav.module.css';

export default function FloatingNav() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPublisher = searchParams.get('publisher');

    const handleSelect = (publisher: string) => {
        const params = new URLSearchParams(searchParams);
        if (publisher === currentPublisher) {
            params.delete('publisher'); // Toggle off
        } else {
            params.set('publisher', publisher);
        }
        router.replace(`?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
            {/* Individual Floating Buttons Stack */}
            <div className={styles.list}>
                {/* Buttons are rendered in reverse order in CSS (column-reverse) or we map them here.
            CSS column-reverse makes the first item in DOM appear at the bottom.
            If we want them to "fan out" upwards, the bottom-most button (closest to toggle) should be first in DOM for focus/logic?
            Let's keep standard DOM order and handle visual order in CSS.
        */}
                <button
                    className={`${styles.item} ${!currentPublisher ? styles.active : ''}`}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete('publisher');
                        router.replace(`?${params.toString()}`);
                        setIsOpen(false);
                    }}
                >
                    All Books
                </button>
                {COMPETITORS.map((pub) => (
                    <button
                        key={pub}
                        className={`${styles.item} ${currentPublisher === pub ? styles.active : ''}`}
                        onClick={() => handleSelect(pub)}
                    >
                        {pub}
                    </button>
                ))}
            </div>

            {/* Floating Toggle Button */}
            <button
                className={`${styles.toggleBtn} ${isOpen ? styles.activeBtn : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {/* Use explicit text or icon */}
                <span style={{ fontSize: '32px', lineHeight: 1 }}>{isOpen ? '×' : '+'}</span>
            </button>
        </div>
    );
}
