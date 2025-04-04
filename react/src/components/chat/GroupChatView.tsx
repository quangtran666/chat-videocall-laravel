import {Info, Shield, UserPlus} from "lucide-react";
import {Button } from "../ui/button"
import {Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { UserAvatar } from "../utils/UserAvatar"
import {useState} from "react";
import { ScrollArea } from "../ui/scroll-area";
import MessageList, {Message} from "./MessageList";
import ChatInput from "./chat-input/ChatInput.tsx";
import AddMemberDialog from "@/components/chat/AddMemberDialog.tsx";

interface GroupChatViewProps {
    chatId: string
}

function GroupChatView({ chatId }: GroupChatViewProps) {
    const [addMemberOpen, setAddMemberOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isAddingMembers, setIsAddingMembers] = useState(false)
    const [replyToMessage, setReplyToMessage] = useState<Message | null>(null)

    // In a real app, you would fetch this data from an API
    const [group, setGroup] = useState({
        id: chatId,
        name: "Tech Team",
        avatar: "/placeholder.svg?height=40&width=40",
        description: "Team discussions about ongoing projects and technical issues",
        members: [
            { id: "1", name: "You", avatar: "/placeholder.svg?height=40&width=40", role: "Admin", online: true },
            { id: "2", name: "David Miller", avatar: "/placeholder.svg?height=40&width=40", role: "Member", online: true },
            { id: "3", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", role: "Member", online: false },
            { id: "4", name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40", role: "Member", online: true },
            { id: "5", name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Member", online: false },
        ],
    })

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hey team, how's the new feature coming along?",
            timestamp: "9:30 AM",
            sender: "other",
            senderName: "David Miller",
            senderAvatar: "/placeholder.svg?height=40&width=40",
            reactions: [],
        },
        {
            id: "2",
            content: "I've finished the backend implementation. Just need to test it.",
            timestamp: "9:32 AM",
            sender: "me",
            reactions: [],
        },
        {
            id: "3",
            content: "Great! I'm still working on the UI components. Should be done by EOD.",
            timestamp: "9:35 AM",
            sender: "other",
            senderName: "Sarah Johnson",
            senderAvatar: "/placeholder.svg?height=40&width=40",
            reactions: [],
        },
        {
            id: "4",
            content: "I just pushed some updates to the repo. Can you all pull and check if it works on your end?",
            timestamp: "9:40 AM",
            sender: "other",
            senderName: "Alex Thompson",
            senderAvatar: "/placeholder.svg?height=40&width=40",
            reactions: [],
        },
        {
            id: "5",
            content: "Will do! I'll check it after lunch.",
            timestamp: "9:42 AM",
            sender: "me",
            reactions: [],
        },
    ])

    const handleSendMessage = (content: string, files?: File[], replyToId?: string) => {
        // Find the message being replied to
        const replyMessage = replyToId ? messages.find((m) => m.id === replyToId) : null

        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "me",
            reactions: [],
            files: files?.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file),
            })),
        }

        // Add reply information if replying to a message
        if (replyMessage) {
            newMessage.replyTo = {
                id: replyMessage.id,
                content: replyMessage.content,
                senderName: replyMessage.senderName,
            }
        }

        setMessages([...messages, newMessage])
        setReplyToMessage(null) // Clear reply state after sending

        // Add a system message about new message
        if (files?.length) {
            const systemMessage = {
                id: Date.now().toString() + "-system",
                content: `You shared ${files.length} file${files.length > 1 ? "s" : ""}`,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                sender: "system",
                isSystemMessage: true,
            }
            setMessages((prev) => [...prev, systemMessage])
        }
    }

    const handleReactionAdd = (messageId: string, emoji: string) => {
        setMessages(
            messages.map((message) => {
                if (message.id === messageId) {
                    // Check if user already reacted with this emoji
                    const existingReactionIndex = message.reactions?.findIndex(
                        (r) => r.emoji === emoji && r.userId === "current-user",
                    )

                    if (existingReactionIndex !== undefined && existingReactionIndex >= 0) {
                        // Remove the reaction if it already exists
                        const updatedReactions = [...(message.reactions || [])]
                        updatedReactions.splice(existingReactionIndex, 1)
                        return { ...message, reactions: updatedReactions }
                    } else {
                        // Add the new reaction
                        return {
                            ...message,
                            reactions: [
                                ...(message.reactions || []),
                                {
                                    emoji,
                                    userId: "current-user",
                                    userName: "You",
                                },
                            ],
                        }
                    }
                }
                return message
            }),
        )
    }

    const handleReplyMessage = (messageId: string) => {
        const messageToReply = messages.find((m) => m.id === messageId)
        if (messageToReply) {
            setReplyToMessage(messageToReply)
        }
    }

    const handleAddMembers = async (selectedUsers: any[]) => {
        setIsAddingMembers(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Add the new members to the group
        const newMembers = selectedUsers.map((user) => ({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: "Member",
            online: user.online,
        }))

        setGroup((prev) => ({
            ...prev,
            members: [...prev.members, ...newMembers],
        }))

        // Add a system message about new members
        const newMemberNames = selectedUsers.map((user) => user.name).join(", ")
        const systemMessage = {
            id: Date.now().toString(),
            content: `You added ${newMemberNames} to the group`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "system",
            isSystemMessage: true,
        }

        setMessages((prev) => [...prev, systemMessage])
        setIsAddingMembers(false)

        // Close the info sheet after adding members
        if (isSheetOpen) {
            setTimeout(() => setIsSheetOpen(false), 500)
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                    <UserAvatar src={group.avatar} alt={group.name} />
                    <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs text-muted-foreground">
                            {group.members.length} members • {group.members.filter((m) => m.online).length} online
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Group info">
                                <Info className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="flex flex-col items-center py-4">
                                <UserAvatar src={group.avatar} alt={group.name} size="lg" />
                                <h2 className="mt-2 text-xl font-bold">{group.name}</h2>
                                <p className="text-center text-sm text-muted-foreground">{group.description}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <h3 className="text-sm font-medium">Members ({group.members.length})</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => setAddMemberOpen(true)}
                                    disabled={isAddingMembers}
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Add
                                </Button>
                            </div>
                            <ScrollArea className="h-[300px]">
                                {group.members.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <UserAvatar src={member.avatar} alt={member.name} size="sm" />
                                                {member.online && (
                                                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {member.name} {member.id === "1" && "(You)"}
                                                </div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                    {member.role === "Admin" && <Shield className="h-3 w-3" />}
                                                    {member.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <MessageList messages={messages} isGroup onReactionAdd={handleReactionAdd} onReplyMessage={handleReplyMessage} />
            <ChatInput
                onSendMessage={handleSendMessage}
                replyTo={replyToMessage}
                onCancelReply={() => setReplyToMessage(null)}
            />

            <AddMemberDialog
                open={addMemberOpen}
                onOpenChange={setAddMemberOpen}
                existingMemberIds={group.members.map((member) => member.id)}
                onAddMembers={handleAddMembers}
            />
        </div>
    )
}

export default GroupChatView;