'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COMPETITORS } from '@/lib/constants';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPublisher = searchParams.get('publisher');

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleSelect = (publisher: string) => {
        const params = new URLSearchParams(searchParams);
        if (publisher === currentPublisher) {
            params.delete('publisher'); // Toggle off
        } else {
            params.set('publisher', publisher);
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.content}>
                {/* Branding */}
                <div className={styles.branding}>
                    <h1 className={styles.title}>
                        Book<br />Scope
                    </h1>
                </div>

                {/* Navigation */}
                <div className={styles.nav}>
                    {COMPETITORS.map((pub) => (
                        <button
                            key={pub}
                            className={`${styles.navItem} ${currentPublisher === pub ? styles.active : ''}`}
                            onClick={() => handleSelect(pub)}
                        >
                            {pub}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                className={styles.toggleBtn}
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isOpen ? '×' : '+'}
            </button>
        </nav>
    );
}
