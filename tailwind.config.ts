import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // — analog 70s/80s record-sleeve palette —
        // vinyl black: the disc, the body type, the night
        vinyl:    '#0e0a07',
        // tobacco: warm mid-tone for body backdrop, sleeve cardboard
        tobacco:  '#3a2618',
        // amber: needle glow, hot side-A markings
        amber:    '#d99a3a',
        // amber-l: brighter highlight
        'amber-l':'#e8b658',
        // cream: liner-note paper, type on dark
        cream:    '#f0e3c8',
        // paper: lighter card stock for menus
        paper:    '#f8eedb',
        // pop: the record-label pop colour — single 7" hit
        pop:      '#e64a26',
        // pop-d: deeper pop for hover
        'pop-d':  '#c33b1c',
        // groove: subtle dark stripe used for record grooves
        groove:   '#1a120c',
      },
      fontFamily: {
        // display: groovy / heavy retro for headlines + record sleeves
        display:    ['var(--font-display)', 'Bowlby One', 'Impact', 'serif'],
        // mono / monospace for tracklist numerals + run-times
        mono:       ['var(--font-mono)', 'IBM Plex Mono', 'Menlo', 'monospace'],
        // body: clean modern sans for prose
        sans:       ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        // thai
        thai:       ['var(--font-thai)', 'Noto Sans Thai', 'sans-serif'],
        // italic accent for the brand mark
        italic:     ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      transitionTimingFunction: {
        groove:  'cubic-bezier(0.16, 0.84, 0.30, 1)',
        needle:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
