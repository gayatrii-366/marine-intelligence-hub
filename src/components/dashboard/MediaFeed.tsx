import { useState, useRef } from "react";
import { Upload, Image, Film, X, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'video';
}

export function MediaFeed() {
  const [mediaFile, setMediaFile] = useState<MediaFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image or video file.',
        variant: 'destructive'
      });
      return;
    }

    // Revoke previous URL to prevent memory leaks
    if (mediaFile?.url) {
      URL.revokeObjectURL(mediaFile.url);
    }

    const newMedia: MediaFile = {
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      type: isImage ? 'image' : 'video'
    };

    setMediaFile(newMedia);
    setIsPlaying(false);
    toast({
      title: 'Media uploaded',
      description: `${file.name} is now displayed in the feed.`
    });
  };

  const handleRemoveMedia = () => {
    if (mediaFile?.url) {
      URL.revokeObjectURL(mediaFile.url);
    }
    setMediaFile(null);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          {mediaFile?.type === 'video' ? (
            <Film className="h-4 w-4 text-primary" />
          ) : (
            <Image className="h-4 w-4 text-primary" />
          )}
          <span className="font-medium">Media Feed</span>
        </div>
        <div className="flex items-center gap-2">
          {mediaFile ? (
            <>
              <Badge variant="outline" className="text-xs">
                {mediaFile.type.toUpperCase()}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleRemoveMedia}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Badge variant="secondary" className="text-xs">
              No media
            </Badge>
          )}
        </div>
      </div>

      {/* Media Area */}
      <div className="relative aspect-video bg-ocean-deep">
        {mediaFile ? (
          <>
            {mediaFile.type === 'image' ? (
              <img
                src={mediaFile.url}
                alt="Uploaded media"
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={mediaFile.url}
                  className="absolute inset-0 w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                  loop
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-background/80 hover:bg-background/90"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Detection overlay simulation */}
            <div className="absolute left-[20%] top-[30%] h-16 w-20 border-2 border-primary rounded animate-pulse">
              <span className="absolute -top-5 left-0 text-xs text-primary font-mono bg-background/50 px-1">
                DEBRIS 92%
              </span>
            </div>
            <div className="absolute right-[30%] top-[45%] h-12 w-16 border-2 border-warning rounded">
              <span className="absolute -top-5 left-0 text-xs text-warning font-mono bg-background/50 px-1">
                PLASTIC 85%
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Placeholder with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-ocean-surface/20 to-ocean-deep" />
            
            {/* Upload prompt */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-4 rounded-full bg-muted/20 mb-4">
                <Upload className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <p className="text-muted-foreground mb-2">
                Click to upload image or video
              </p>
              <p className="text-xs text-muted-foreground/60">
                Supports JPG, PNG, MP4, MOV
              </p>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between border-t bg-secondary/20 px-4 py-2">
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          {mediaFile ? (
            <>
              <span>File: {mediaFile.file.name.slice(0, 20)}{mediaFile.file.name.length > 20 ? '...' : ''}</span>
              <span>Size: {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
            </>
          ) : (
            <span>No media loaded</span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-3 w-3 mr-1" />
          Upload
        </Button>
      </div>
    </div>
  );
}
