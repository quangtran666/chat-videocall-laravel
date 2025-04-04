import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {memo} from "react";

interface UserAvatarProps {
    src: string | null | undefined;
    alt: string | null | undefined;
    className?: string
    size?: "sm" | "md" | "lg"
}

export const UserAvatar = memo(function UserAvatar({ src, alt, className, size = "md" }: UserAvatarProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
    }

    const initials = alt?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

    return (
        <Avatar className={cn(sizeClasses[size], className)}>
            <AvatarImage src={src || ""} alt={alt || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
})