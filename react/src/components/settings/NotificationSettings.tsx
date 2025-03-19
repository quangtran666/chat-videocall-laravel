import { toast } from "sonner";
import {useState} from "react";
import { Card, CardContent } from "../ui/card";
import {Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import {Loader2, Volume1, Volume2, VolumeX } from "lucide-react";
import {RadioGroup, RadioGroupItem } from "../ui/radio-group";

function NotificationSettings() {
    const [isLoading, setIsLoading] = useState(false)
    const [notificationSettings, setNotificationSettings] = useState({
        enableNotifications: true,
        messageNotifications: true,
        groupNotifications: true,
        mentionNotifications: true,
        friendRequestNotifications: true,
        soundEnabled: true,
        soundVolume: "medium",
        notificationSound: "chime",
        desktopNotifications: true,
        emailNotifications: false,
        emailDigest: "weekly",
    })

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
    }

    const handleSelectChange = (name: string) => (value: string) => {
        setNotificationSettings((prev) => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (name: string, value: string) => {
        setNotificationSettings((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast("Notification settings updated")
        }, 1500)
    }

    const playNotificationSound = () => {
        // In a real app, this would play the actual notification sound
        toast("Sound preview")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="enable-notifications" className="text-base">
                                    Enable Notifications
                                </Label>
                                <p className="text-sm text-muted-foreground">Master control for all notifications</p>
                            </div>
                            <Switch
                                id="enable-notifications"
                                checked={notificationSettings.enableNotifications}
                                onCheckedChange={handleSwitchChange("enableNotifications")}
                            />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Notification Types</h3>

                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="message-notifications">Direct Messages</Label>
                                    <Switch
                                        id="message-notifications"
                                        checked={notificationSettings.messageNotifications && notificationSettings.enableNotifications}
                                        onCheckedChange={handleSwitchChange("messageNotifications")}
                                        disabled={!notificationSettings.enableNotifications}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="group-notifications">Group Messages</Label>
                                    <Switch
                                        id="group-notifications"
                                        checked={notificationSettings.groupNotifications && notificationSettings.enableNotifications}
                                        onCheckedChange={handleSwitchChange("groupNotifications")}
                                        disabled={!notificationSettings.enableNotifications}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="mention-notifications">Mentions</Label>
                                    <Switch
                                        id="mention-notifications"
                                        checked={notificationSettings.mentionNotifications && notificationSettings.enableNotifications}
                                        onCheckedChange={handleSwitchChange("mentionNotifications")}
                                        disabled={!notificationSettings.enableNotifications}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="friend-request-notifications">Friend Requests</Label>
                                    <Switch
                                        id="friend-request-notifications"
                                        checked={
                                            notificationSettings.friendRequestNotifications && notificationSettings.enableNotifications
                                        }
                                        onCheckedChange={handleSwitchChange("friendRequestNotifications")}
                                        disabled={!notificationSettings.enableNotifications}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="sound-enabled" className="text-base">
                                    Sound Notifications
                                </Label>
                                <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                            </div>
                            <Switch
                                id="sound-enabled"
                                checked={notificationSettings.soundEnabled && notificationSettings.enableNotifications}
                                onCheckedChange={handleSwitchChange("soundEnabled")}
                                disabled={!notificationSettings.enableNotifications}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="grid gap-2">
                                <Label htmlFor="notification-sound">Notification Sound</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={notificationSettings.notificationSound}
                                        onValueChange={handleSelectChange("notificationSound")}
                                        disabled={!notificationSettings.soundEnabled || !notificationSettings.enableNotifications}
                                    >
                                        <SelectTrigger id="notification-sound" className="flex-1">
                                            <SelectValue placeholder="Select a sound" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="chime">Chime</SelectItem>
                                            <SelectItem value="bell">Bell</SelectItem>
                                            <SelectItem value="ping">Ping</SelectItem>
                                            <SelectItem value="pop">Pop</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={playNotificationSound}
                                        disabled={!notificationSettings.soundEnabled || !notificationSettings.enableNotifications}
                                    >
                                        <Volume1 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Volume</Label>
                                <RadioGroup
                                    value={notificationSettings.soundVolume}
                                    onValueChange={(value) => handleRadioChange("soundVolume", value)}
                                    className="flex space-x-4"
                                    disabled={!notificationSettings.soundEnabled || !notificationSettings.enableNotifications}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="low" id="volume-low" />
                                        <Label htmlFor="volume-low" className="flex items-center">
                                            <VolumeX className="mr-1 h-4 w-4" /> Low
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="medium" id="volume-medium" />
                                        <Label htmlFor="volume-medium" className="flex items-center">
                                            <Volume1 className="mr-1 h-4 w-4" /> Medium
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="high" id="volume-high" />
                                        <Label htmlFor="volume-high" className="flex items-center">
                                            <Volume2 className="mr-1 h-4 w-4" /> High
                                        </Label>
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
                        <h3 className="text-base font-medium">Delivery Methods</h3>

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
                                </div>
                                <Switch
                                    id="desktop-notifications"
                                    checked={notificationSettings.desktopNotifications && notificationSettings.enableNotifications}
                                    onCheckedChange={handleSwitchChange("desktopNotifications")}
                                    disabled={!notificationSettings.enableNotifications}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={notificationSettings.emailNotifications && notificationSettings.enableNotifications}
                                    onCheckedChange={handleSwitchChange("emailNotifications")}
                                    disabled={!notificationSettings.enableNotifications}
                                />
                            </div>

                            <div className="grid gap-2 pl-6">
                                <Label htmlFor="email-digest">Email Digest Frequency</Label>
                                <Select
                                    value={notificationSettings.emailDigest}
                                    onValueChange={handleSelectChange("emailDigest")}
                                    disabled={!notificationSettings.emailNotifications || !notificationSettings.enableNotifications}
                                >
                                    <SelectTrigger id="email-digest">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="never">Never</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Preferences
                </Button>
            </div>
        </form>
    );
}

export default NotificationSettings;