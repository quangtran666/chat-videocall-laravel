import {useState} from "react"
import FriendSearch from "@/components/friend/FriendSearch.tsx";
import useDebounce from "@/hooks/useDebounce.ts";
import FriendsTab from "@/components/friend/FriendsTab.tsx";

// Todo: Implement online friend feature later
export function FriendDisplay() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    return (
        <>
            <FriendSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <FriendsTab
                debouncedSearchQuery={debouncedSearchQuery}
            />
        </>
    )
}

export default FriendDisplay;