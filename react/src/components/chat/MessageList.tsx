import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import { FileIcon, FileTextIcon } from "lucide-react";
import {useEffect, useRef} from "react";

interface MessageFile {
    name: string
    size: number
    type: string
    url: string
}

interface Message {
    id: string
    content: string
    timestamp: string
    sender: "me" | "them" | "other"
    senderName?: string
    senderAvatar?: string
    files?: MessageFile[]
}

interface MessageListProps {
    messages: Message[]
    isGroup?: boolean
}

function MessageList({ messages, isGroup = false }: MessageListProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B"
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
        else return (bytes / 1048576).toFixed(1) + " MB"
    }

    const renderFileAttachment = (file: MessageFile) => {
        if (file.type.startsWith("image/")) {
            return (
                <div className="mt-2 overflow-hidden rounded-lg">
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="max-h-64 w-auto object-contain" />
                    <div className="mt-1 text-xs text-muted-foreground">
                        {file.name} ({formatFileSize(file.size)})
                    </div>
                </div>
            )
        } else if (file.type.startsWith("text/")) {
            return (
                <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    <FileTextIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="overflow-hidden">
                        <div className="truncate text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="overflow-hidden">
                        <div className="truncate text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                    </div>
                </div>
            )
        }
    }

    return (
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="flex flex-col gap-4">
                {messages.map((message) => {
                    const isMe = message.sender === "me"

                    return (
                        <div key={message.id} className={cn("flex gap-3", isMe ? "flex-row-reverse" : "flex-row")}>
                            {!isMe && (
                                <UserAvatar
                                    src={message.senderAvatar || "/placeholder.svg?height=40&width=40"}
                                    alt={message.senderName || "User"}
                                    size="sm"
                                />
                            )}
                            <div className={cn("flex max-w-[80%] flex-col", isMe ? "items-end" : "items-start")}>
                                {isGroup && !isMe && message.senderName && (
                                    <div className="mb-1 text-xs font-medium">{message.senderName}</div>
                                )}
                                <div className={cn("rounded-lg px-3 py-2", isMe ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                    {message.content}
                                </div>
                                {message.files &&
                                    message.files.map((file, index) => (
                                        <div key={index} className="max-w-xs">
                                            {renderFileAttachment(file)}
                                        </div>
                                    ))}
                                <div className="mt-1 text-xs text-muted-foreground">{message.timestamp}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    );
}

export default MessageList;