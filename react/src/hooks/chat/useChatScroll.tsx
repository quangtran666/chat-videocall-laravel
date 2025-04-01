import {useEffect, useRef} from "react";

function UseChatScroll<T>(dependency : T[]) {
    const bottomScrollRef = useRef<HTMLSpanElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const hasScrolledToBottom = useRef(false);

    // This effect will run when the component mounts and scroll to the bottom
    useEffect(() => {
        if (bottomScrollRef.current && !hasScrolledToBottom.current) {
            bottomScrollRef.current.scrollIntoView()
            hasScrolledToBottom.current = true;
        }
    }, [])

    const scrollTop = () => {
        if (scrollAreaRef.current) {
            // Get the actual viewport element inside ScrollArea
            const viewportElement = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]');
            if (viewportElement) {
                viewportElement.scrollTop = 300;
            }
        }
    }

    return { bottomScrollRef, scrollAreaRef, scrollTop }
}

export default UseChatScroll;