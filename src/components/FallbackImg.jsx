// <img> that swaps to a local SVG if the primary (hotlinked) photo fails to
// load — the product/insight photos are real Pexels URLs, which this app
// can't verify load correctly in every environment, so every one of them
// ships with a hand-drawn local fallback.
export default function FallbackImg({ src, fallback, alt, className, loading }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}
