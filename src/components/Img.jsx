// Shows a photo, or a clearly labelled placeholder when no verified photo exists yet.
export default function Img({ src, alt, label = 'Photo to be added', className = '' }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  return (
    <div role="img" aria-label={`${alt} (placeholder)`}
      className={`flex items-center justify-center bg-forest-light p-4 text-center text-xs tracking-wide text-cream/70 ${className}`}>
      {label}
    </div>
  );
}
