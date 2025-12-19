'use client';

import styles from './Header.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (term.trim()) {
            params.set('q', term.trim());
        } else {
            params.delete('q');
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.logo}>
                    BookTracker
                </div>
                <form onSubmit={handleSearch} className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="도서명, 저자 검색..."
                        className={styles.searchInput}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </form>
            </div>
        </header>
    );
}
