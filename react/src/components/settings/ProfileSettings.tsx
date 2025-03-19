import { useState } from "react"
import { toast } from "sonner"
import * as React from "react";
import { UserAvatar } from "../utils/UserAvatar";
import {Camera, Loader2} from "lucide-react";
import {Label} from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import {Input} from "@/components/ui/input.tsx";

function ProfileSettings() {
    const [isLoading, setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "Your Name",
        username: "yourname",
        email: "your.email@example.com",
        bio: "Frontend developer passionate about creating beautiful user interfaces.",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileData((prev) => ({ ...prev, avatar: event.target.result as string }))
                }
            }

            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast("Profile updated")
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <UserAvatar src={profileData.avatar} alt={profileData.name} size="lg" className="h-24 w-24" />
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                            >
                                <Camera className="h-4 w-4" />
                                <span className="sr-only">Upload avatar</span>
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </div>
                        <div className="text-center">
                            <p className="font-medium">{profileData.name}</p>
                            <p className="text-sm text-muted-foreground">@{profileData.username}</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="flex">
                  <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                    @
                  </span>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={profileData.username}
                                        onChange={handleInputChange}
                                        className="rounded-l-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={profileData.email} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows={4} />
                            <p className="text-xs text-muted-foreground">
                                Brief description for your profile. Maximum 160 characters.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>

            <Separator />

            <div>
                <h3 className="mb-4 text-lg font-medium">Account Management</h3>
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium">Change Password</h4>
                                <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
                                <Button variant="outline" className="mt-2">
                                    Change Password
                                </Button>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-medium text-destructive">Delete Account</h4>
                                <p className="text-sm text-muted-foreground">Permanently delete your account and all of your data</p>
                                <Button variant="destructive" className="mt-2">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProfileSettings;