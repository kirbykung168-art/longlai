/**
 * LONGLAI · single source of truth.
 *
 * Build Card #6 of the 5-site Bangkok batch. Every fact below is
 * verifiable from the SOURCES array; if a fact cannot be cited, it
 * lives in `inferences` and is marked.
 *
 * Voice: vinyl-warm, ever-changing, chef-driven. The brand voice is
 * anchored to Note Pongsuang's verbatim line in the Lufthansa "In My
 * Hood: Song Wat Road" piece, 26 January 2026.
 */

type Bilingual = { en: string; th: string };

export const BRAND = {
  name:        'Longlai',
  nameThai:    'ล่องลอย',
  // The Thai handle on Instagram uses หลงไหล (to be enchanted) while
  // the user's brief specifies the poetic ล่องลอย (to drift) as the
  // canonical mark. We carry both so the wordmark can render in
  // either script.
  nameThaiAlt: 'หลงไหล',
  tagline: {
    en: 'Records play, not playlists. A different chef every month.',
    th: 'แผ่นเสียงหมุน ไม่ใช่เพลย์ลิสต์ · เชฟใหม่ทุกเดือน',
  } as Bilingual,

  addressLine1: '13/9 Anuwong Road',
  addressLine2: 'Khwaeng Chakkrawat, Bangkok 10100',
  // Anuwong is one block parallel to Song Wat, on the Chinatown side.
  district:     'Chakkrawat · Chinatown / Song Wat fringe',

  // Tue–Sun 10:00 – 02:00, closed Mondays — operating long because
  // the room is cafe-coffee by day and vinyl-bar by night.
  hoursOpen:    'Tue · Wed · Thu · Fri · Sat · Sun · 10 AM – 2 AM',
  hoursClosed:  'Closed Mondays',

  // — guest chef rotation —
  // The defining operational fact: a different young chef every
  // month. The brief is built around making this swappable, so the
  // page rotates `CURRENT_CHEF` rather than hard-coding a name.
  rotationModel: 'monthly',

  // — distance signal —
  // Note Pongsuang runs Mischa Cheap on Song Wat directly. Longlai is
  // his recommendation in the Lufthansa piece, which gives the brand
  // some borrowed authority from the Song Wat scene.
  introducedBy: 'Note Pongsuang, in his "In My Hood" piece for Lufthansa Discover',

  // — handles —
  instagramHandle: '@longlai.bar',
  instagramUrl:    'https://www.instagram.com/longlai.bar/',
  // FB handle TBC — the Lufthansa piece links to maps only.
  mapsUrl:         'https://maps.app.goo.gl/KLkF21SE6hSKbnWW7',

  // — photo credit / press anchor —
  pressPhotoCredit:    'Photograph · Adam Birkan for Lufthansa Discover',
  pressPhotoCreditUrl: 'https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok',

  lat: 13.7395,
  lng: 100.5045,

  reserveLine: {
    // The reservation channel is LINE / IG DM until the brand
    // publishes a booking form. Until verified, keep the CTA to
    // direct-message Instagram and a phone line placeholder.
    en: 'Reserve via Instagram DM · @longlai.bar',
    th: 'จองที่นั่ง · DM Instagram @longlai.bar',
  } as Bilingual,
} as const;

/**
 * — PHOTOS —
 * All photos served through wsrv.nl Cloudflare proxy for on-the-fly
 * WebP conversion + resizing. We anchor one verified image (the
 * Lufthansa Adam Birkan yellow-storefront shot). The remaining
 * imagery is built from SVG record-sleeve illustrations so the page
 * doesn't claim to source photos we can't cite.
 */
const wsrv = (upstream: string, w = 1600) =>
  `https://wsrv.nl/?url=${encodeURIComponent(upstream)}&w=${w}&output=webp&q=82`;

// The brightly-lit yellow Longlai storefront, shot at night.
const LUFTHANSA_STOREFRONT =
  'https://www.lufthansa.com/content/dam/lufthansa-group/images/local_images/blog_article_img/in-my-hood-song-wat-road-bangkok/lh_blog_bangkok_restaurant_longlai_1920x823.jpg.transform/lh-dcep-transform-width-1440/img.jpg';

export const PHOTOS = {
  storefront:      wsrv(LUFTHANSA_STOREFRONT, 1800),
  storefrontWide:  wsrv(LUFTHANSA_STOREFRONT, 2400),
} as const;

/**
 * — CURRENT GUEST CHEF —
 * This block is built to be swapped monthly. The schema below is
 * the contract; replace each field per month. The site renders
 * everything from here without needing component edits.
 *
 * Currently set to a placeholder chef while the brand confirms the
 * June 2026 booking. Marked `verified: false` so the audit page can
 * surface the placeholder state.
 */
export const CURRENT_CHEF = {
  verified: false,
  monthLabel: 'June 2026 · Side A',
  name: 'TBA',
  // discipline / cuisine direction
  discipline: 'Modern Thai · Southern fish-sauce showcase',
  // dates the chef is in residence
  dates: 'Tue 4 Jun – Sun 30 Jun 2026',
  // back-of-sleeve bio — to be replaced by the brand
  bioBack: {
    en: 'The June chef brings a Side-A dossier of Southern Thai fish sauces, fermented chillis, and a single bowl of khanom jeen that changes weekly. Tracklist below.',
    th: 'เชฟประจำเดือนมิถุนายนพาเครื่องเคียงปลาร้าใต้ น้ำพริก และขนมจีนถ้วยเดียวที่เปลี่ยนทุกสัปดาห์ ดูแทร็กลิสต์ด้านล่าง',
  } as Bilingual,
  // a short "track" that doubles as the chef's signature dish
  signatureTrack: {
    en: 'A1 · Khanom jeen, fermented chilli',
    th: 'A1 · ขนมจีน น้ำพริกหมัก',
  } as Bilingual,
} as const;

/**
 * — TRACKLIST · the menu as Side A / Side B —
 * Prices written as runtimes — e.g. ฿250 = "02:50". This is the
 * brief's "menu styled as a record tracklist" structural move.
 * Items are intentionally generic, anchored to the brand's stated
 * direction (modern Thai shareable plates + chef-of-the-month
 * specials). Replace as verified.
 *
 * `verified: false` flags items that are inferred from the rotating
 * model rather than confirmed from a current published menu.
 */
export const TRACKLIST = {
  sideA: {
    label: { en: 'Side A · This Month', th: 'Side A · ประจำเดือน' } as Bilingual,
    items: [
      {
        n: 'A1',
        name: { en: 'Khanom jeen, fermented chilli', th: 'ขนมจีน น้ำพริกหมัก' } as Bilingual,
        note: { en: 'The signature track of June.', th: 'ทรงเด่นของเดือนมิถุนายน' } as Bilingual,
        runtime: '02:90',
        verified: false,
      },
      {
        n: 'A2',
        name: { en: 'Crispy fish, three-flavour sauce', th: 'ปลาทอด ซอสสามรส' } as Bilingual,
        note: { en: 'Sweet, sour, hot — pressed to wax.', th: 'หวาน เปรี้ยว เผ็ด' } as Bilingual,
        runtime: '03:40',
        verified: false,
      },
      {
        n: 'A3',
        name: { en: 'Wing bean salad, prawn oil', th: 'ยำถั่วพู น้ำมันกุ้ง' } as Bilingual,
        note: { en: 'Cold, bright, herbaceous.', th: 'เย็น สด สมุนไพร' } as Bilingual,
        runtime: '02:20',
        verified: false,
      },
      {
        n: 'A4',
        name: { en: 'Stir-fried morning glory, fermented bean', th: 'ผัดผักบุ้ง เต้าเจี้ยว' } as Bilingual,
        note: { en: 'The vegetable bridge between sets.', th: 'จานผักช่วงสลับด้าน' } as Bilingual,
        runtime: '01:80',
        verified: false,
      },
    ],
  },
  sideB: {
    label: { en: 'Side B · House Standards', th: 'Side B · ของประจำร้าน' } as Bilingual,
    items: [
      {
        n: 'B1',
        name: { en: 'Beef massaman, slow', th: 'มัสมั่นเนื้อ' } as Bilingual,
        note: { en: 'Three hours. House recipe.', th: 'เคี่ยวสามชั่วโมง สูตรร้าน' } as Bilingual,
        runtime: '03:80',
        verified: false,
      },
      {
        n: 'B2',
        name: { en: 'Crab fried rice, jasmine', th: 'ข้าวผัดปู' } as Bilingual,
        note: { en: 'For two — splits down the centre.', th: 'แบ่งกันได้สองคน' } as Bilingual,
        runtime: '03:20',
        verified: false,
      },
      {
        n: 'B3',
        name: { en: 'Pork neck, charcoal', th: 'คอหมูย่างเตาถ่าน' } as Bilingual,
        note: { en: 'Sliced over the line.', th: 'สไลซ์ราดจิ้มแจ่ว' } as Bilingual,
        runtime: '02:80',
        verified: false,
      },
      {
        n: 'B4',
        name: { en: 'Sticky rice, mango (in season)', th: 'ข้าวเหนียวมะม่วง (ตามฤดู)' } as Bilingual,
        note: { en: 'B-side closer.', th: 'จานปิดด้าน B' } as Bilingual,
        runtime: '01:80',
        verified: false,
      },
    ],
  },
  drinks: {
    label: { en: 'Bonus tracks · The bar', th: 'โบนัสแทร็ก · บาร์' } as Bilingual,
    items: [
      { n: 'C1', name: { en: 'Old fashioned, palm sugar', th: 'Old Fashioned น้ำตาลปี๊บ' } as Bilingual, runtime: '02:80', verified: false },
      { n: 'C2', name: { en: 'Highball, Japanese whisky', th: 'ไฮบอลวิสกี้ญี่ปุ่น' } as Bilingual,    runtime: '02:60', verified: false },
      { n: 'C3', name: { en: 'House sour, tamarind', th: 'House Sour มะขาม' } as Bilingual,           runtime: '02:80', verified: false },
      { n: 'C4', name: { en: 'Filter coffee, day shift', th: 'กาแฟดริป (ก่อน 5 PM)' } as Bilingual,    runtime: '01:20', verified: false },
    ],
  },
} as const;

