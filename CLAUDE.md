# LONGLAI · 13/9 Anuwong Rd, Chakkrawat, Bangkok

A vinyl bar at the edge of Chinatown where young guest chefs take turns in
the kitchen and the records spin. Build Card #6 of the 5-site Bangkok
batch (e-ga · Rong Klan · Naam 1608 · Hansa · Longlai).

## Brand brief — verified

- **Name:** Longlai · ล่องลอย ("drift / float")
- **Address:** 13/9 Anuwong Rd, Khwaeng Chakkrawat, Bangkok
- **Concept:** Vinyl bar-restaurant. Records play (not playlists). A
  rotating roster of young guest chefs cook each month, each bringing
  their own style. The room is becoming a meeting place for DJs and
  musicians.
- **IG:** @longlai.bar
- **Press anchor:** Lufthansa "In My Hood: Song Wat Road" by Note
  Pongsuang, 26 January 2026 — verbatim: "At Longlai, not only is the
  sound just right, but the food is also unbeatably good. Young guest
  chefs take turns in the kitchen, each bringing their own style to the
  table. The place is quickly becoming a new meeting place for DJs and
  musicians." (image © Adam Birkan).

## Voice in one sentence

The lights are on, the disc is spinning, a different chef is plating
tonight — show up and listen.

## Aesthetic in five words

Vinyl-warm, ever-changing, chef-driven.

## Primary CTA + why

**Reserve a seat.** Guest-chef nights are scarce, dated, and sell out;
bookings are the revenue lever. Secondary CTAs: **"See who's cooking
this month"** and **Directions**.

## Palette (vinyl black, warm tobacco/amber, retro cream, record-label pop)

- vinyl     `#0e0a07`  the disc, the body type, the night
- tobacco   `#3a2618`  warm sleeve cardboard
- amber     `#d99a3a`  needle glow, hot side-A markings
- amber-l   `#e8b658`  brighter highlight
- cream     `#f0e3c8`  liner-note paper
- paper     `#f8eedb`  lighter card stock
- pop       `#e64a26`  record-label pop colour
- pop-d     `#c33b1c`  hover pop
- groove    `#1a120c`  subtle dark stripe used for record grooves

Contrast: cream/vinyl 14:1 · amber/vinyl 7:1 · pop/cream 5.2:1.

## Typography

- **Display retro:** "Bowlby One" / "Carter One" — groovy
  record-sleeve heavy serif
- **Mono numerals + tracklist runtimes:** "IBM Plex Mono"
- **Body sans:** "Inter"
- **Italic accent / brand mark:** "Cormorant Garamond" italic
- **Thai:** "Noto Sans Thai"

## Animations — brand-coherent (8)

1. **Hero record spin-up + tonearm drop** — record idle, tonearm hovers
   above the rim; on hero mount the disc spins up and the tonearm
   descends with a Cormorant-italic "click"
2. **Scroll-velocity record spin** — disc spins faster when scrolling
   down, slower when up; very fast scroll-up triggers a pitch-down
   wobble (rewind)
3. **Now Playing ticker** — endless marquee of "now playing · this
   month's chef · side A / B" running across the page
4. **VU meter scroll-progress bar** — scroll progress reads as bouncing
   VU bars (left + right channel) across the bottom of the viewport
5. **Record-flip section transition** — at "B-side" the page flips
   colour temperature warmer with a brief shutter
6. **Vinyl-crackle grain overlay** — a low-opacity dust + scratch
   layer that intensifies subtly in low-light sections
7. **Tracklist number reveal** — A1, A2, A3... B1, B2... ratchets up
   one at a time on scroll-into-view
8. **Hand-drawn marker underline** on hover on nav anchors

All gated on `prefers-reduced-motion`.

## "Not boring" structural moves (5)

1. **Now Playing block** — a rotating "This Month's Guest Chef" feature
   card with chef portrait, dates, and a "back-of-sleeve" bio. Built to
   be swapped monthly — schema is `currentChef: { name, dates, bio,
   tracklistTheme }`.
2. **Menu as record tracklist** — Side A / Side B, items numbered A1
   A2 A3 / B1 B2 B3, prices written as runtimes (e.g. `04:32` for ฿432)
3. **Liner-notes manifesto** — the brand voice as the back-of-sleeve
   text, opened with "© LONGLAI · SIDE A · BANGKOK 2024 –"
4. **Record-sleeve gallery** — a hand-arranged grid of square LP-sleeve
   tiles + a few polaroids, rotated -3°/+3°
5. **Yellow-storefront signature shot** — the Lufthansa / Adam Birkan
   photo of the brightly-lit yellow shopfront, used at full bleed once
   in The Room section

## Divergence lock — must NOT resemble

- **e-ga** (ink editorial)
- **Rong Klan** (industrial steam)
- **Naam** (river dusk)
- **Hansa** (swan ivory)

This is the only **analog-vinyl / spinning-record / tracklist** build —
the most playful and music-driven of the five. Own the turntable.

## Deploy

- Repo: github.com/kirbykung168-art/longlai
- Live: longlai.vercel.app
