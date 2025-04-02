import { Smile } from "lucide-react";
import { Button } from "../../ui/button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.tsx";

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
}

const EMOJI_CATEGORIES = [
    {
        name: "Smileys & Emotion",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
    },
    {
        name: "People & Body",
        emojis: ["👍", "👎", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👋"],
    },
    {
        name: "Animals & Nature",
        emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧"],
    },
    {
        name: "Food & Drink",
        emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅"],
    },
];

function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full">
                            <Smile className="h-5 w-5" />
                            <span className="sr-only">Insert emoji</span>
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top">Insert emoji</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-3">
                    <div className="mb-2 text-sm font-medium">Emojis</div>
                    <div className="space-y-3">
                        {EMOJI_CATEGORIES.map((category) => (
                            <div key={category.name}>
                                <div className="mb-1 text-xs text-muted-foreground">{category.name}</div>
                                <div className="flex flex-wrap gap-1">
                                    {category.emojis.map((emoji) => (
                                        <button
                                            key={emoji}
                                            className="cursor-pointer rounded p-1 text-lg hover:bg-muted"
                                            onClick={() => onEmojiSelect(emoji)}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default EmojiPicker;