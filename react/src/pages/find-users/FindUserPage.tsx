import UserDiscovery from "@/components/find-users/UserDiscovery";

function FindUserPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b p-4">
                <h1 className="text-2xl font-bold">Find Users</h1>
                <p className="text-sm text-muted-foreground">Connect with other users on the platform</p>
            </div>
            <UserDiscovery />
        </div>
    );
}

export default FindUserPage;