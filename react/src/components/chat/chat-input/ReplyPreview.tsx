import { X, MessageSquare } from "lucide-react";
import { Button } from "../../ui/button.tsx";
import { MessageType } from "@/types/conversation/Conversation.ts";

interface ReplyPreviewProps {
    replyTo: MessageType;
    onCancelReply: () => void;
}

function ReplyPreview({ replyTo, onCancelReply }: ReplyPreviewProps) {
    return (
        <div className="mb-3 flex items-center gap-2 rounded-md border bg-muted/30 p-2 pr-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 overflow-hidden">
                <div className="text-xs font-medium">Replying to {"User"}</div>
                <div className="truncate text-xs text-muted-foreground">{replyTo.content}</div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onCancelReply}>
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
}

export default ReplyPreview;