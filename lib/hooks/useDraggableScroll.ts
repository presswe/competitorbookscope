'use client';

import { useState, useRef, useCallback, MouseEvent } from 'react';

export default function useDraggableScroll() {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        setIsDragging(true);
        setHasMoved(false);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onMouseUp = useCallback((e: MouseEvent) => {
        if (hasMoved) {
            // Prevent accidental clicks on children if we moved more than a threshold
            e.preventDefault();
        }
        setIsDragging(false);
    }, [hasMoved]);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !ref.current) return;

        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX);

        // Only consider it a "move" if we've dragged more than 5px
        if (Math.abs(walk) > 5) {
            setHasMoved(true);
        }

        if (hasMoved) {
            e.preventDefault();
            const scrollWalk = walk * 1.5; // Scroll speed factor
            ref.current.scrollLeft = scrollLeft - scrollWalk;
        }
    }, [isDragging, startX, scrollLeft, hasMoved]);

    const onDragStart = useCallback((e: MouseEvent) => {
        e.preventDefault();
    }, []);

    // Also need to handle the click event to prevent navigation if we dragged
    const onClick = useCallback((e: React.MouseEvent) => {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, [hasMoved]);

    return {
        ref,
        isDragging,
        handlers: {
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            onMouseMove,
            onDragStart,
            onClick,
        },
    };
}
