'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { COMPETITORS } from '@/lib/constants';
import styles from './SideNav.module.css';

export default function SideNav() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPublisher = searchParams.get('publisher');
    const [searchTerm, setSearchTerm] = require('react').useState(searchParams.get('q') || '');
    const [isOpen, setIsOpen] = require('react').useState(false);

    // Reset scroll position whenever URL parameters change
    useEffect(() => {
        // Reset vertical scroll
        const contentColumn = document.querySelector('[data-scroll-container]');
        if (contentColumn) {
            contentColumn.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Reset all horizontal scrolls
        const scrollRows = document.querySelectorAll('[data-scroll-row]');
        scrollRows.forEach(row => {
            row.scrollTo({ left: 0, behavior: 'smooth' });
        });
    }, [searchParams]);

    const handleSelect = (publisher: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete('q'); // Clear search when picking a publisher
        if (publisher === currentPublisher) {
            params.delete('publisher'); // Toggle off
        } else {
            params.set('publisher', publisher);
        }
        router.replace(`?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.delete('publisher'); // Clear publisher when searching
        if (searchTerm) {
            params.set('q', searchTerm);
        } else {
            params.delete('q');
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.lampButton} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
                <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
            </button>

            <div className={`${styles.genieMenu} ${isOpen ? styles.open : ''}`}>
                <div className={styles.searchWrapper}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="SEARCH BOOKS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.item} ${!currentPublisher && !searchParams.get('q') ? styles.active : ''}`}
                        onClick={() => {
                            const params = new URLSearchParams();
                            setSearchTerm('');
                            router.replace('/');
                        }}
                        style={{ '--i': 0 } as React.CSSProperties}
                    >
                        All Books
                    </button>
                    {COMPETITORS.map((pub, index) => (
                        <button
                            key={pub}
                            className={`${styles.item} ${currentPublisher === pub ? styles.active : ''}`}
                            onClick={() => handleSelect(pub)}
                            style={{ '--i': index + 1 } as React.CSSProperties}
                        >
                            {pub}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
