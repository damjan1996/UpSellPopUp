import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
    const scrollRef = useRef(null);
    const thumbRef = useRef(null);
    const observer = useRef(null);
    const [showScrollbar, setShowScrollbar] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [scrollRatio, setScrollRatio] = React.useState(0);
    const [thumbHeight, setThumbHeight] = React.useState(0);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const updateScrollbar = () => {
            const { scrollHeight, clientHeight, scrollTop } = scrollElement;
            const scrollRatio = scrollTop / (scrollHeight - clientHeight);
            const shouldShowScrollbar = scrollHeight > clientHeight;

            setShowScrollbar(shouldShowScrollbar);
            setScrollRatio(scrollRatio);
            setThumbHeight((clientHeight / scrollHeight) * clientHeight);
        };

        updateScrollbar();

        observer.current = new ResizeObserver(updateScrollbar);
        observer.current.observe(scrollElement);

        scrollElement.addEventListener('scroll', updateScrollbar);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            scrollElement.removeEventListener('scroll', updateScrollbar);
        };
    }, []);

    // Implement dragging functionality
    const handleThumbMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);

        const startY = e.clientY;
        const startTop = scrollRef.current.scrollTop;
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;

        const handleMouseMove = (e) => {
            const deltaY = e.clientY - startY;
            const percentDelta = deltaY / clientHeight;
            scrollRef.current.scrollTop = startTop + percentDelta * scrollHeight;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className={cn("relative overflow-hidden", className)} ref={ref} {...props}>
            <div
                ref={scrollRef}
                className="h-full w-full overflow-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {children}
            </div>
            {showScrollbar && (
                <div className="absolute right-0.5 top-0 bottom-0 w-2 transition-opacity">
                    <div
                        ref={thumbRef}
                        className="rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 w-1.5 transition-opacity"
                        style={{
                            height: `${thumbHeight}px`,
                            transform: `translateY(${scrollRatio * (scrollRef.current?.clientHeight - thumbHeight)}px)`,
                            opacity: isDragging ? 1 : 0.5,
                            cursor: 'pointer'
                        }}
                        onMouseDown={handleThumbMouseDown}
                    />
                </div>
            )}
        </div>
    );
});

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };