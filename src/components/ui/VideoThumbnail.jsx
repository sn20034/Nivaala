import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import SmartImage from './SmartImage';
import Modal from './Modal';

/**
 * VideoThumbnail — photo thumbnail with play button, duration chip,
 * category label, and optional LIVE badge. Click opens a video modal.
 */
export default function VideoThumbnail({ video, isLive = false, className = '' }) {
  const [open, setOpen] = useState(false);
  const title = video.title || 'Video';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${title}`}
        className={`group relative block w-full overflow-hidden rounded-card text-left ${className}`}
      >
        <SmartImage
          src={video.thumbnail}
          alt={title}
          aspect="16/9"
          overlay
          className="rounded-card"
        />

        {/* Category chip / LIVE badge */}
        {/* Red pulsing LIVE only when isLive and no duration */}
        {isLive && !video.duration ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
            LIVE
          </span>
        ) : (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Play size={12} fill="currentColor" />
            {video.duration ? "Today's kitchen clip" : video.category}
          </span>
        )}

        {/* Title bottom-left */}
        <span className="absolute bottom-3 left-3 z-10 text-sm font-semibold text-white drop-shadow-md">
          {title}
        </span>

        {/* Duration chip bottom-right */}
        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}

        {/* Center play button */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
            <Play size={24} className="ml-0.5" fill="currentColor" />
          </span>
        </span>
      </button>

      <VideoModal video={video} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function VideoModal({ video, open, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Pause video when modal closes by clearing the iframe src
  useEffect(() => {
    if (!open && iframeRef.current) {
      iframeRef.current.src = '';
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={video.title} size="lg">
      <div className="overflow-hidden rounded-card">
        {video.videoUrl && (
          <div className="aspect-video w-full">
            {/* TODO: replace with real Nivaala kitchen videos */}
            <iframe
              ref={iframeRef}
              src={open ? video.videoUrl : ''}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
