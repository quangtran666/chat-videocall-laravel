import ProfileSettings from "@/components/settings/ProfileSettings";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Bell, Palette, Shield, User } from "lucide-react";
import {useState} from "react";
import NotificationSettings from "@/components/settings/NotificationSettings.tsx";
import PrivacySettings from "@/components/settings/PrivacySettings.tsx";
import DisplaySettings from "@/components/settings/DisplaySettings.tsx";

function SettingPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        {
            id: 'profile',
            label: 'Profile',
            icon: User,
            component: ProfileSettings,
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            component: NotificationSettings,
        },
        {
            id: 'privacy',
            label: 'Privacy',
            icon: Shield,
            component: PrivacySettings,
        },
        {
            id: 'display',
            label: 'Display',
            icon: Palette,
            component: DisplaySettings,
        },
    ]

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center border-b p-4">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage your account preferences</p>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <Tabs
                    defaultValue="profile"
                    className="flex flex-1 flex-col md:flex-row"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <div className="border-b border-r-0 md:border-b-0 md:border-r">
                        <TabsList className="h-auto flex w-full flex-row justify-start md:flex-col md:space-x-0 md:space-y-1 p-2">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="flex items-center justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                                >
                                    <tab.icon className="h-4 w-4" />
                                    <span className="sr-only">{tab.label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-auto p-4 md:p-6">
                        {tabs.map((tab) => (
                            <TabsContent key={tab.id} value={tab.id} className="h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold">{tab.label}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {tab.id === "profile" && "Manage your personal information"}
                                        {tab.id === "notifications" && "Control how you receive notifications"}
                                        {tab.id === "privacy" && "Manage your privacy and security settings"}
                                        {tab.id === "display" && "Customize your chat appearance"}
                                    </p>
                                </div>
                                <Separator className="mb-6" />
                                <tab.component />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}

export default SettingPage;