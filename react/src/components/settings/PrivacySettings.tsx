import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import {Label } from "../ui/label";
import {RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {Loader2, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../utils/UserAvatar";
import { Button } from "../ui/button";

function PrivacySettings() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [privacySettings, setPrivacySettings] = useState({
        onlineStatus: "everyone",
        lastSeen: "contacts",
        readReceipts: true,
        typing: true,
        profileVisibility: "everyone",
        allowFriendRequests: "everyone",
        allowGroupInvites: "contacts",
    })

    const [blockedUsers, setBlockedUsers] = useState([
        { id: "1", name: "John Doe", username: "@johndoe", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "2", name: "Jane Smith", username: "@janesmith", avatar: "/placeholder.svg?height=40&width=40" },
    ])

    const handleRadioChange = (name: string, value: string) => {
        setPrivacySettings((prev) => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setPrivacySettings((prev) => ({ ...prev, [name]: checked }))
    }

    const handleUnblockUser = (userId: string) => {
        setBlockedUsers((prev) => prev.filter((user) => user.id !== userId))
        toast("User unblocked")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast("Privacy settings updated")
        }, 1500)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-medium">Visibility</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Who can see my online status</Label>
                                <RadioGroup
                                    value={privacySettings.onlineStatus}
                                    onValueChange={(value) => handleRadioChange("onlineStatus", value)}
                                    className="grid gap-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="everyone" id="online-everyone" />
                                        <Label htmlFor="online-everyone">Everyone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="contacts" id="online-contacts" />
                                        <Label htmlFor="online-contacts">Contacts only</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="nobody" id="online-nobody" />
                                        <Label htmlFor="online-nobody">Nobody</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Who can see my last seen</Label>
                                <RadioGroup
                                    value={privacySettings.lastSeen}
                                    onValueChange={(value) => handleRadioChange("lastSeen", value)}
                                    className="grid gap-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="everyone" id="last-seen-everyone" />
                                        <Label htmlFor="last-seen-everyone">Everyone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="contacts" id="last-seen-contacts" />
                                        <Label htmlFor="last-seen-contacts">Contacts only</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="nobody" id="last-seen-nobody" />
                                        <Label htmlFor="last-seen-nobody">Nobody</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Who can see my profile</Label>
                                <RadioGroup
                                    value={privacySettings.profileVisibility}
                                    onValueChange={(value) => handleRadioChange("profileVisibility", value)}
                                    className="grid gap-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="everyone" id="profile-everyone" />
                                        <Label htmlFor="profile-everyone">Everyone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="contacts" id="profile-contacts" />
                                        <Label htmlFor="profile-contacts">Contacts only</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-medium">Chat Privacy</h3>

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="read-receipts">Read Receipts</Label>
                                    <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                                </div>
                                <Switch
                                    id="read-receipts"
                                    checked={privacySettings.readReceipts}
                                    onCheckedChange={handleSwitchChange("readReceipts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="typing-indicator">Typing Indicator</Label>
                                    <p className="text-sm text-muted-foreground">Let others see when you're typing</p>
                                </div>
                                <Switch
                                    id="typing-indicator"
                                    checked={privacySettings.typing}
                                    onCheckedChange={handleSwitchChange("typing")}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Who can send me friend requests</Label>
                            <RadioGroup
                                value={privacySettings.allowFriendRequests}
                                onValueChange={(value) => handleRadioChange("allowFriendRequests", value)}
                                className="grid gap-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="everyone" id="requests-everyone" />
                                    <Label htmlFor="requests-everyone">Everyone</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="contacts" id="requests-contacts" />
                                    <Label htmlFor="requests-contacts">Contacts of contacts</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nobody" id="requests-nobody" />
                                    <Label htmlFor="requests-nobody">Nobody</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label>Who can add me to groups</Label>
                            <RadioGroup
                                value={privacySettings.allowGroupInvites}
                                onValueChange={(value) => handleRadioChange("allowGroupInvites", value)}
                                className="grid gap-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="everyone" id="groups-everyone" />
                                    <Label htmlFor="groups-everyone">Everyone</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="contacts" id="groups-contacts" />
                                    <Label htmlFor="groups-contacts">Contacts only</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nobody" id="groups-nobody" />
                                    <Label htmlFor="groups-nobody">Nobody</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-medium">Blocked Users</h3>
                        <p className="text-sm text-muted-foreground">Blocked users cannot message you or add you to groups</p>

                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users to block..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="rounded-md border">
                            {blockedUsers.length > 0 ? (
                                <ScrollArea className="h-[200px]">
                                    <div className="p-4">
                                        {blockedUsers.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between py-2">
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar src={user.avatar} alt={user.name} size="sm" />
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-xs text-muted-foreground">{user.username}</div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => handleUnblockUser(user.id)}>
                                                    <X className="mr-1 h-4 w-4" />
                                                    Unblock
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <p>No blocked users</p>
                                        <p className="text-xs">Search for users to block them</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Privacy Settings
                </Button>
            </div>
        </form>
    );
}

export default PrivacySettings;