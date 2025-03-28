import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

type FriendSearchProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

function FriendSearch({ searchQuery, setSearchQuery }: FriendSearchProps) {
    return (
        <div className="p-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search friends..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
}

export default FriendSearch;