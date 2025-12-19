'use client';

import { useEffect } from 'react';
import { AladinBook } from "@/lib/aladin-client";
import BookCard from "@/components/BookCard";
import useDraggableScroll from "@/lib/hooks/useDraggableScroll";
import styles from "../app/page.module.css";

interface BookRowData {
    title: string;
    books: AladinBook[];
    showRank?: boolean;
}

interface BookRowsProps {
    rows: BookRowData[];
}

function ScrollRowSection({ title, books, showRank }: BookRowData) {
    const { ref, isDragging, handlers } = useDraggableScroll();

    // Reset horizontal scroll when books change
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollLeft = 0;
        }
    }, [books]);

    const scroll = (direction: 'left' | 'right') => {
        if (!ref.current) return;
        const amount = direction === 'left' ? -800 : 800;
        ref.current.scrollBy({ left: amount, behavior: 'smooth' });
    };

    return (
        <section className={styles.rowSection}>
            <h2 className={styles.rowTitle}>{title}</h2>
            <div className={styles.scrollContainer}>
                <button
                    className={`${styles.scrollButton} ${styles.prevButton}`}
                    onClick={() => scroll('left')}
                    aria-label="Scroll Left"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>
                <div
                    ref={ref}
                    className={`${styles.scrollRow} ${isDragging ? styles.dragging : ''}`}
                    style={{ minHeight: '280px' }}
                    data-scroll-row
                    {...handlers}
                >
                    {books.length > 0 ? (
                        books.map((book, idx) => (
                            <BookCard
                                key={`${book.itemId}-${idx}`}
                                book={book}
                                rank={showRank ? idx + 1 : undefined}
                            />
                        ))
                    ) : (
                        <div className={styles.emptyState}>No books found.</div>
                    )}
                    <div className={styles.scrollSpacer} />
                </div>
                <button
                    className={`${styles.scrollButton} ${styles.nextButton}`}
                    onClick={() => scroll('right')}
                    aria-label="Scroll Right"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default function BookRows({ rows }: BookRowsProps) {
    return (
        <div className={styles.contentColumn} data-scroll-container>
            {rows.map((row, index) => (
                <ScrollRowSection
                    key={index}
                    title={row.title}
                    books={row.books}
                    showRank={row.showRank}
                />
            ))}
        </div>
    );
}
