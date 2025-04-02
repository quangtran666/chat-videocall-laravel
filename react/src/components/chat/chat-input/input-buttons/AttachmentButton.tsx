import * as React from "react";
import { Paperclip } from "lucide-react";
import { Button } from "../../../ui/button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip.tsx";

interface AttachmentButtonProps {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function AttachmentButton({ fileInputRef }: AttachmentButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip className="h-5 w-5" />
                    <span className="sr-only">Attach file</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach file</TooltipContent>
        </Tooltip>
    );
}

export default AttachmentButton;