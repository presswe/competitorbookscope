'use client';

import styles from './BookCard.module.css';
import { AladinBook } from '@/lib/aladin-client';

interface BookCardProps {
    book: AladinBook;
    rank?: number; // Optional rank override if needed
}

export default function BookCard({ book, rank }: BookCardProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty('--rotateX', `${rotateX}deg`);
        card.style.setProperty('--rotateY', `${rotateY}deg`);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
    };

    const rankClass = rank === 1 ? styles.rank1 : rank === 2 ? styles.rank2 : rank === 3 ? styles.rank3 : '';

    return (
        <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} ${rankClass}`}
            draggable="false"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.coverContainer}>
                {rank && rank <= 3 && (
                    <>
                        <div className={styles.rankBgNumber}>{rank}</div>
                        {rank === 1 ? (
                            <div className={`${styles.medalIcon}`}>
                                <img src="/medal-gold.svg" alt="Gold Medal" />
                                <span className={styles.medalRankText}></span>
                            </div>
                        ) : rank === 2 ? (
                            <div className={`${styles.medalIcon}`}>
                                <img src="/medal-silver.svg" alt="Silver Medal" />
                                <span className={styles.medalRankText}></span>
                            </div>
                        ) : rank === 3 ? (
                            <div className={`${styles.medalIcon}`}>
                                <img src="/medal-bronze.svg" alt="Bronze Medal" />
                                <span className={styles.medalRankText}></span>
                            </div>
                        ) : (
                            <div className={`${styles.medalIcon}`}>
                                <span className={styles.medalRankText}></span>
                            </div>
                        )}
                    </>
                )}
                <img
                    src={book.cover.replace('http://', 'https://')}
                    alt={book.title}
                    className={styles.coverImage}
                    loading="lazy"
                    draggable="false"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/300x450/e0e0e0/333333?text=${encodeURIComponent(book.title.substring(0, 10))}`;
                        e.currentTarget.onerror = null;
                    }}
                />
                <div className={styles.overlay}>
                    {rank && rank >= 4 && <div className={styles.overlayRank}>TOP {rank}</div>}
                    <div className={styles.overlayCategory}>{book.categoryName?.split('>').pop() || '도서'}</div>
                    {book.salesPoint && (
                        <div className={styles.salesPoint}>
                            판매지수: {book.salesPoint.toLocaleString()}
                        </div>
                    )}
                    {book.priceSales && (
                        <div className={styles.price}>{book.priceSales.toLocaleString()}원</div>
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{book.title}</h3>
                <div className={styles.meta}>
                    <span className={styles.publisher}>{book.publisher}</span>
                    {' · '}
                    <span>{book.pubDate}</span>
                </div>
            </div>
        </a>
    );
}
