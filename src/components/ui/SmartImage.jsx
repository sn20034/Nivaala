import { useState, useEffect, useRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';

const ASPECT_CLASS = {
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
};

/**
 * SmartImage — lazy-loaded image with skeleton shimmer, fade-in,
 * and a warm gradient fallback so broken images never show.
 * If `fallbackSrc` is provided, it is tried before the gradient placeholder.
 */
export default function SmartImage({
  src,
  alt,
  aspect = '4/3',
  focal = 'center',
  priority = false,
  className = '',
  overlay = false,
  imgClassName = '',
  fallbackSrc,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef(null);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setErrored(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setLoaded(false);
      setErrored(false);
    } else {
      setErrored(true);
    }
  };

  if (errored || !currentSrc) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-100 to-cream-surface dark:from-ink-surface dark:to-ink ${ASPECT_CLASS[aspect] || ''} ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed size={32} className="text-brand-400" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${ASPECT_CLASS[aspect] || ''} ${className}`}
      style={{ objectPosition: focal }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-cream-border/60 dark:bg-ink-border" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        style={{ objectPosition: focal }}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}
    </div>
  );
}
