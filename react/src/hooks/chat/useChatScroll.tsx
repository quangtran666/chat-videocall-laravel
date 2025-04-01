import {useEffect, useRef} from "react";

function UseChatScroll<T>(dependency : T[]) {
    const scrollRef = useRef<HTMLSpanElement>(null)

    const hasScrolledToBottom = useRef(false);

    // This effect will run when the component mounts and scroll to the bottom
    useEffect(() => {
        if (scrollRef.current && !hasScrolledToBottom.current) {
            scrollRef.current.scrollIntoView()
            hasScrolledToBottom.current = true;
        }
    }, [])

    return { scrollRef }
}

export default UseChatScroll;