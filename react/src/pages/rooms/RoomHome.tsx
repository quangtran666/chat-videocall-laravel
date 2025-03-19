import RoomDiscovery from "@/components/room/RoomDiscovery";

function RoomHome() {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b p-4">
                <h1 className="text-2xl font-bold">Rooms</h1>
                <p className="text-sm text-muted-foreground">Discover and join chat rooms</p>
            </div>
            <RoomDiscovery />
        </div>
    );
}

export default RoomHome;