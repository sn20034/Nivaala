import VideoThumbnail from '../ui/VideoThumbnail';
import { images, videos } from '@/data/images';

const CLIP_TO_VIDEO = {
  'c1': 0, 'c2': 1, 'c3': 2, 'c4': 3, 'c5': 4,
};

export default function KitchenClipCard({ clip }) {
  const videoIdx = CLIP_TO_VIDEO[clip.id];
  const video = videoIdx != null ? videos[videoIdx] : {
    id: clip.id,
    title: clip.title,
    duration: clip.duration,
    category: clip.isLive ? '' : 'Cooking',
    thumbnail: images.kitchen.cooking.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  };

  return (
    <div className="card-surface overflow-hidden text-textBase dark:text-white">
      <div className="p-3 pb-0">
        <VideoThumbnail video={video} isLive={clip.isLive} className="shadow-card" />
      </div>
    </div>
  );
}
