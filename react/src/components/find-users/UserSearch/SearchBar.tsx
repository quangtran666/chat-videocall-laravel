import { Search } from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
        <div className="px-4 pb-2 shrink-0">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name, username, or bio..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                />
            </div>
        </div>
    );
}

export default SearchBar;