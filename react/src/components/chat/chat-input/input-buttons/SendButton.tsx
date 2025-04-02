import { Send } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Button } from "../../../ui/button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip.tsx";

interface SendButtonProps {
    isFormEmpty: boolean;
}

function SendButton({ isFormEmpty }: SendButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="submit"
                    size="icon"
                    className={cn("h-9 w-9 shrink-0 rounded-full", isFormEmpty && "opacity-50")}
                    disabled={isFormEmpty}
                >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Send message</TooltipContent>
        </Tooltip>
    );
}

export default SendButton;