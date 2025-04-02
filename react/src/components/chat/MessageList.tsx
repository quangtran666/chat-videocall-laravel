import {cn} from "@/lib/utils"
import {ScrollArea} from "../ui/scroll-area"
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {useState} from "react";
import {TooltipProvider} from "../ui/tooltip";
import UseChatScroll from "@/hooks/chat/useChatScroll.ts";
import {MessageType} from "@/types/conversation/Conversation.ts";
import {useUser} from "@/hooks/useUser.ts";
import {formatDistanceToNow} from "date-fns";
import LoadMoreTrigger from "@/components/find-users/LoadMoreTrigger.tsx";
import {InfiniteQueryObserverResult} from "@tanstack/react-query";
import MessageStatus from "@/components/chat/MessageStatus.tsx";

interface MessageListProps {
    messages: MessageType[]
    isGroup?: boolean
    onReactionAdd: (messageId: string, emoji: string) => void
    onReplyMessage: (messageId: string) => void
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, unknown>>
    hasNextPage: boolean
    isFetchingNextPage: boolean
}

const EMOJI_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥", "👏"]

function MessageList({
                         messages,
                         isGroup = false,
                         onReactionAdd,
                         onReplyMessage,
                         fetchNextPage,
                         hasNextPage,
                         isFetchingNextPage
                     }: MessageListProps) {
    const {data: user} = useUser();
    const {bottomScrollRef, scrollAreaRef, scrollTop} = UseChatScroll<MessageType>(messages)
    const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null)
    //
    // const formatFileSize = (bytes: number) => {
    //     if (bytes < 1024) return bytes + " B"
    //     else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    //     else return (bytes / 1048576).toFixed(1) + " MB"
    // }
    //
    // const renderFileAttachment = (file: MessageFile) => {
    //     if (file.type.startsWith("image/")) {
    //         return (
    //             <div className="mt-2 overflow-hidden rounded-lg">
    //                 <img src={file.url || "/placeholder.svg"} alt={file.name} className="max-h-64 w-auto object-contain" />
    //                 <div className="mt-1 text-xs text-muted-foreground">
    //                     {file.name} ({formatFileSize(file.size)})
    //                 </div>
    //             </div>
    //         )
    //     } else if (file.type.startsWith("text/")) {
    //         return (
    //             <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
    //                 <FileTextIcon className="h-8 w-8 text-muted-foreground" />
    //                 <div className="overflow-hidden">
    //                     <div className="truncate text-sm">{file.name}</div>
    //                     <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
    //                 <FileIcon className="h-8 w-8 text-muted-foreground" />
    //                 <div className="overflow-hidden">
    //                     <div className="truncate text-sm">{file.name}</div>
    //                     <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
    //
    // // Group reactions by emoji
    // const getGroupedReactions = (reactions: MessageReaction[] = []) => {
    //     const grouped: Record<string, MessageReaction[]> = {}
    //
    //     reactions.forEach((reaction) => {
    //         if (!grouped[reaction.emoji]) {
    //             grouped[reaction.emoji] = []
    //         }
    //         grouped[reaction.emoji].push(reaction)
    //     })
    //
    //     return grouped
    // }

    return (
        <TooltipProvider>
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="flex flex-col gap-4">
                    {/* Pivot to trigger load more data */}
                    <LoadMoreTrigger
                        onLoadMore={async () => {
                            await fetchNextPage()
                            scrollTop()
                        }}
                        hasMore={hasNextPage}
                        isLoading={isFetchingNextPage}
                    />
                    {messages.map((message) => {
                        // // Handle system messages
                        // if (message.isSystemMessage) {
                        //     return (
                        //         <div key={message.id} className="flex justify-center">
                        //             <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{message.content}</div>
                        //         </div>
                        //     )
                        // }

                        const isMe = message.sender.id === user?.id
                        // const groupedReactions = getGroupedReactions(message.reactions)

                        return (
                            <div key={message.id} className={cn("flex gap-3", isMe ? "flex-row-reverse" : "flex-row")}>
                                {!isMe && (
                                    <UserAvatar
                                        src={message.sender.avatar_url}
                                        alt={message.sender.name}
                                        size="sm"
                                    />
                                )}
                                <div
                                    className={cn("flex max-w-[60%] flex-col", isMe ? "items-end" : "items-start")}
                                    onMouseEnter={() => setHoveredMessageId(message.id)}
                                    onMouseLeave={() => setHoveredMessageId(null)}
                                >
                                    {isGroup && !isMe && message.sender.name && (
                                        <div className="mb-1 text-xs font-medium">{message.sender.name}</div>
                                    )}

                                    {/* Reply indicator */}
                                    {/*{message.replyTo && (*/}
                                    {/*    <div*/}
                                    {/*        className={cn(*/}
                                    {/*            "flex items-center gap-2 rounded-lg px-3 py-2 mb-1 text-xs max-w-[90%]",*/}
                                    {/*            isMe ? "bg-primary/10 text-primary-foreground/80" : "bg-muted/70 text-muted-foreground",*/}
                                    {/*        )}*/}
                                    {/*    >*/}
                                    {/*        <MessageSquare className="h-3 w-3 flex-shrink-0" />*/}
                                    {/*        <div className="overflow-hidden">*/}
                                    {/*            <div className="font-medium truncate">{message.replyTo.senderName || "User"}</div>*/}
                                    {/*            <div className="truncate">{message.replyTo.content}</div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}

                                    <div className="relative">
                                        <div
                                            className={cn("rounded-lg px-3 py-2", isMe ? "bg-primary text-primary-foreground" : "bg-muted")}
                                        >
                                            <div className={cn("flex items-center", {
                                                "opacity-70": message.status === 'sending'
                                            })}>
                                                {message.content}
                                                <MessageStatus status={message.status} />
                                            </div>
                                        </div>

                                        {/*    /!* Message actions *!/*/}
                                        {/*    {hoveredMessageId === message.id && (*/}
                                        {/*        <div*/}
                                        {/*            className={cn(*/}
                                        {/*                "absolute -top-3 flex items-center gap-1 rounded-full border bg-background shadow-sm",*/}
                                        {/*                isMe ? "left-0 -translate-x-1" : "right-0 translate-x-1",*/}
                                        {/*            )}*/}
                                        {/*        >*/}
                                        {/*            <Tooltip>*/}
                                        {/*                <TooltipTrigger asChild>*/}
                                        {/*                    <Popover>*/}
                                        {/*                        <PopoverTrigger asChild>*/}
                                        {/*                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">*/}
                                        {/*                                <SmilePlus className="h-3.5 w-3.5" />*/}
                                        {/*                            </Button>*/}
                                        {/*                        </PopoverTrigger>*/}
                                        {/*                        <PopoverContent className="w-auto p-2" align={isMe ? "start" : "end"}>*/}
                                        {/*                            <div className="flex gap-1">*/}
                                        {/*                                {EMOJI_REACTIONS.map((emoji) => (*/}
                                        {/*                                    <button*/}
                                        {/*                                        key={emoji}*/}
                                        {/*                                        className="text-lg hover:bg-muted p-1 rounded-md transition-colors"*/}
                                        {/*                                        onClick={() => onReactionAdd(message.id, emoji)}*/}
                                        {/*                                    >*/}
                                        {/*                                        {emoji}*/}
                                        {/*                                    </button>*/}
                                        {/*                                ))}*/}
                                        {/*                            </div>*/}
                                        {/*                        </PopoverContent>*/}
                                        {/*                    </Popover>*/}
                                        {/*                </TooltipTrigger>*/}
                                        {/*                <TooltipContent side="top">Add reaction</TooltipContent>*/}
                                        {/*            </Tooltip>*/}

                                        {/*            <Tooltip>*/}
                                        {/*                <TooltipTrigger asChild>*/}
                                        {/*                    <Button*/}
                                        {/*                        variant="ghost"*/}
                                        {/*                        size="icon"*/}
                                        {/*                        className="h-6 w-6 rounded-full"*/}
                                        {/*                        onClick={() => onReplyMessage(message.id)}*/}
                                        {/*                    >*/}
                                        {/*                        <Reply className="h-3.5 w-3.5" />*/}
                                        {/*                    </Button>*/}
                                        {/*                </TooltipTrigger>*/}
                                        {/*                <TooltipContent side="top">Reply</TooltipContent>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </div>*/}
                                        {/*    )}*/}
                                        {/*</div>*/}

                                        {/*{message.files &&*/}
                                        {/*    message.files.map((file, index) => (*/}
                                        {/*        <div key={index} className="max-w-xs">*/}
                                        {/*            {renderFileAttachment(file)}*/}
                                        {/*        </div>*/}
                                        {/*    ))}*/}

                                        {/*/!* Reactions display *!/*/}
                                        {/*{message.reactions && message.reactions.length > 0 && (*/}
                                        {/*    <div className={cn("flex flex-wrap gap-1 mt-1", isMe ? "justify-end" : "justify-start")}>*/}
                                        {/*        {Object.entries(groupedReactions).map(([emoji, reactions]) => (*/}
                                        {/*            <TooltipProvider key={emoji}>*/}
                                        {/*                <Tooltip>*/}
                                        {/*                    <TooltipTrigger asChild>*/}
                                        {/*                        <div className="flex items-center gap-1 rounded-full bg-muted/50 px-2 py-0.5 text-xs">*/}
                                        {/*                            <span>{emoji}</span>*/}
                                        {/*                            <span>{reactions.length}</span>*/}
                                        {/*                        </div>*/}
                                        {/*                    </TooltipTrigger>*/}
                                        {/*                    <TooltipContent>{reactions.map((r) => r.userName).join(", ")}</TooltipContent>*/}
                                        {/*                </Tooltip>*/}
                                        {/*            </TooltipProvider>*/}
                                        {/*        ))}*/}
                                    </div>
                                    {/*)}*/}

                                    <div
                                        className="mt-1 text-xs text-muted-foreground">{formatDistanceToNow(message.created_at, {addSuffix: true})}</div>
                                </div>
                            </div>
                        )
                    })}
                    <span ref={bottomScrollRef}/>
                </div>
            </ScrollArea>
        </TooltipProvider>
    )
}

export default MessageList;