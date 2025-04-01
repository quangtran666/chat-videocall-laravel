import {Skeleton} from "@/components/ui/skeleton.tsx";

function ConversationSkeleton() {
    return (
        <div className="flex items-center justify-between gap-2">
            <Skeleton className="bg-gray-500 h-9 w-9 rounded-full " />
            <div className="space-y-1">
                <Skeleton className="h-4 w-[200px] bg-gray-400" />
                <Skeleton className="h-4 w-[200px] bg-gray-400" />
            </div>
        </div>
    );
}

export default ConversationSkeleton;