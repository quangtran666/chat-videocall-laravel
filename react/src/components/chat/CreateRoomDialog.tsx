import {FormEvent, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../ui/dialog";
import { Label } from "../ui/label";
import {Input} from "@/components/ui/input.tsx";
import { Switch } from "../ui/switch";
import {Button} from "@/components/ui/button.tsx";

interface CreateRoomDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Convert to React Hook Form or Shadcn Form
function CreateRoomDialog({ open, onOpenChange }: CreateRoomDialogProps) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [roomName, setRoomName] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        console.log(e);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create a new room</DialogTitle>
                        <DialogDescription>Create a room to chat with multiple people at once.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Room name</Label>
                            <Input
                                id="name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Enter room name"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="private">Private room</Label>
                                <div className="text-xs text-muted-foreground">Only invited members can join</div>
                            </div>
                            <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateRoomDialog;