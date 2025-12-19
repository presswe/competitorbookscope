'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './PublisherFilter.module.css';
import { COMPETITORS } from '@/lib/constants';

export default function PublisherFilter() {
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
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.chip} ${!currentPublisher ? styles.active : ''}`}
                onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('publisher');
                    router.replace(`?${params.toString()}`);
                }}
            >
                전체
            </button>
            {COMPETITORS.map((pub) => (
                <button
                    key={pub}
                    className={`${styles.chip} ${currentPublisher === pub ? styles.active : ''}`}
                    onClick={() => handleSelect(pub)}
                >
                    {pub}
                </button>
            ))}
        </div>
    );
}
