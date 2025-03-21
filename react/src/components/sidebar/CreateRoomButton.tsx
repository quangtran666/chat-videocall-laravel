import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import CreateRoomDialog from "@/components/chat/CreateRoomDialog.tsx";

function CreateRoomButton() {
    const [createRoomOpen, setCreateRoomOpen] = useState(false);

    return (
        <div className="flex flex-col gap-2 p-4">
            <Button onClick={() => setCreateRoomOpen(true)} className="w-full justify-start gap-2">
                <PlusCircle className="h-4 w-4"/>
                Create New Room
            </Button>
            <CreateRoomDialog open={createRoomOpen} onOpenChange={setCreateRoomOpen} />
        </div>
    );
}

export default CreateRoomButton;