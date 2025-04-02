import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageType, SendMessageFormSchema, SendMessageFormType } from "@/types/conversation/Conversation.ts";
import * as React from "react";

export const useChatForm = (
    onSendMessage: (content: string, files?: File[], replyToId?: string) => void,
    replyTo: MessageType | null
) => {
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

    const form = useForm<SendMessageFormType>({
        resolver: zodResolver(SendMessageFormSchema),
        defaultValues: {
            content: "",
            files: [],
            replyId: null
        },
    });

    const { watch, setValue, getValues } = form;
    const files = watch("files");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const content = getValues("content") || "";
            const currentFiles = getValues("files") || [];
            const replyId = replyTo?.id?.toString() || null;

            console.log(`Content: ${content}, Files: ${currentFiles}, Reply ID: ${replyId}`);

            form.reset({ content: "", files: [] });
        }
    };

    const handleSendMessage = (values: SendMessageFormType) => {
        console.log("Called");
        // const message = values.content || "";
        // if (message.trim() || (values.files && values.files.length > 0)) {
        //     onSendMessage(message, values.files, replyTo?.id?.toString());
        //     form.reset({ content: "", files: [] });
        //     setUploadProgress({});
        // }

        console.log(values);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const currentFiles = getValues("files") || [];
            setValue("files", [...currentFiles, ...newFiles], { shouldValidate: true });

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
        setValue("content", currentMessage + emoji, { shouldValidate: true });
    };

    const removeFile = (fileName: string) => {
        const currentFiles = getValues("files") || [];

        setValue(
            "files",
            currentFiles.filter((file) => file.name !== fileName),
            { shouldValidate: true }
        );

        setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
    };

    const isFormEmpty = !watch("content")?.trim() && files?.length === 0;

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