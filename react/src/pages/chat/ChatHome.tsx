import ChatList from "@/components/chat/ChatList.tsx";

function ChatHome() {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b p-4">
                <h1 className="text-2xl font-bold">Chats</h1>
                <p className="text-sm text-muted-foreground">Start a conversation or continue where you left off</p>
            </div>
            <ChatList />
        </div>
    );
}

export default ChatHome;