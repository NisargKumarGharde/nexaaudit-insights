import { useCallback, useState, DragEvent } from "react";
import { UploadCloud, FileText, Image as ImageIcon, Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadZoneProps {
  onUploadComplete?: (filename: string, response: any) => void;
}

export const UploadZone = ({ onUploadComplete }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF and image files are supported");
      return;
    }

    setStatus("uploading");
    setCurrentFile(file.name);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch("http://localhost:8082/api/v1/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const data = await res.json().catch(() => ({}));
      setStatus("success");
      toast.success("Document analyzed successfully");
      onUploadComplete?.(file.name, data);
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err: any) {
      setStatus("error");
      toast.error(err?.message ?? "Upload failed");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
        isDragging
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border bg-gradient-card hover:border-primary/40"
      }`}
    >
      {status === "uploading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-card/90 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary animate-pulse-ring">
              <Sparkles className="h-7 w-7 text-primary-foreground animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold flex items-center gap-2 justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              AI is analyzing document...
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate max-w-xs">{currentFile}</p>
          </div>
          <div className="w-64 h-1 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-full animate-shimmer" />
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/90 backdrop-blur-sm">
          <CheckCircle2 className="h-12 w-12 text-success" />
          <p className="font-semibold">Analysis complete</p>
          <p className="text-xs text-muted-foreground">{currentFile}</p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/90 backdrop-blur-sm">
          <XCircle className="h-12 w-12 text-destructive" />
          <p className="font-semibold">Upload failed</p>
          <p className="text-xs text-muted-foreground">Check your connection and try again</p>
        </div>
      )}

      <label className="flex flex-col items-center justify-center gap-4 px-8 py-16 cursor-pointer">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
          <UploadCloud className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold">Drop documents to audit</h3>
          <p className="text-sm text-muted-foreground">
            Drag & drop files here, or <span className="text-primary font-medium">browse</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
            <FileText className="h-3 w-3" /> PDF
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
            <ImageIcon className="h-3 w-3" /> PNG / JPG
          </span>
        </div>
        <input
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};
