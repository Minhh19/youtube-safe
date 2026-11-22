/* YouTube Safe experimental response filter v0.1
 * No network requests, no storage, no access to request headers/cookies.
 * Only processes JSON responses on explicitly matched YouTube API routes.
 */
(function () {
  'use strict';
  function transform(body) {
    if (typeof body !== 'string' || body.length > 2000000) return body;
    let data;
    try { data = JSON.parse(body); } catch (_) { return body; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return body;
    let changed = false;
    // Limited, known ad placement fields. Avoid generic recursive deletion.
    if (data.playerAds && Array.isArray(data.playerAds)) {
      delete data.playerAds; changed = true;
    }
    if (data.adPlacements && Array.isArray(data.adPlacements)) {
      delete data.adPlacements; changed = true;
    }
    if (data.adSlots && Array.isArray(data.adSlots)) {
      delete data.adSlots; changed = true;
    }
    // Experimental: player response may expose a background-playability flag.
    // This cannot override app-side restrictions or enable background audio by itself.
    const p = data.playabilityStatus;
    if (p && typeof p === 'object' && p.backgroundability && typeof p.backgroundability === 'object' && p.backgroundability.backgroundable === false) {
      p.backgroundability.backgroundable = true; changed = true;
    }
    return changed ? JSON.stringify(data) : body;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { transform };
  if (typeof $done === 'function') {
    try {
      const original = (typeof $response !== 'undefined' && $response && $response.body) || '';
      $done({ body: transform(original) });
    } catch (_) { $done({}); }
  }
})();