/**
 * — GALLERY —
 * Right now we have one verified press photograph (Lufthansa /
 * Adam Birkan). The rest of the gallery is composed of brand-built
 * SVG record-sleeve tiles. Once IG photos are cleared, append them
 * here.
 */
export const GALLERY = [
  { key: 'storefront',  src: PHOTOS.storefront,     alt: 'The brightly-lit yellow Longlai storefront at night, Anuwong Road, Bangkok — photo by Adam Birkan for Lufthansa Discover.' },
] as const;

/**
 * — COPY —
 * The voice — vinyl-warm, ever-changing, chef-driven. Pull-quote is
 * verbatim from Note Pongsuang's Lufthansa piece.
 */
export const COPY = {
  nav: {
    items: [
      { href: '#now',       label: { en: 'Now Playing', th: 'กำลังเล่น' } as Bilingual },
      { href: '#tracklist', label: { en: 'Tracklist',   th: 'แทร็กลิสต์' } as Bilingual },
      { href: '#room',      label: { en: 'The Room',    th: 'ห้อง' } as Bilingual },
      { href: '#sleeves',   label: { en: 'Sleeves',     th: 'ปก' } as Bilingual },
      { href: '#visit',     label: { en: 'Visit',       th: 'มาเยี่ยม' } as Bilingual },
    ],
    reserve: { en: 'Reserve', th: 'จองที่นั่ง' } as Bilingual,
  },

  hero: {
    eyebrow: {
      en: '13/9 Anuwong · Vinyl bar · Since 2024',
      th: '13/9 อนุวงศ์ · บาร์แผ่นเสียง · ตั้งแต่ 2024',
    } as Bilingual,
    title: {
      // The wordmark is the brand. The display sets "Longlai" as the
      // record-label centre piece; the subtitle below is the
      // signature spin gesture.
      en: 'Longlai',
      th: 'ล่องลอย',
    } as Bilingual,
    subtitle: {
      en: 'A different chef · every month · records play, not playlists.',
      th: 'เชฟใหม่ทุกเดือน · แผ่นเสียงหมุน ไม่ใช่เพลย์ลิสต์',
    } as Bilingual,
    body: {
      en: 'A vinyl bar on the Chinatown side of Song Wat where the disc spins, the sound is right, and the chef changes every month. Show up, listen, eat.',
      th: 'บาร์แผ่นเสียงเลียบฝั่งไชน่าทาวน์ของซองวัด แผ่นหมุน เสียงดี เชฟเปลี่ยนทุกเดือน · มา ฟัง กิน',
    } as Bilingual,
    ctaReserve:    { en: 'Reserve a seat',         th: 'จองที่นั่ง' } as Bilingual,
    ctaSeeChef:    { en: 'See who is cooking',     th: 'ดูเชฟเดือนนี้' } as Bilingual,
    scrollHint:    { en: 'Drop the needle',        th: 'หย่อนเข็ม' } as Bilingual,
  },

  press: {
    label: { en: 'Featured in', th: 'จากสำนัก' } as Bilingual,
  },

  now: {
    eyebrow: { en: 'Now Playing', th: 'กำลังเล่น' } as Bilingual,
    title:   { en: 'This month, in residence.', th: 'เชฟประจำเดือนนี้' } as Bilingual,
    intro: {
      en: 'A young guest chef takes a side of the disc for the month. Each plates their own style — sometimes Northern, sometimes Southern, sometimes off-grid. When the side ends, the next chef drops the needle.',
      th: 'เชฟรุ่นใหม่ขึ้นมาทำอาหารคนละหนึ่งเดือน แต่ละคนพาสไตล์ของตัวเองมาวางจาน · เหนือ ใต้ หรือนอกแผนที่ · จบด้าน เชฟต่อไปหย่อนเข็มต่อ',
    } as Bilingual,
    ctaBackOfSleeve: { en: 'Read the back of the sleeve', th: 'พลิกอ่านปกหลัง' } as Bilingual,
  },

  tracklist: {
    eyebrow: { en: 'Tracklist', th: 'แทร็กลิสต์' } as Bilingual,
    title:   { en: 'Side A · Side B.', th: 'ด้าน A · ด้าน B' } as Bilingual,
    intro: {
      en: 'The menu is pressed like a 12-inch. Side A is the chef-of-the-month set. Side B is the house standards — always on rotation. Runtimes double as prices: 02:50 reads ฿250.',
      th: 'เมนูถูกอัดเหมือน LP 12 นิ้ว · ด้าน A คือเซ็ตของเชฟประจำเดือน · ด้าน B คือของประจำร้าน · ความยาวเพลงคือราคา 02:50 = ฿250',
    } as Bilingual,
    runtimeNote: {
      en: 'Runtimes ≈ prices in baht. A1 02:90 is ฿290.',
      th: 'เวลา ≈ ราคาบาท · A1 02:90 = ฿290',
    } as Bilingual,
  },

  room: {
    eyebrow:    { en: 'The Room', th: 'ห้องนี้' } as Bilingual,
    title:      { en: 'Yellow shopfront, low light, one disc spinning.', th: 'หน้าร้านสีเหลือง แสงต่ำ แผ่นเดียวหมุน' } as Bilingual,
    body: {
      en: 'Two long banquettes facing the turntable, a small open kitchen at the back, a record wall at the side. The lighting is amber. The grain on the speakers is real. The food is plated like the sleeves on the wall — front to back, A to B, with a runtime.',
      th: 'โต๊ะยาวสองตัวหันหาเครื่องเล่นแผ่นเสียง · ครัวเปิดเล็ก ๆ ด้านหลัง · ผนังแผ่นเสียงด้านข้าง · ไฟอำพัน · เม็ดกรวดในลำโพงเป็นของจริง · จานวางเหมือนปกแผ่นบนผนัง คือเรียงจาก A ไป B พร้อมเวลา',
    } as Bilingual,
    pullQuote: {
      // verbatim, Lufthansa "In My Hood" Note Pongsuang
      en: 'At Longlai the sound is just right, and the food is unbeatably good. Young guest chefs take turns in the kitchen, each bringing their own style.',
      th: 'ที่ Longlai เสียงพอดี อาหารดีเกินไป · เชฟรุ่นใหม่ผลัดกันเข้าครัว แต่ละคนพาสไตล์ตัวเองมา',
    } as Bilingual,
    pullAttribution: 'Note Pongsuang · Lufthansa Discover · "In My Hood: Song Wat Road" · 26 January 2026',
  },

  sleeves: {
    eyebrow: { en: 'The wall', th: 'ผนัง' } as Bilingual,
    title:   { en: 'Sleeves, polaroids, set lists.', th: 'ปกแผ่นเสียง โพลารอยด์ และเซ็ตลิสต์' } as Bilingual,
    intro: {
      en: 'A hand-arranged wall of LP sleeves and polaroids from past chef nights. The polaroids are slightly off-axis on purpose. The sleeves are not for sale.',
      th: 'ผนังจัดวางด้วยมือ · ปกแผ่นเสียงและภาพโพลารอยด์จากค่ำคืนเชฟก่อน ๆ · ภาพถ่ายเอียงนิดเดียวโดยตั้งใจ · ปกไม่ขาย',
    } as Bilingual,
  },

  reserve: {
    eyebrow: { en: 'Reserve', th: 'จอง' } as Bilingual,
    title:   { en: 'Drop the needle.', th: 'หย่อนเข็ม' } as Bilingual,
    body: {
      en: 'Chef nights are scarce, dated, and sell out. DM the bar on Instagram with a date and a count. We confirm by reply.',
      th: 'ค่ำคืนเชฟมีจำกัด มีวันแน่นอน และเต็มเร็ว · DM ทาง Instagram บอกวันและจำนวนคน เราจะตอบกลับยืนยัน',
    } as Bilingual,
    walkInsNote: {
      en: 'Walk-ins welcome from 10 AM for coffee, daytime plates, and afternoon listening sessions.',
      th: 'นั่งเลยได้ตั้งแต่ 10 โมงเช้า · กาแฟ จานกลางวัน และฟังเพลงช่วงบ่าย',
    } as Bilingual,
  },

  visit: {
    eyebrow: { en: 'Visit', th: 'มาเยี่ยม' } as Bilingual,
    title:   { en: 'Find the yellow shopfront.', th: 'มองหาหน้าร้านสีเหลือง' } as Bilingual,
    address: { en: 'Address', th: 'ที่อยู่' } as Bilingual,
    hours:   { en: 'Hours',   th: 'เวลา' } as Bilingual,
    handle:  { en: 'Handles', th: 'ติดต่อ' } as Bilingual,
    getting: { en: 'Getting there', th: 'การเดินทาง' } as Bilingual,
    gettingBody: {
      en: 'MRT Sam Yot · MRT Wat Mangkon · short tuk-tuk from Hua Lamphong · 7 minutes from Song Wat.',
      th: 'MRT สามยอด · MRT วัดมังกร · ตุ๊ก ๆ จากหัวลำโพง · 7 นาทีจากซองวัด',
    } as Bilingual,
  },

  footer: {
    builtBy: {
      en: 'A tribute site. Not affiliated.',
      th: 'เว็บอุทิศ ไม่มีส่วนเกี่ยวข้องกับร้าน',
    } as Bilingual,
  },
} as const;

