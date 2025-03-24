import {FormEvent, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../ui/dialog";
import { Label } from "../ui/label";
import {Input} from "@/components/ui/input.tsx";
import { Switch } from "../ui/switch";
import {Button} from "@/components/ui/button.tsx";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {Check, ChevronsUpDown, X} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import { Badge } from "../ui/badge";
import {CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command} from "@/components/ui/command.tsx";

interface CreateRoomDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Sample tags - replace with your actual tags
const availableTags = [
    { value: "general", label: "General" },
    { value: "tech", label: "Technology" },
    { value: "gaming", label: "Gaming" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "art", label: "Art" },
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
]

export function CreateRoomDialog({ open, onOpenChange }: CreateRoomDialogProps) {
    const [isPrivate, setIsPrivate] = useState(false)
    const [roomName, setRoomName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [commandOpen, setCommandOpen] = useState(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log({
            roomName,
            description,
            isPrivate,
            tags: selectedTags,
        })
        // Add your submission logic here
        onOpenChange(false)
    }

    function removeTag(tag: string) {
        setSelectedTags((prev) => prev.filter((t) => t !== tag))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
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
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this room is about"
                                rows={3}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Tags</Label>
                            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={commandOpen} className="justify-between">
                                        Select tags
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Search tags..." />
                                        <CommandList>
                                            <CommandEmpty>No tag found.</CommandEmpty>
                                            <CommandGroup>
                                                {availableTags.map((tag, index) => (
                                                    <CommandItem
                                                        key={index}
                                                        value={tag.value}
                                                        onSelect={(currentValue) => {
                                                            setSelectedTags((prev) =>
                                                                prev.includes(currentValue)
                                                                    ? prev.filter((t) => t !== currentValue)
                                                                    : [...prev, currentValue],
                                                            )
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedTags.includes(tag.value) ? "opacity-100" : "opacity-0",
                                                            )}
                                                        />
                                                        {tag.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {selectedTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedTags.map((tag, index) => {
                                        const tagLabel = availableTags.find((t) => t.value === tag)?.label || tag
                                        return (
                                            <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                                                {tagLabel}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeTag(tag)
                                                    }}
                                                    className="h-3 w-3 flex items-center justify-center rounded-full hover:bg-muted"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            )}
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
    )
}

export default CreateRoomDialog;