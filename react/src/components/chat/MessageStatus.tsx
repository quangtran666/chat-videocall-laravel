import {AlertCircle, LoaderCircle} from "lucide-react";

type MessageStatusProps = {
    status: 'sent' | 'sending' | 'error';
}

function MessageStatus({status}: MessageStatusProps) {
    if (status === 'sending') {
        return (
            <div className="text-sm flex gap-1 items-center text-muted-foreground mt-1 justify-end">
                <LoaderCircle className="animate-spin h-5"/>
                <span>Sending</span>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="text-sm flex gap-1 items-center text-muted-foreground mt-1 justify-end">
                <AlertCircle className="h-5 text-red-500"/>
                <span>Error</span>
            </div>
        );
    }
}

export default MessageStatus;