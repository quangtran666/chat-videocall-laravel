import {useLogout} from "@/hooks/useAuth.ts";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2, LogOut} from "lucide-react";
import {useUser} from "@/hooks/useUser.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

function UserProfile() {
    const logoutMutation = useLogout();
    const { data: user, isPending } = useUser();

    if (isPending) return null;

    return (
        <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-3">
                <UserAvatar src={user?.avatar_url} alt={user?.name} />
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="text-sm font-medium truncate max-w-[120px]">{user?.name || "User"}</div>
                            </TooltipTrigger>
                            <TooltipContent side="top">{user?.name}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="text-xs text-muted-foreground">Online</div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    aria-label="Log out"
                    onClick={() => logoutMutation.mutate()}
                >
                    { logoutMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" /> }
                </Button>
            </div>
        </div>
    );
}

export default UserProfile;