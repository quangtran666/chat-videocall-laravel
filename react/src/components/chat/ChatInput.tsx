import {useRef, useState} from "react";
import * as React from "react";
import { Paperclip, Send, Smile, X, FileIcon, ImageIcon, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Progress } from "../ui/progress";
import {Button} from "../ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import { Textarea } from "../ui/textarea";
import {MessageType} from "@/types/conversation/Conversation.ts";

interface ChatInputProps {
    onSendMessage: (content: string, files?: File[], replyToId?: string) => void
    replyTo: MessageType | null
    onCancelReply: () => void
}

const EMOJI_CATEGORIES = [
    {
        name: "Smileys & Emotion",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
    },
    {
        name: "People & Body",
        emojis: ["👍", "👎", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👋"],
    },
    {
        name: "Animals & Nature",
        emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧"],
    },
    {
        name: "Food & Drink",
        emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅"],
    },
]

function ChatInput({ onSendMessage, replyTo, onCancelReply }: ChatInputProps) {
    const [message, setMessage] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleSendMessage = () => {
        // if (message.trim() || files.length > 0) {
        //     onSendMessage(message, files, replyTo?.id)
        //     setMessage("")
        //     setFiles([])
        //     setUploadProgress({})
        // }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles((prev) => [...prev, ...newFiles])

            // Simulate upload progress
            newFiles.forEach((file) => {
                let progress = 0
                const interval = setInterval(() => {
                    progress += Math.random() * 20
                    if (progress >= 100) {
                        progress = 100
                        clearInterval(interval)
                    }
                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: Math.min(progress, 100),
                    }))
                }, 300)
            })
        }
    }

    const handleEmojiSelect = (emoji: string) => {
        setMessage((prev) => prev + emoji)
    }

    const removeFile = (fileName: string) => {
        setFiles((prev) => prev.filter((file) => file.name !== fileName))
        setUploadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[fileName]
            return newProgress
        })
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-4 w-4" />
        }
        return <FileIcon className="h-4 w-4" />
    }

    return (
        <TooltipProvider>
            <div className="border-t p-4">
                {/* Reply preview */}
                {replyTo && (
                    <div className="mb-3 flex items-center gap-2 rounded-md border bg-muted/30 p-2 pr-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 overflow-hidden">
                            {/*<div className="text-xs font-medium">Replying to {replyTo.senderName || "User"}</div>*/}
                            <div className="text-xs font-medium">Replying to {"User"}</div>
                            <div className="truncate text-xs text-muted-foreground">{replyTo.content}</div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onCancelReply}>
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                {files.length > 0 && (
                    <div className="mb-3 space-y-2">
                        {files.map((file) => (
                            <div key={file.name} className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                                {getFileIcon(file)}
                                <div className="flex-1 overflow-hidden">
                                    <div className="truncate text-sm">{file.name}</div>
                                    <Progress value={uploadProgress[file.name] || 0} className="h-1" />
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.name)}>
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-end gap-2">
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
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full">
                                        <Smile className="h-5 w-5" />
                                        <span className="sr-only">Insert emoji</span>
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">Insert emoji</TooltipContent>
                        </Tooltip>
                        <PopoverContent className="w-80 p-0" align="end">
                            <div className="p-3">
                                <div className="mb-2 text-sm font-medium">Emojis</div>
                                <div className="space-y-3">
                                    {EMOJI_CATEGORIES.map((category) => (
                                        <div key={category.name}>
                                            <div className="mb-1 text-xs text-muted-foreground">{category.name}</div>
                                            <div className="flex flex-wrap gap-1">
                                                {category.emojis.map((emoji) => (
                                                    <button
                                                        key={emoji}
                                                        className="cursor-pointer rounded p-1 text-lg hover:bg-muted"
                                                        onClick={() => handleEmojiSelect(emoji)}
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={replyTo ? "Type your reply..." : "Type a message..."}
                        className="min-h-10 max-h-40 resize-none"
                        rows={1}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                className={cn("h-9 w-9 shrink-0 rounded-full", !message.trim() && files.length === 0 && "opacity-50")}
                                onClick={handleSendMessage}
                                disabled={!message.trim() && files.length === 0}
                            >
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Send message</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default ChatInput;