import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/appLinks";

// Bridges Supabase auth emails (confirmation, password reset) and shared
// invite links to the native app's custom URL scheme (fiftytwoormore://).
// A raw fiftytwoormore:// link fails completely silently if opened on a
// desktop browser, or on a phone that doesn't have the app installed yet -
// no error, no guidance, just nothing. This page is the fix: it's a real
// https:// URL (which Supabase/any browser can always open), it attempts
// the app-opening redirect itself, and falls back to a clear message if
// that doesn't visibly work within a couple seconds.
//
// Handles three cases, detected from the URL Supabase/the app puts here:
//   - ?type=connect&code=XXXXXXXX          -> fiftytwoormore://connect?code=XXXXXXXX
//   - #access_token=...&type=recovery      -> fiftytwoormore://reset-password#...
//   - #access_token=...&type=signup        -> fiftytwoormore://email-confirmed#...
export default function OpenApp() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const search = window.location.search; // "?type=connect&code=XXXX"
    const hash = window.location.hash; // "#access_token=...&type=recovery"
    const params = new URLSearchParams(search);

    let deepLink: string | null = null;

    if (params.get("type") === "connect" && params.get("code")) {
      deepLink = `fiftytwoormore://connect?code=${encodeURIComponent(params.get("code")!)}`;
    } else if (hash.includes("type=recovery")) {
      deepLink = `fiftytwoormore://reset-password${hash}`;
    } else if (hash.includes("access_token")) {
      // Covers signup confirmation and any other Supabase auth redirect
      // that isn't explicitly a recovery link.
      deepLink = `fiftytwoormore://email-confirmed${hash}`;
    }

    if (!deepLink) {
      setShowFallback(true);
      return;
    }

    window.location.href = deepLink;

    // If the app opened, this page loses focus/visibility almost
    // immediately (iOS backgrounds the browser). If we're still here
    // after a couple seconds, the app isn't installed (or this is a
    // desktop browser) - show the fallback instead of a blank screen.
    const timer = setTimeout(() => setShowFallback(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="flex justify-center">
          <Heart className="w-10 h-10 text-[hsl(var(--coral))] animate-pulse" />
        </div>

        {!showFallback ? (
          <>
            <h1 className="text-2xl font-medium text-[hsl(var(--warm-text))]">
              Opening fiftytwoormore...
            </h1>
            <p className="text-[hsl(var(--warm-text-light))] text-sm">
              If nothing happens in a few seconds, you may not have the app installed yet.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium text-[hsl(var(--warm-text))]">
              Almost there!
            </h1>
            <p className="text-[hsl(var(--warm-text-light))] text-sm">
              To continue, open this link on a phone with fiftytwoormore installed.
            </p>
            <div className="pt-2">
              {/* Real App Store link now that the app has a listing ID.
                  Works even before the app finishes review - App Store
                  Connect shows a "coming soon" style page for pending
                  listings. */}
              <a href={APP_URL}>
                <Button className="rounded-full bg-[hsl(var(--coral))] hover:bg-[hsl(var(--coral))]/90 text-white">
                  Get the app
                </Button>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
