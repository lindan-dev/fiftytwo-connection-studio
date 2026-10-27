// Decides which deep link into the native app the bridge page (/app-redirect) should open,
// based on what is in the URL. Kept separate from the page so it can be tested.
//
//   ?type=connect&code=XXXXXXXX        -> fiftytwoormore://connect?code=XXXXXXXX   (invitation)
//   #access_token=...&type=recovery    -> fiftytwoormore://reset-password#...      (password reset)
//   #access_token=...                  -> fiftytwoormore://email-confirmed#...     (email confirmation)
//   ?type=open                         -> fiftytwoormore://                        (just open the app; used by links in our emails)
export type DeepLinkKind = "connect" | "recovery" | "confirmation" | "open" | "none";

export function getDeepLink(search: string, hash: string): { deepLink: string | null; kind: DeepLinkKind } {
  const params = new URLSearchParams(search);

  if (params.get("type") === "connect" && params.get("code")) {
    return { deepLink: `fiftytwoormore://connect?code=${encodeURIComponent(params.get("code")!)}`, kind: "connect" };
  }
  if (hash.includes("type=recovery")) {
    return { deepLink: `fiftytwoormore://reset-password${hash}`, kind: "recovery" };
  }
  if (hash.includes("access_token")) {
    // Covers signup confirmation and any other Supabase auth redirect that isn't a recovery link.
    return { deepLink: `fiftytwoormore://email-confirmed${hash}`, kind: "confirmation" };
  }
  if (params.get("type") === "open") {
    return { deepLink: "fiftytwoormore://", kind: "open" };
  }
  return { deepLink: null, kind: "none" };
}

