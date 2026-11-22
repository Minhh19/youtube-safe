YouTube Safe Experimental v0.1

IMPORTANT: This is an experimental, unverified Shadowrocket module, NOT a working ready-to-install ad blocker.

The .module file deliberately uses a NONFUNCTIONAL example.invalid script-path placeholder.
To use it, first host the exact youtube.safe.js file at a trusted HTTPS URL under your control, then replace the placeholder URL. Never paste the placeholder as-is and expect it to run.

The module uses HTTPS MITM limited to youtubei.googleapis.com. This requires trusting a locally generated HTTPS interception certificate on iOS. Only enable this if you understand the risks. Turn off MITM if you don't need it. The certificate grants the intercepting app access to decrypted traffic on the matched host.

This script removes only playerAds, adPlacements, and adSlots at the top level of JSON player responses. It tries to change an optional backgroundability flag. It does not guarantee ad blocking, PiP, or background playback. YouTube may change APIs at any time.

To test syntax on Windows with Node.js:
node --check youtube.safe.js

Review the JavaScript and module before using. This code has not been tested on the official YouTube iOS app.
