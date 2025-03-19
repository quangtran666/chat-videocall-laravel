import {useEffect, useState } from "react"
import { toast } from "sonner"
import * as React from "react";
import { Card, CardContent } from "../ui/card";
import {Label } from "../ui/label";
import { Slider } from "../ui/slider";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";

function DisplaySettings() {
    // const { theme, setTheme } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [displaySettings, setDisplaySettings] = useState({
        fontSize: 16,
        messageAlignment: "default",
        compactMode: false,
        showAvatars: true,
        showTimestamps: true,
        showEmojis: true,
        animateEmojis: true,
        reducedMotion: false,
        highContrastMode: false,
    })

    // Ensure theme component is mounted before accessing theme
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSliderChange = (name: string) => (value: number[]) => {
        setDisplaySettings((prev) => ({ ...prev, [name]: value[0] }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setDisplaySettings((prev) => ({ ...prev, [name]: checked }))
    }

    const handleRadioChange = (name: string, value: string) => {
        setDisplaySettings((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast("Display settings updated")
        }, 1500)
    }

    if (!mounted) {
        return null
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/*<Card>*/}
            {/*    <CardContent className="p-6">*/}
            {/*        <div className="space-y-4">*/}
            {/*            <h3 className="text-base font-medium">Theme</h3>*/}

            {/*            <div className="grid grid-cols-3 gap-4">*/}
            {/*                <div*/}
            {/*                    className={`flex cursor-pointer flex-col items-center rounded-md border p-4 hover:bg-accent ${theme === "light" ? "border-primary bg-accent" : ""}`}*/}
            {/*                    onClick={() => setTheme("light")}*/}
            {/*                >*/}
            {/*                    <div className="mb-2 rounded-full bg-primary/10 p-2">*/}
            {/*                        <Sun className="h-5 w-5" />*/}
            {/*                    </div>*/}
            {/*                    <span className="text-sm font-medium">Light</span>*/}
            {/*                </div>*/}

            {/*                <div*/}
            {/*                    className={`flex cursor-pointer flex-col items-center rounded-md border p-4 hover:bg-accent ${theme === "dark" ? "border-primary bg-accent" : ""}`}*/}
            {/*                    onClick={() => setTheme("dark")}*/}
            {/*                >*/}
            {/*                    <div className="mb-2 rounded-full bg-primary/10 p-2">*/}
            {/*                        <Moon className="h-5 w-5" />*/}
            {/*                    </div>*/}
            {/*                    <span className="text-sm font-medium">Dark</span>*/}
            {/*                </div>*/}

            {/*                <div*/}
            {/*                    className={`flex cursor-pointer flex-col items-center rounded-md border p-4 hover:bg-accent ${theme === "system" ? "border-primary bg-accent" : ""}`}*/}
            {/*                    onClick={() => setTheme("system")}*/}
            {/*                >*/}
            {/*                    <div className="mb-2 rounded-full bg-primary/10 p-2">*/}
            {/*                        <Monitor className="h-5 w-5" />*/}
            {/*                    </div>*/}
            {/*                    <span className="text-sm font-medium">System</span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-medium">Text</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="font-size">Font Size: {displaySettings.fontSize}px</Label>
                                </div>
                                <Slider
                                    id="font-size"
                                    min={12}
                                    max={24}
                                    step={1}
                                    value={[displaySettings.fontSize]}
                                    onValueChange={handleSliderChange("fontSize")}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Small</span>
                                    <span>Default</span>
                                    <span>Large</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Message Alignment</Label>
                                <RadioGroup
                                    value={displaySettings.messageAlignment}
                                    onValueChange={(value) => handleRadioChange("messageAlignment", value)}
                                    className="grid grid-cols-3 gap-2"
                                >
                                    <div className="flex flex-col items-center space-y-1">
                                        <div className="flex h-20 w-full flex-col items-start justify-center rounded-md border p-2">
                                            <div className="h-2 w-16 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-24 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-20 rounded-full bg-muted"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="alignment-default" />
                                            <Label htmlFor="alignment-default">Default</Label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center space-y-1">
                                        <div className="flex h-20 w-full flex-col items-center justify-center rounded-md border p-2">
                                            <div className="h-2 w-16 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-24 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-20 rounded-full bg-muted"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="centered" id="alignment-centered" />
                                            <Label htmlFor="alignment-centered">Centered</Label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center space-y-1">
                                        <div className="flex h-20 w-full flex-col items-end justify-center rounded-md border p-2">
                                            <div className="h-2 w-16 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-24 rounded-full bg-muted"></div>
                                            <div className="mt-1 h-2 w-20 rounded-full bg-muted"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="alignment-compact" />
                                            <Label htmlFor="alignment-compact">Compact</Label>
                                        </div>
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
                        <h3 className="text-base font-medium">Chat Interface</h3>

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="compact-mode">Compact Mode</Label>
                                    <p className="text-sm text-muted-foreground">Reduce spacing between messages</p>
                                </div>
                                <Switch
                                    id="compact-mode"
                                    checked={displaySettings.compactMode}
                                    onCheckedChange={handleSwitchChange("compactMode")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="show-avatars">Show Avatars</Label>
                                    <p className="text-sm text-muted-foreground">Display user avatars in chat</p>
                                </div>
                                <Switch
                                    id="show-avatars"
                                    checked={displaySettings.showAvatars}
                                    onCheckedChange={handleSwitchChange("showAvatars")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="show-timestamps">Show Timestamps</Label>
                                    <p className="text-sm text-muted-foreground">Display message timestamps</p>
                                </div>
                                <Switch
                                    id="show-timestamps"
                                    checked={displaySettings.showTimestamps}
                                    onCheckedChange={handleSwitchChange("showTimestamps")}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-medium">Accessibility</h3>

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                                    <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                                </div>
                                <Switch
                                    id="reduced-motion"
                                    checked={displaySettings.reducedMotion}
                                    onCheckedChange={handleSwitchChange("reducedMotion")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                                </div>
                                <Switch
                                    id="high-contrast"
                                    checked={displaySettings.highContrastMode}
                                    onCheckedChange={handleSwitchChange("highContrastMode")}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Display Settings
                </Button>
            </div>
        </form>
    );
}

export default DisplaySettings;