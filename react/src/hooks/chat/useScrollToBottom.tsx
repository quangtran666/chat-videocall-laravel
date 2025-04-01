import {useEffect, useRef} from "react";

function UseScrollToBottom<T>(dependency : T[]) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [dependency])

    return { scrollRef }
}

export default UseScrollToBottom;