<img width="2400" height="1600" alt="image" src="https://github.com/user-attachments/assets/3a2dcb73-3ebc-452e-9516-332f15e9baa8" />

# rssh-plugin-mascot

A strip-region plugin for [rssh](https://github.com/rssh-org/rssh): a tiny
pixel cat that lives in the strip bar next to your terminal.

Pure frontend — it uses no exec channel, no build pipeline, no dependencies
beyond jszip for packaging. It is the minimal example of a plugin that is
just a hand-written `index.html`:

```
manifest.json    plugin metadata (area "strip", preview declaration)
index.html       the whole plugin: pixel-art cat + behavior state machine
preview.html     static pose for the plugin manager's stage
scripts/package.mjs  zips the above into an installable dist/*.zip
```

## What the cat does

- Idles: sways its tail, blinks, occasionally perks its ears.
- Every few seconds: struts along its segment (it often speaks first — a
  visible quip widens the room it has to walk), hops, or says something
  (`$ sudo pet me`, `exit 0`, …).
- Falls asleep when left alone (`z z z…`) — click to startle it awake.
- Click reactions: hop / wiggle / purr / quip, picked at random.
- Takes exactly the width its content needs — measured, reported, and kept
  current via the size bridge (no preset size; the segment breathes with
  the quip and collapses back after it fades).
- Follows the host theme (colors come from the hello frame's tokens) and
  pauses completely while its tab is hidden.

## Package & install

```bash
npm install
npm run package        # → dist/rssh-pixel-cat-1.0.0.zip
```

In rssh: Settings → Plugins → install from the **strip** region's button.

## Dev

Open `index.html` directly in a browser — it runs standalone with fallback
colors. `index.html#frame=<sit|sway|blink|sleep|alert|happy>` draws one
frame and freezes (for screenshots).
