import {useInView} from "react-intersection-observer";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ReactNode} from "react";

type InfiniteScrollContainerProps = {
    onBottomReached: () => void;
    className?: string;
    children: ReactNode;
}

function InfiniteScrollContainer({ onBottomReached, className, children}: InfiniteScrollContainerProps) {
    const { ref } = useInView({
        onChange(inView) {
            if (inView) {
                console.log("Reach bottom");
                onBottomReached();
            }
        }
    });

    const PivotComponent = () => <div ref={ref} />;

    console.log("InfiniteScrollContainer rendered");

    return (
        <div className={className}>
        </div>
    );
}

export default InfiniteScrollContainer;