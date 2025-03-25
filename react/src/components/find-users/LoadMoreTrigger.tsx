import {useEffect, useRef} from "react";
import { useInView } from "react-intersection-observer";
import LoaderFillingSmall from "@/components/utils/loaders/LoaderFilling/LoaderFillingSmall.tsx";

interface LoadMoreTriggerProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

function LoadMoreTrigger({ onLoadMore, hasMore, isLoading }: LoadMoreTriggerProps) {
    const { ref, inView } = useInView({
        rootMargin: "20px",
    });

    const hasTriggered = useRef(false);

    useEffect(() => {
        if (!inView) {
            hasTriggered.current = false;
        }

        if (inView && hasMore && !isLoading && !hasTriggered.current) {
            onLoadMore();
            hasTriggered.current = true;
        }
    }, [inView, hasMore, isLoading, onLoadMore]);

    return (
        <>
            <div ref={ref} className="h-1 w-full" />
            {isLoading && (
                <div className="flex justify-center p-4">
                    <LoaderFillingSmall />
                </div>
            )}
        </>
    );
}

export default LoadMoreTrigger;