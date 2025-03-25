import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoaderFillingSmall from "@/components/utils/loaders/LoaderFilling/LoaderFillingSmall.tsx";

interface LoadMoreTriggerProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

function LoadMoreTrigger({ onLoadMore, hasMore, isLoading }: LoadMoreTriggerProps) {
    const { ref, inView } = useInView({
        rootMargin: "50px",
    });

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            console.log("Reach bottom and fetching next page");
            onLoadMore();
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