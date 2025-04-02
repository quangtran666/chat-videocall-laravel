import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { Textarea } from "../../ui/textarea.tsx";
import { MessageType, SendMessageRequestType } from "@/types/conversation/Conversation.ts";
import * as React from "react";

interface MessageTextareaProps {
    control: Control<SendMessageRequestType>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    replyTo: MessageType | null;
}

function MessageTextarea({ control, handleKeyDown, replyTo }: MessageTextareaProps) {
    return (
        <FormField
            control={control}
            name="content"
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormControl>
                        <Textarea
                            {...field}
                            onKeyDown={handleKeyDown}
                            placeholder={replyTo ? "Type your reply..." : "Type a message..."}
                            className="min-h-10 max-h-40 resize-none"
                            rows={1}
                            maxLength={500}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

export default MessageTextarea;