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
import TypingIndicator from "@/components/chat/TypingIndicator/TypingIndicator.tsx";

interface ChatInputProps {
    onSendMessage: (content: string, files?: File[], replyToId?: string) => void
    replyTo: MessageType | null
    onCancelReply: () => void
    usersTyping: string[]
    onTyping: (isTyping: boolean) => void
}

function ChatInput({ onSendMessage, replyTo, onCancelReply, usersTyping, onTyping }: ChatInputProps) {
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
    } = useChatForm(onSendMessage, replyTo, onTyping);

    return (
        <TooltipProvider>
            <Form {...form}>
                {usersTyping.length > 0 && (
                    <TypingIndicator
                        userTyping={usersTyping}
                    />
                )}

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