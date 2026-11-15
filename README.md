# Bombay Kitchen Check

End-of-shift fridge check for the kitchen at Bombay, Eindhoven. A worker walks the
fridge, marks every item, and the app writes the two messages for the next shift.

**Live: https://pouri96.github.io/bombay-kitchen/**

## What it does

Two lists. **Morning todo** is what gets cooked and prepped before tomorrow's
service. **Inventory** is what has to be brought up to the kitchen.

Each item takes one of three answers:

| Answer | Meaning |
| --- | --- |
| Enough left | There is enough, nothing to do |
| Out of stock | None left, needs ordering or cooking |
| Maybe need more | Running low, worth topping up |

All 17 items must be answered before the message can be written. Rows you have not
answered yet carry a dashed edge so they are easy to spot while scrolling.

The message box then holds two separate messages, each with its own copy button, so
the prep list and the shopping list can go to different people. Only the red and
yellow items appear in them.

## Install it on a kitchen phone or tablet

Open the link, then:

- **Android / Chrome** — menu, then *Add to Home screen*
- **iPhone / iPad / Safari** — share button, then *Add to Home Screen*

It then opens full screen with its own icon, and works with no internet. The first
load needs a connection to fetch the fonts. After that everything is cached.

## Notes

- A part-finished check is saved on that device only, so closing the browser does not
  lose it. It never leaves the phone.
- Nothing is sent anywhere. There is no server, no account and no tracking. The app
  only produces text that you copy and send yourself.
- Light and dark follow the device setting.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app. One file, no build step, no dependencies. |
| `sw.js` | Service worker that caches the app for offline use. |
| `manifest.webmanifest` | Makes it installable to the home screen. |
| `icon-*.png`, `apple-touch-icon.png` | App icons. |

To change the dish lists, edit the `LISTS` array near the top of the `<script>` in
`index.html`. Each item needs an `id` matching an icon `<symbol id="i-...">` in the
SVG sprite, and a `name`.

Bumping `CACHE` in `sw.js` forces installed copies to pick up a new version.
