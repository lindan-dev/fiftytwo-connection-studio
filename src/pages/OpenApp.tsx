import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { APP_URL } from "@/lib/appLinks";
import AppStoreBadge from "@/components/AppStoreBadge";
import { getDeepLink } from "@/lib/deepLink";

// Bridges Supabase auth emails (confirmation, password reset) and shared
// invite links to the native app's custom URL scheme (fiftytwoormore://).
// A raw fiftytwoormore:// link fails completely silently if opened on a
// desktop browser, or on a phone that doesn't have the app installed yet -
// no error, no guidance, just nothing. This page is the fix: it's a real
// https:// URL (which Supabase/any browser can always open), it attempts
// the app-opening redirect itself, and falls back to a clear message if
// that doesn't visibly work within a couple seconds.
//
// Handles four cases (see src/lib/deepLink.ts):
//   - ?type=connect&code=XXXXXXXX          -> fiftytwoormore://connect?code=XXXXXXXX
//   - #access_token=...&type=recovery      -> fiftytwoormore://reset-password#...
//   - #access_token=...&type=signup        -> fiftytwoormore://email-confirmed#...
//   - ?type=open                           -> fiftytwoormore://   (links in our emails: just open the app)
export default function OpenApp() {
  const [showFallback, setShowFallback] = useState(false);
  // True when the incoming link was an email-confirmation redirect
  // (hash contains access_token). The fallback copy for that case is
  // different: the user's email is already confirmed, they just need to
  // get into the app on their phone.
  const [isConfirmation, setIsConfirmation] = useState(false);
  // True for the plain "open the app" link used by the emails we send.
  const [isOpenLink, setIsOpenLink] = useState(false);

  useEffect(() => {
    const { deepLink, kind } = getDeepLink(window.location.search, window.location.hash);
    if (kind === "confirmation") setIsConfirmation(true);
    if (kind === "open") setIsOpenLink(true);

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
              {isConfirmation ? "You’re confirmed! 🎉" : isOpenLink ? "Need the app?" : "Almost there!"}
            </h1>
            <p className="text-[hsl(var(--warm-text-light))] text-sm">
              {isConfirmation
                ? "Your email is confirmed. Open fiftytwoormore on your phone and log in to continue."
                : isOpenLink
                  ? "If fiftytwoormore didn’t open, it may not be installed yet. Download it here, or open this link on your phone."
                  : "To continue, open this link on a phone with fiftytwoormore installed."}
            </p>
            <div className="pt-2 flex justify-center">
              {/* Now live on the App Store - the real, recognizable
                  download badge instead of a plain text button. */}
              <AppStoreBadge href={APP_URL} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