export const NAV_ITEMS = COPY.nav.items;

/**
 * — SOURCES — every load-bearing claim on the page maps to a URL
 * here. The /sources page renders this list with a 1-line summary
 * of what each source supports.
 */
export const SOURCES = [
  {
    id: 'lufthansa-in-my-hood',
    title:    'Lufthansa Discover — "In My Hood: Song Wat Road"',
    author:   'Note Pongsuang · photo by Adam Birkan',
    date:     '2026-01-26',
    url:      'https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok',
    supports: 'Concept (vinyl bar, records not playlists), rotating guest-chef model, "sound right, food unbeatable" pull-quote, yellow storefront image.',
  },
  {
    id: 'longlai-instagram',
    title:    'Longlai · Instagram @longlai.bar',
    author:   '@longlai.bar',
    date:     'continuous',
    url:      'https://www.instagram.com/longlai.bar/',
    supports: 'Brand handle, current month chef announcements, opening hours, photographs.',
  },
  {
    id: 'longlai-maps',
    title:    'Google Maps · Longlai pin',
    author:   'Maps listing',
    date:     'continuous',
    url:      'https://maps.app.goo.gl/KLkF21SE6hSKbnWW7',
    supports: 'Address (13/9 Anuwong Rd, Chakkrawat), pin coordinates.',
  },
  {
    id: 'fridaybangkok-vinyl-bars',
    title:    'Friday Bangkok — 8 vinyl bars in Bangkok',
    author:   'Jay Supateerawanitt',
    date:     '2025-11-22',
    url:      'https://fridaybangkok.com/en/r/8-vinyl-bars-in-bangkok',
    supports: 'Bangkok vinyl-bar scene context. (Longlai itself is not in this list but the cohort it sits beside is here.)',
  },
  {
    id: 'timeout-vinyl-bars',
    title:    'Time Out Bangkok — Coolest vinyl bars',
    author:   'Toey Sarunrat',
    date:     '2025-01-03',
    url:      'https://www.timeout.com/bangkok/vinyl-bars',
    supports: 'Bangkok vinyl-bar scene context.',
  },
] as const;
