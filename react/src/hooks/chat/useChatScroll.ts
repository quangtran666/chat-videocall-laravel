import {useEffect, useRef} from "react";

function UseChatScroll<T extends { id: string }>(dependency: T[]) {
    const bottomScrollRef = useRef<HTMLSpanElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const hasScrolledToBottom = useRef(false)
    const lastMessageRef = useRef<string | null>(null)

    // This effect will run when the component mounts and scroll to the bottom
    useEffect(() => {
        if (bottomScrollRef.current && !hasScrolledToBottom.current) {
            bottomScrollRef.current.scrollIntoView()
            hasScrolledToBottom.current = true;
        }
    }, [])

    // Scroll to bottom when new messages arrive, but not when loading history.
    // The reason for this to work is, the messages I already reversed, so the most recent is at the end
    useEffect(() => {
        const mostRecentMessage = dependency[dependency.length - 1]

        if (hasScrolledToBottom.current &&
            lastMessageRef.current !== null &&
            mostRecentMessage.id !== lastMessageRef.current)
        {
            bottomScrollRef.current?.scrollIntoView({behavior: 'smooth'});
        }

        lastMessageRef.current = mostRecentMessage.id
    }, [dependency]);

    // Helper function to scroll down a bit when loading new messages
    const scrollTop = () => {
        if (scrollAreaRef.current) {
            // Get the actual viewport element inside ScrollArea
            const viewportElement = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]');
            if (viewportElement) {
                viewportElement.scrollTop = 300;
            }
        }
    }

    return {bottomScrollRef, scrollAreaRef, scrollTop}
}

export default UseChatScroll;