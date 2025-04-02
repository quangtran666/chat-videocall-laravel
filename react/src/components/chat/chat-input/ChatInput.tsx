import {useRef} from "react";
import {useChatForm} from "@/hooks/chat/useChatForm.ts";
import { MessageType } from "@/types/conversation/Conversation";
import { TooltipProvider } from "@/components/ui/tooltip";
import {Form} from "@/components/ui/form.tsx";
import ReplyPreview from "./ReplyPreview";
import AttachedFilesList from "./AttachedFilesList";
import AttachmentButton from "./input-buttons/AttachmentButton";
import EmojiPicker from "@/components/chat/chat-input/EmojiPicker.tsx";
import MessageTextarea from "./MessageTextarea";
import SendButton from "./input-buttons/SendButton";

interface ChatInputProps {
    onSendMessage: (content: string, files?: File[], replyToId?: string) => void
    replyTo: MessageType | null
    onCancelReply: () => void
}

function ChatInput({ onSendMessage, replyTo, onCancelReply }: ChatInputProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {
        form,
        files,
        uploadProgress,
        isFormEmpty,
        handleFileChange,
        handleKeyDown,
        handleSendMessage,
        handleEmojiSelect,
        removeFile
    } = useChatForm(onSendMessage, replyTo);

    return (
        <TooltipProvider>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSendMessage)} className="border-t p-4">
                    {replyTo && (
                        <ReplyPreview replyTo={replyTo} onCancelReply={onCancelReply} />
                    )}

                    {files && files.length > 0 && (
                        <AttachedFilesList
                            files={files}
                            uploadProgress={uploadProgress}
                            onRemoveFile={removeFile}
                        />
                    )}

                    <div className="flex items-end gap-2">
                        <AttachmentButton fileInputRef={fileInputRef} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />

                        <EmojiPicker onEmojiSelect={handleEmojiSelect} />

                        <MessageTextarea
                            control={form.control}
                            handleKeyDown={handleKeyDown}
                            replyTo={replyTo}
                        />

                        <SendButton isFormEmpty={isFormEmpty} />
                    </div>
                </form>
            </Form>
        </TooltipProvider>
    )
}

export default ChatInput;