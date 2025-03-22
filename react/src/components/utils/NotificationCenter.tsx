import {CheckCircle2, XCircle, AlertTriangle, Info, Bell, Clock, ArrowLeft, Search, Filter} from "lucide-react"
import {useEffect, useState } from "react"
import { Button } from "../ui/button.tsx"
import { Badge } from "../ui/badge.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import { cn } from "@/lib/utils.ts"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog.tsx"
import { Input } from "../ui/input.tsx"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu.tsx"

export interface Notification {
    id: string
    title: string
    message: string
    timestamp: Date
    read: boolean
    type: "info" | "success" | "error" | "warning"
    actionUrl?: string
    actionLabel?: string
}

interface NotificationCenterProps {
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
}

// Helper function for notification icons
const getNotificationIcon = (type: string) => {
    switch (type) {
        case "success":
            return <CheckCircle2 className="h-5 w-5 text-green-500" />
        case "error":
            return <XCircle className="h-5 w-5 text-red-500" />
        case "warning":
            return <AlertTriangle className="h-5 w-5 text-amber-500" />
        default:
            return <Info className="h-5 w-5 text-blue-500" />
    }
}

export function NotificationCenter({ notifications, onMarkAsRead}: NotificationCenterProps) {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<string | null>(null)

    const unreadCount = notifications.filter((n) => !n.read).length

    // Filter notifications based on search and type filter
    const filteredNotifications = notifications.filter((notification) => {
        const matchesSearch =
            searchQuery === "" ||
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFilter = filterType === null || notification.type === filterType

        return matchesSearch && matchesFilter
    })

    // Get notifications for the active tab
    const allTabNotifications = filteredNotifications
    const unreadTabNotifications = filteredNotifications.filter((n) => !n.read)

    // Auto-close when all notifications are read
    useEffect(() => {
        if (open && unreadCount === 0 && notifications.length === 0) {
            setOpen(false)
        }
    }, [open, unreadCount, notifications.length])

    // Reset filters when dialog closes
    useEffect(() => {
        if (!open) {
            setSearchQuery("")
            setFilterType(null)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-1 -top-1 h-5 min-w-5 px-1 flex items-center justify-center animate-pulse"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 h-[85vh] max-h-[700px] flex flex-col">
                <DialogHeader className="px-4 py-3 border-b sticky top-0 z-10 bg-background">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Bell className="h-5 w-5" />
                            Notifications
                            {unreadCount > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {unreadCount} unread
                                </Badge>
                            )}
                        </DialogTitle>
                        <div className="flex gap-1">
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search notifications..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setFilterType(null)}>All types</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType("info")}>
                                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                                    Information
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType("success")}>
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                    Success
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType("warning")}>
                                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                    Warning
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterType("error")}>
                                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                    Error
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 border-b">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="all">
                                All
                                {filteredNotifications.length > 0 && (
                                    <Badge variant="secondary" className="ml-1">
                                        {filteredNotifications.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="unread">
                                Unread
                                {unreadTabNotifications.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                                        {unreadTabNotifications.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <TabsContent value="all" className="h-full m-0 data-[state=active]:block overflow-hidden">
                            <NotificationList
                                notifications={allTabNotifications}
                                onMarkAsRead={onMarkAsRead}
                                emptyMessage="No notifications found"
                                emptyDescription={
                                    searchQuery || filterType ? "Try adjusting your search or filters" : "You're all caught up!"
                                }
                            />
                        </TabsContent>

                        <TabsContent value="unread" className="h-full m-0 data-[state=active]:block overflow-hidden">
                            <NotificationList
                                notifications={unreadTabNotifications}
                                onMarkAsRead={onMarkAsRead}
                                emptyMessage="No unread notifications"
                                emptyDescription={
                                    searchQuery || filterType ? "Try adjusting your search or filters" : "You're all caught up!"
                                }
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

interface NotificationListProps {
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
    emptyMessage: string
    emptyDescription: string
}

function NotificationList({ notifications, onMarkAsRead, emptyMessage, emptyDescription }: NotificationListProps) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="bg-muted/30 rounded-full p-3 mb-3">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-lg">{emptyMessage}</p>
                <p className="text-sm text-muted-foreground mt-1">{emptyDescription}</p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-full w-full">
            <div className="divide-y">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={cn(
                            "p-4 transition-colors hover:bg-muted/20 cursor-pointer relative",
                            notification.read ? "bg-background" : "bg-primary/5",
                        )}
                        onClick={() => !notification.read && onMarkAsRead(notification.id)}
                    >
                        <div className="flex gap-3">
                            <div
                                className={cn(
                                    "mt-0.5 rounded-full p-1.5 flex-shrink-0",
                                    notification.type === "success" && "bg-green-50 dark:bg-green-950/30",
                                    notification.type === "error" && "bg-red-50 dark:bg-red-950/30",
                                    notification.type === "warning" && "bg-amber-50 dark:bg-amber-950/30",
                                    notification.type === "info" && "bg-blue-50 dark:bg-blue-950/30",
                                )}
                            >
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="font-medium">{notification.title}</div>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </span>
                                    {notification.actionUrl && notification.actionLabel && (
                                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-full" asChild>
                                            <a href={notification.actionUrl}>{notification.actionLabel}</a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {!notification.read && (
                                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary animate-pulse" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default NotificationCenter;