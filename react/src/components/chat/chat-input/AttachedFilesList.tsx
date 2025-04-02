import { X, FileIcon, ImageIcon } from "lucide-react";
import { Button } from "../../ui/button.tsx";
import { Progress } from "../../ui/progress.tsx";

interface AttachedFilesListProps {
    files: File[];
    uploadProgress: Record<string, number>;
    onRemoveFile: (fileName: string) => void;
}

function AttachedFilesList({ files, uploadProgress, onRemoveFile }: AttachedFilesListProps) {
    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-4 w-4" />;
        }
        return <FileIcon className="h-4 w-4" />;
    };

    return (
        <div className="mb-3 space-y-2">
            {files.map((file) => (
                <div key={file.name} className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    {getFileIcon(file)}
                    <div className="flex-1 overflow-hidden">
                        <div className="truncate text-sm">{file.name}</div>
                        <Progress value={uploadProgress[file.name] || 0} className="h-1" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemoveFile(file.name)}>
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default AttachedFilesList;