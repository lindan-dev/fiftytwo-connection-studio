// Points directly to the App Store listing now that the app has a real
// App Store Connect ID (6786413171). Note: this link works even before
// the app is publicly released - App Store Connect shows a
// "pre-order"/"coming soon" style page for listings that exist but
// haven't finished review yet, so it's safe to point here now rather
// than waiting for the app to be fully live.

// App Store Connect link values. `pt` is the partner token used for
// attribution in App Store Connect analytics, `mt=8` marks the media type
// as an iPhone app. Both are required for the link to report correctly.
const APP_STORE_BASE = "https://apps.apple.com/app/apple-store/id6786413171";
const PARTNER_TOKEN = "129081454";
const MEDIA_TYPE = "8";

// Full App Store link without a campaign tag.
export const APP_URL = `${APP_STORE_BASE}?pt=${PARTNER_TOKEN}&mt=${MEDIA_TYPE}`;

// App Store link with a campaign tag ("ct") appended. The value comes from the
// ct query parameter on the landing page URL (e.g. /?ct=newsletter); when the
// parameter is missing or empty we fall back to "website". The partner token
// and media type are always included.
export function getAppUrlWithCt(): string {
  const raw =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("ct");
  const ct = raw && raw.trim() ? raw.trim() : "website";
  return `${APP_STORE_BASE}?pt=${PARTNER_TOKEN}&ct=${encodeURIComponent(ct)}&mt=${MEDIA_TYPE}`;
}

// Optional "support the project" payment link. Website only: it must NOT be
// linked from inside the iOS app (App Review Guideline 3.1.1 treats an external
// payment link in the app as an in-app purchase).
export const SUPPORT_URL = "https://buy.stripe.com/14AbJ34zR6ofcci1fJ5EY00";
