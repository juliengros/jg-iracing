# Scene 01 - Attente Asset Specs

This document lists each visual element required to match the target mock.

## Layout Zones

1. Hero area (top-left)

- Main JG logo.
- Waiting title and subtitle.

2. Session cards area (center-left)

- Three info cards with icon + highlighted text.

3. Team plate area (below cards)

- FR Racing Team branded plate.

4. Broadcast footer (full width bottom)

- Brand block, social block, countdown block.

## Asset Inventory

1. Background image

- File: `scene-bg-spa-rain.webp`
- Recommended: 3840x2160 for 1080p crop flexibility.
- Notes: dark mood, right-side car focal point, no key text in source image.

2. Primary logo

- File: `jg-wordmark.svg` (current placeholder in repo).
- Deliverable: official clean vector with red/white lockup.

3. Compact logo

- File: `jg-compact.svg` (current placeholder in repo).
- Deliverable: footer-ready horizontal compact mark.

4. Team logo plate

- File: `fr-racing-team.svg` (current placeholder in repo).
- Deliverable: official mark in white/red with transparent background.

5. Session icon set

- Files: `icon-calendar.svg`, `icon-track.svg`, `icon-car.svg`.
- Deliverable: consistent line style, single-color export for overlays.

6. Social icon set

- Files: `icon-twitch.svg`, `icon-youtube.svg`, `icon-instagram.svg`.
- Deliverable: monochrome white and optional red variant.

7. Optional texture

- File: `noise-soft.png`.
- Recommended: 512x512 seamless alpha texture.

## Text Tokens

1. Hero title

- Value: LE LIVE COMMENCE BIENTOT

2. Hero subtitle

- Value: INSTALLE-TOI, LE MOTEUR VA CHAUFFER.

3. Cards

- Value 1: LIVE #001
- Value 2: SPA 24 PRACTICE
- Value 3: PORSCHE 992 GT3

4. Footer

- Value: STAY CONNECTED
- Value: @JG_iRACING
- Value: DEMARRAGE DANS
- Value: PREPAREZ-VOUS

## Styling Tokens

1. Color palette

- Accent red: #ED1212
- Main text: #F3F7FB
- Muted text: #A8B3C1
- Panel dark: rgba(7,10,15,0.7)

2. Typography

- Display: Orbitron
- UI/body: Rajdhani

3. Borders and effects

- Card border: 1px rgba(192,202,216,0.35)
- Footer border: 1px rgba(237,18,18,0.5)
- Soft red glow on hero logo.

## Data/Logic Modules

1. Session cards source

- Stored in `script.js` as `sceneConfig.cards`.

2. Countdown source

- Stored in `script.js` as `sceneConfig.countdownTarget`.

3. Countdown behavior

- Format: MM:SS (or HH:MM:SS when needed).
- Expired state: `LIVE`.
