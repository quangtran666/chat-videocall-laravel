import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MessageType, SendMessageRequestSchema, SendMessageRequestType} from "@/types/conversation/Conversation.ts";

export const useChatForm = (
    onSendMessage: (content: string, files?: File[], replyToId?: string) => void,
    replyTo: MessageType | null,
    onTyping: (isTyping: boolean) => void
) => {
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const form = useForm<SendMessageRequestType>({
        resolver: zodResolver(SendMessageRequestSchema),
        defaultValues: {
            content: "",
            files: [],
            replyId: null
        },
    });

    const {watch, setValue, getValues} = form;
    const files = watch("files");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const content = getValues("content") || "";
            const currentFiles = getValues("files") || [];
            onSendMessage(content, currentFiles, replyTo?.id?.toString());
            form.reset({content: "", files: []});
        }
    };

    const handleSendMessage = (values: SendMessageRequestType) => {
        onSendMessage(values.content, values.files, values.replyId?.toString());
        form.reset({content: "", files: []});
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const currentFiles = getValues("files") || [];
            setValue("files", [...currentFiles, ...newFiles], {shouldValidate: true});

            // Simulate upload progress
            newFiles.forEach((file) => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 20;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                    }
                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: Math.min(progress, 100),
                    }));
                }, 300);
            });
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        const currentMessage = getValues("content") || "";
        setValue("content", currentMessage + emoji, {shouldValidate: true});
    };

    const removeFile = (fileName: string) => {
        const currentFiles = getValues("files") || [];

        setValue(
            "files",
            currentFiles.filter((file) => file.name !== fileName),
            {shouldValidate: true}
        );

        setUploadProgress((prev) => {
            const newProgress = {...prev};
            delete newProgress[fileName];
            return newProgress;
        });
    };

    const isFormEmpty = !watch("content")?.trim() && files?.length === 0;

    // Track typing state to send typing events to the server
    const content = watch("content");
    // Store the previous typing state to compare with the current state to avoid unnecessary calls
    const previousTypingState = useRef(false);

    useEffect(() => {
        const isTyping = content.trim().length > 0;

        if (isTyping !== previousTypingState.current) {
            previousTypingState.current = isTyping;
            onTyping(isTyping);
        }
    }, [content, onTyping]);

    return {
        form,
        files,
        uploadProgress,
        isFormEmpty,
        handleFileChange,
        handleKeyDown,
        handleSendMessage,
        handleEmojiSelect,
        removeFile
    };
};