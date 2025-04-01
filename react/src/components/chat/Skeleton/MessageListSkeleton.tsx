import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const MessageFromOtherUser = () => {
    return (
        <div className="flex gap-3 flex-row">
            <Skeleton className="h-10 w-10 bg-gray-300 rounded-full" />
            <div className="flex max-w-[60%] flex-col gap-2">
                <Skeleton className="h-15 w-[1000px] bg-gray-300" />
                <Skeleton className="h-5 w-[200px] bg-gray-300" />
            </div>
        </div>
    )
}

const MessageFromCurrentUser = () => {
    return (
        <div className="flex gap-3 flex-row-reverse">
            <div className="flex max-w-[60%] flex-col gap-2 items-end">
                <Skeleton className="h-15 w-[1000px] bg-gray-300" />
                <Skeleton className="h-5 w-[200px] bg-gray-300" />
            </div>
        </div>
    )
}

function MessageListSkeleton() {
    return (
        <ScrollArea className="h-full p-4">
            <div className="flex flex-col gap-4">
                <MessageFromOtherUser />
                <MessageFromCurrentUser />
                <MessageFromOtherUser />
                <MessageFromOtherUser />
            </div>
        </ScrollArea>
    );
}

export default MessageListSkeleton;