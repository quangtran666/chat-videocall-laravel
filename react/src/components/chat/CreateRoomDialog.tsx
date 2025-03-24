import {useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../ui/dialog";
import {Input} from "@/components/ui/input.tsx";
import { Switch } from "../ui/switch";
import {Button} from "@/components/ui/button.tsx";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {Check, ChevronsUpDown, X} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import { Badge } from "../ui/badge";
import {CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command} from "@/components/ui/command.tsx";
import {useForm} from "react-hook-form";
import {RoomSchema, RoomType} from "@/types/room/Room.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useUser} from "@/hooks/useUser.ts";

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
    // const { data: user } = useUser();
    const [commandOpen, setCommandOpen] = useState(false)

    const form = useForm<RoomType>({
        resolver: zodResolver(RoomSchema),
        defaultValues: {
            name: "",
            description: "",
            is_private: false,
            tags: [],
        },
    })

    function onSubmit(data: RoomType) {
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create a new room</DialogTitle>
                            <DialogDescription>Create a room to chat with multiple people at once.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <FormLabel>Room name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter room name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe what this room is about" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <FormLabel>Tags</FormLabel>
                                            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={commandOpen}
                                                            className="justify-between"
                                                        >
                                                            Select tags
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
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
                                                                            const currentTags = field.value || []
                                                                            const newTags = currentTags.includes(currentValue)
                                                                                ? currentTags.filter((t) => t !== currentValue)
                                                                                : [...currentTags, currentValue]
                                                                            form.setValue("tags", newTags, {
                                                                                shouldValidate: true,
                                                                                shouldDirty: true,
                                                                                shouldTouch: true,
                                                                            })
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                field.value?.includes(tag.value) ? "opacity-100" : "opacity-0",
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

                                            {field.value && field.value.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {field.value.map((tag, index) => {
                                                        const tagLabel = availableTags.find((t) => t.value === tag)?.label || tag
                                                        return (
                                                            <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                                                                {tagLabel}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        const newTags = field.value.filter((t) => t !== tag)
                                                                        form.setValue("tags", newTags, {
                                                                            shouldValidate: true,
                                                                            shouldDirty: true,
                                                                            shouldTouch: true,
                                                                        })
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
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="is_private"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <FormLabel>Private room</FormLabel>
                                                <div className="text-xs text-muted-foreground">Only invited members can join</div>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Create Room</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default CreateRoomDialog;