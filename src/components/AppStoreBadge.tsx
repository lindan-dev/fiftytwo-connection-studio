// Standard "Download on the App Store" badge, recreated as inline SVG to
// match Apple's official badge appearance (black rounded rectangle, Apple
// logo, two-line text) without depending on an externally hosted image
// asset. Used wherever we want the recognizable, trustworthy "real App
// Store link" visual instead of a generic text button.
export default function AppStoreBadge({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
      aria-label="Download on the App Store"
    >
      <svg width="160" height="53" viewBox="0 0 160 53" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="53" rx="10" fill="#000000" />
        {/* Apple logo */}
        <g transform="translate(14, 10) scale(0.032)">
          <path
            fill="#FFFFFF"
            d="M451.4 208.4c-4.2-40.9 34.6-62.6 36.3-63.7-19.7-28.9-50.4-32.9-61.3-33.3-26.1-2.6-51 15.3-64.3 15.3-13.3 0-33.8-14.9-55.6-14.5-28.6.4-55 16.6-69.7 42.2-29.8 51.6-7.6 128 21.4 170 14.2 20.6 31.1 43.7 53.3 42.9 21.4-.9 29.5-13.8 55.4-13.8 25.8 0 33.2 13.8 55.6 13.3 23-.4 37.5-20.9 51.6-41.6 16.2-23.8 22.9-46.9 23.2-48.1-.5-.2-44.6-17.1-45-67.4zM406.7 82.5c11.8-14.3 19.7-34.2 17.5-54-16.9.7-37.4 11.3-49.6 25.5-10.9 12.6-20.5 32.8-17.9 52 18.8 1.5 38.1-9.5 50-23.5z"
          />
        </g>
        <text x="46" y="21" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="9">
          Download on the
        </text>
        <text x="46" y="38" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600">
          App Store
        </text>
      </svg>
    </a>
  );
}
