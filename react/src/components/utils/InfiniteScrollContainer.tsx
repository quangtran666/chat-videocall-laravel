import {ReactNode} from "react";
import {useInView} from "react-intersection-observer";

type InfiniteScrollContainerProps = {
    children: ReactNode;
    onBottomReached: () => void;
    className?: string;
}

function InfiniteScrollContainer({ children, onBottomReached, className }: InfiniteScrollContainerProps) {
    const { ref } = useInView({
        onChange(inView) {
            if (inView) {
                console.log("Reach bottom");
                onBottomReached();
            }
        }
    });

    return (
        <div className={className}>
            {children}
            <div ref={ref} />
        </div>
    );
}

export default InfiniteScrollContainer;