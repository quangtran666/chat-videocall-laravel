import {Globe, Search, Lock, Users} from "lucide-react";
import {useState} from "react";
import { Input } from "../ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router";

function RoomDiscovery() {
    const [searchQuery, setSearchQuery] = useState("")

    const rooms = [
        {
            id: "1",
            name: "Tech Discussion",
            description: "Talk about the latest in technology",
            members: 128,
            category: "Technology",
            isPrivate: false,
            joined: true,
        },
        {
            id: "2",
            name: "Gaming Lounge",
            description: "For gamers to connect and chat",
            members: 256,
            category: "Gaming",
            isPrivate: false,
            joined: false,
        },
        {
            id: "3",
            name: "Book Club",
            description: "Discuss your favorite books",
            members: 64,
            category: "Books",
            isPrivate: false,
            joined: true,
        },
        {
            id: "4",
            name: "Design Team",
            description: "Private room for design team members",
            members: 12,
            category: "Design",
            isPrivate: true,
            joined: true,
        },
        {
            id: "5",
            name: "Music Lovers",
            description: "Share and discuss music",
            members: 189,
            category: "Music",
            isPrivate: false,
            joined: false,
        },
        {
            id: "6",
            name: "Fitness Group",
            description: "Tips and motivation for fitness",
            members: 97,
            category: "Health",
            isPrivate: false,
            joined: false,
        },
    ]

    const filteredRooms = rooms.filter(
        (room) =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const joinedRooms = filteredRooms.filter((room) => room.joined)
    const discoverRooms = filteredRooms.filter((room) => !room.joined)

    return (
        <div className="flex h-full flex-col">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search rooms..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <Tabs defaultValue="discover" className="flex-1">
                <div className="border-b px-4">
                    <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                        <TabsTrigger
                            value="discover"
                            className="border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Discover
                        </TabsTrigger>
                        <TabsTrigger
                            value="joined"
                            className="border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Joined ({joinedRooms.length})
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="discover" className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-13rem)]">
                        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                            {discoverRooms.map((room) => (
                                <div key={room.id} className="rounded-lg border p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{room.name}</h3>
                                                {room.isPrivate ? (
                                                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                                ) : (
                                                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <Badge variant="outline" className="mt-1">
                                                {room.category}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Users className="mr-1 h-3.5 w-3.5" />
                                            {room.members}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>
                                    <div className="mt-4">
                                        <Button size="sm" className="w-full">
                                            Join Room
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="joined" className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-13rem)]">
                        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                            {joinedRooms.map((room) => (
                                <Link key={room.id} to={`/rooms/${room.id}`}>
                                    <div className="rounded-lg border p-4 transition-colors hover:bg-accent">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{room.name}</h3>
                                                    {room.isPrivate ? (
                                                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    ) : (
                                                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <Badge variant="outline" className="mt-1">
                                                    {room.category}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Users className="mr-1 h-3.5 w-3.5" />
                                                {room.members}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default RoomDiscovery;