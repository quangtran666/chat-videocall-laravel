import {AlertCircle, CheckCircle2, Loader2} from "lucide-react";

function MessageStatus({status}: { status?: string }) {
    if (!status || status === 'sent') {
        return <CheckCircle2 className="h-3 w-3 text-green-500 ml-1" />;
    }

    if (status === 'sending') {
        return <Loader2 className="h-3 w-3 text-gray-500 ml-1 animate-spin" />;
    }

    if (status === 'error') {
        return (
            <div className="flex items-center">
                <AlertCircle className="h-3 w-3 text-red-500 ml-1" />
                <span className="text-xs text-red-500 ml-1">Failed</span>
            </div>
        );
    }

    return null;
}

export default MessageStatus;