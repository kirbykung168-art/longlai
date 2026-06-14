/**
 * LONGLAI - single source of truth.
 *
 * Audit pass 3:
 *  - Added five real user-contributed photos of Longlai Anuwong
 *    sourced from the Longlai Google Maps listing (publicly visible,
 *    cited in SOURCES). Each verified against the venue Maps pin at
 *    13/9 Anuwong Rd to confirm the right "Longlai" (the bar) rather
 *    than the Pathum Thani "Longlai Home Cafe & Bar" or one of three
 *    other Longlai accounts on Instagram.
 *  - PHOTOS now exposes: storefrontDay, turntables, vinylWall,
 *    barCocktail, roomNight, plus the existing Lufthansa storefront.
 *  - SOURCES extended with the Google Maps listing citation.
 */

type Bilingual = { en: string; th: string };

export const BRAND = {
  name:        'Longlai',
  nameThai:    'ล่องลอย',
  nameThaiAlt: 'หลงใหล',
  tagline: {
    en: 'Records play, not playlists. A different chef every month.',
    th: 'แผ่นเสียงหมุน ไม่ใช่เพลย์ลิสต์ · เชฟใหม่ทุกเดือน',
  } as Bilingual,

  addressLine1: '13/9 Anuwong Road',
  addressLine2: 'Khwaeng Chakkrawat, Bangkok 10100',
  district:     'Chakkrawat · Chinatown / Song Wat fringe',

  hoursOpen:    'Tue–Thu · 17:30 – 00:00  ·  Fri–Sun · 17:30 – 02:00',
  hoursClosed:  'Closed Mondays · Cafe temporarily closed',

  rotationModel: 'monthly',

  introducedBy: 'Note Pongsuang, in his "In My Hood" piece for Lufthansa Discover',

  instagramHandle: '@longlai.bar',
  instagramUrl:    'https://www.instagram.com/longlai.bar/',
  // Direct DM deep-link — opens a new IG DM thread to @longlai.bar in the app on mobile, the web client on desktop. Saves a click on sellout nights.
  dmUrl:           'https://ig.me/m/longlai.bar',
  mapsUrl:         'https://maps.app.goo.gl/KLkF21SE6hSKbnWW7',

  pressPhotoCredit:    'Photograph · Adam Birkan for Lufthansa Discover',
  pressPhotoCreditUrl: 'https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok',

  lat: 13.7395,
  lng: 100.5045,

  reserveLine: {
    en: 'DM @longlai.bar to reserve',
    th: 'DM @longlai.bar เพื่อจอง',
  } as Bilingual,
} as const;

const wsrv = (upstream: string, w = 1600) =>
  `https://wsrv.nl/?url=${encodeURIComponent(upstream)}&w=${w}&output=webp&q=82`;

const LUFTHANSA_STOREFRONT =
  'https://www.lufthansa.com/content/dam/lufthansa-group/images/local_images/blog_article_img/in-my-hood-song-wat-road-bangkok/lh_blog_bangkok_restaurant_longlai_1920x823.jpg.transform/lh-dcep-transform-width-1440/img.jpg';

export const PHOTOS = {
  storefront:      wsrv(LUFTHANSA_STOREFRONT, 1800),
  storefrontWide:  wsrv(LUFTHANSA_STOREFRONT, 2400),

  // Real, user-contributed photos of Longlai Anuwong from the venue's
  // Google Maps listing. Saved locally to public/images so they're
  // stable (Maps user-photo CDN URLs include short-lived tokens). All
  // five verified at the Longlai pin: 13/9 Anuwong Rd, Chakkrawat,
  // Bangkok - confirmed via the yellow shopfront signage matching the
  // Lufthansa / Adam Birkan press photo.
  storefrontDay:    '/images/storefront-day.jpg',
  turntables:       '/images/turntables-window.jpg',
  vinylWall:        '/images/vinyl-wall.jpg',
  barCocktail:      '/images/bar-cocktail.jpg',
  roomNight:        '/images/room-night.jpg',
} as const;

export const CURRENT_CHEF = {
  verified: false,
  monthLabel: 'June 2026 · Side A',
  name: 'In rotation',
  statusLabel: 'Confirmed ten days out',
  discipline: 'A young guest chef · brought their own set',
  dates: 'Tue 4 Jun – Sun 30 Jun 2026',
  bioBack: {
    en: 'Side A is between residencies right now. The next chef is announced via Instagram about ten days before the needle drops — DM @longlai.bar to be told first.',
    th: 'ตอนนี้ Side A กำลังพักระหว่างเชฟ · เชฟคนต่อไปจะประกาศทาง Instagram ประมาณสิบวันก่อนหย่อนเข็ม · DM @longlai.bar เพื่อรู้ก่อนใคร',
  } as Bilingual,
  signatureTrack: {
    en: 'A1 · revealed at the top of the month',
    th: 'A1 · เปิดเผยต้นเดือน',
  } as Bilingual,
} as const;

export const TRACKLIST = {
  sideA: {
    label: { en: 'Side A · This Month', th: 'Side A · ประจำเดือน' } as Bilingual,
    items: [
      { n: 'A1', name: { en: 'Khanom jeen, fermented chilli', th: 'ขนมจีน น้ำพริกหมัก' } as Bilingual, note: { en: 'The signature track of June.', th: 'ทรงเด่นของเดือนมิถุนายน' } as Bilingual, runtime: '02:55', verified: false },
      { n: 'A2', name: { en: 'Crispy fish, three-flavour sauce', th: 'ปลาทอด ซอสสามรส' } as Bilingual, note: { en: 'Sweet, sour, hot — pressed to wax.', th: 'หวาน เปรี้ยว เผ็ด' } as Bilingual, runtime: '03:40', verified: false },
      { n: 'A3', name: { en: 'Wing bean salad, prawn oil', th: 'ยำถั่วพู น้ำมันกุ้ง' } as Bilingual, note: { en: 'Cold, bright, herbaceous.', th: 'เย็น สด สมุนไพร' } as Bilingual, runtime: '02:20', verified: false },
      { n: 'A4', name: { en: 'Stir-fried morning glory, fermented bean', th: 'ผัดผักบุ้ง เต้าเจี้ยว' } as Bilingual, note: { en: 'The vegetable bridge between sets.', th: 'จานผักช่วงสลับด้าน' } as Bilingual, runtime: '02:00', verified: false },
    ],
  },
  sideB: {
    label: { en: 'Side B · House Standards', th: 'Side B · ของประจำร้าน' } as Bilingual,
    items: [
      { n: 'B1', name: { en: 'Beef massaman, slow', th: 'มัสมั่นเนื้อ' } as Bilingual, note: { en: 'Three hours. House recipe.', th: 'เคี่ยวสามชั่วโมง สูตรร้าน' } as Bilingual, runtime: '03:55', verified: false },
      { n: 'B2', name: { en: 'Crab fried rice, jasmine', th: 'ข้าวผัดปู' } as Bilingual, note: { en: 'For two — splits down the centre.', th: 'แบ่งกันได้สองคน' } as Bilingual, runtime: '03:20', verified: false },
      { n: 'B3', name: { en: 'Pork neck, charcoal', th: 'คอหมูย่างเตาถ่าน' } as Bilingual, note: { en: 'Sliced over the line.', th: 'สไลซ์ราดจิ้มแจ่ว' } as Bilingual, runtime: '02:55', verified: false },
      { n: 'B4', name: { en: 'Sticky rice, mango (in season)', th: 'ข้าวเหนียวมะม่วง (ตามฤดู)' } as Bilingual, note: { en: 'B-side closer.', th: 'จานปิดด้าน B' } as Bilingual, runtime: '02:00', verified: false },
    ],
  },
  drinks: {
    label: { en: 'Bonus tracks · The bar', th: 'โบนัสแทร็ก · บาร์' } as Bilingual,
    items: [
      { n: 'C1', name: { en: 'Old fashioned, palm sugar', th: 'Old Fashioned น้ำตาลปี๊บ' } as Bilingual, runtime: '02:55', verified: false },
      { n: 'C2', name: { en: 'Highball, Japanese whisky', th: 'ไฮบอลวิสกี้ญี่ปุ่น' } as Bilingual,    runtime: '02:30', verified: false },
      { n: 'C3', name: { en: 'House sour, tamarind', th: 'House Sour มะขาม' } as Bilingual,           runtime: '02:45', verified: false },
      { n: 'C4', name: { en: 'Filter coffee, day shift', th: 'กาแฟดริป (ก่อน 5 PM)' } as Bilingual,    runtime: '01:20', verified: false },
    ],
  },
} as const;

export const GALLERY = [
  { key: 'storefront',     src: PHOTOS.storefront,     alt: 'The brightly-lit yellow Longlai storefront at night, Anuwong Road, Bangkok — photo by Adam Birkan for Lufthansa Discover.' },
  { key: 'storefrontDay',  src: PHOTOS.storefrontDay,  alt: 'Daytime view of the Longlai shopfront with the bar\'s logo across the glass doors and the chalk-graffitied frame.' },
  { key: 'turntables',     src: PHOTOS.turntables,     alt: 'A DJ at twin turntables and a mixer inside Longlai, the yellow shopfront windows looking out onto Anuwong Road behind.' },
  { key: 'vinylWall',      src: PHOTOS.vinylWall,      alt: 'The record wall at Longlai: shelves of LP sleeves, a turntable on a wooden counter, and a hand-painted vinyl mural behind.' },
  { key: 'barCocktail',    src: PHOTOS.barCocktail,    alt: 'A glass of wine and a small plate at the Longlai bar, warm red light, gold lamp, backlit liquor shelf behind.' },
  { key: 'roomNight',      src: PHOTOS.roomNight,      alt: 'Inside Longlai at night: friends and a guest performer gathered around the booth under warm purple light.' },
] as const;

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
    eyebrow: { en: '13/9 Anuwong · Vinyl bar · Since 2024', th: '13/9 อนุวงศ์ · บาร์แผ่นเสียง · ตั้งแต่ 2024' } as Bilingual,
    title:   { en: 'Longlai', th: 'ล่องลอย' } as Bilingual,
    subtitle:{ en: 'A different chef · every month · records play, not playlists.', th: 'เชฟใหม่ทุกเดือน · แผ่นเสียงหมุน ไม่ใช่เพลย์ลิสต์' } as Bilingual,
    body:    { en: 'A vinyl bar on the Chinatown side of Song Wat where the disc spins, the sound is right, and the chef changes every month. Show up, listen, eat.', th: 'บาร์แผ่นเสียงเลียบฝั่งไชน่าทาวน์ของซองวัด แผ่นหมุน เสียงดี เชฟเปลี่ยนทุกเดือน · มา ฟัง กิน' } as Bilingual,
    ctaReserve: { en: 'Reserve a seat',     th: 'จองที่นั่ง' } as Bilingual,
    ctaSeeChef: { en: 'See who is cooking', th: 'ดูเชฟเดือนนี้' } as Bilingual,
    scrollHint: { en: 'Drop the needle',    th: 'หย่อนเข็ม' } as Bilingual,
  },

  press: { label: { en: 'Featured in', th: 'จากสำนัก' } as Bilingual },

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
      en: 'The menu is pressed like a 12-inch. Side A is the chef-of-the-month set. Side B is the house standards — always on rotation. Runtimes double as prices: 02:55 reads ฿255.',
      th: 'เมนูถูกอัดเหมือน LP 12 นิ้ว · ด้าน A คือเซ็ตของเชฟประจำเดือน · ด้าน B คือของประจำร้าน · ความยาวเพลงคือราคา 02:55 = ฿255',
    } as Bilingual,
    runtimeNote: { en: 'Runtimes ≈ prices in baht. A1 02:55 is ฿255.', th: 'เวลา ≈ ราคาบาท · A1 02:55 = ฿255' } as Bilingual,
  },

  room: {
    eyebrow: { en: 'The Room', th: 'ห้องนี้' } as Bilingual,
    title:   { en: 'Yellow shopfront, low light, one disc spinning.', th: 'หน้าร้านสีเหลือง แสงต่ำ แผ่นเดียวหมุน' } as Bilingual,
    body: {
      en: 'Two long banquettes facing the turntable, a small open kitchen at the back, a record wall at the side. The lighting is amber. The grain on the speakers is real. The food is plated like the sleeves on the wall — front to back, A to B, with a runtime.',
      th: 'โต๊ะยาวสองตัวหันหาเครื่องเล่นแผ่นเสียง · ครัวเปิดเล็ก ๆ ด้านหลัง · ผนังแผ่นเสียงด้านข้าง · ไฟอำพัน · เม็ดกรวดในลำโพงเป็นของจริง · จานวางเหมือนปกแผ่นบนผนัง คือเรียงจาก A ไป B พร้อมเวลา',
    } as Bilingual,
    pullQuote: {
      en: 'At Longlai the sound is just right, and the food is unbeatably good. Young guest chefs take turns in the kitchen, each bringing their own style.',
      th: 'ที่ Longlai เสียงพอดี อาหารดีเกินไป · เชฟรุ่นใหม่ผลัดกันเข้าครัว แต่ละคนพาสไตล์ตัวเองมา',
    } as Bilingual,
    pullAttribution: 'Note Pongsuang · Lufthansa Discover · "In My Hood: Song Wat Road" · 26 January 2026',
    plate1Caption: { en: 'Plate I · The shopfront at night', th: 'จานหนึ่ง · หน้าร้านยามค่ำ' } as Bilingual,
    plate2Caption: { en: 'Plate II · Same window, daylight', th: 'จานสอง · หน้าต่างเดิม กลางวัน' } as Bilingual,
  },

  sleeves: {
    eyebrow: { en: 'The wall', th: 'ผนัง' } as Bilingual,
    title:   { en: 'Sleeves, polaroids, set lists.', th: 'ปกแผ่นเสียง โพลารอยด์ และเซ็ตลิสต์' } as Bilingual,
    intro: {
      en: 'Real photographs from inside the bar, set out by hand. Some are sleeves; the rest are polaroids from past chef nights, the turntable, the wall of records, the bar at close.',
      th: 'ภาพถ่ายจริงจากในร้าน จัดวางด้วยมือ · บางใบคือปกแผ่นเสียง · บางใบคือภาพโพลารอยด์จากค่ำคืนเชฟก่อน ๆ เครื่องเล่นแผ่นเสียง ผนังแผ่นเสียง และบาร์ตอนปิด',
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
      en: 'Walk-ins welcome from 17:30 — but chef nights sell out, so a DM ahead is the safe play. Cafe temporarily closed (not dead, just recharging).',
      th: 'วอล์กอินได้ตั้งแต่ 17:30 · แต่ค่ำคืนเชฟเต็มเร็ว ทักก่อนชัวร์กว่า · คาเฟ่ปิดชั่วคราว (พักก่อน ยังไม่ตาย)',
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
      en: 'A fan-built tribute site. Not affiliated with Longlai · @longlai.bar.',
      th: 'เว็บไซต์อุทิศโดยแฟน · ไม่มีส่วนเกี่ยวข้องกับร้าน Longlai · @longlai.bar',
    } as Bilingual,
    tributeShort: {
      en: 'Tribute · not affiliated',
      th: 'เว็บอุทิศ · ไม่มีส่วนเกี่ยวข้อง',
    } as Bilingual,
  },
} as const;

export const NAV_ITEMS = COPY.nav.items;

export const SOURCES = [
  {
    id: 'lufthansa-in-my-hood',
    title:    'Lufthansa Discover — "In My Hood: Song Wat Road"',
    author:   'Note Pongsuang · photo by Adam Birkan',
    date:     '2026-01-26',
    url:      'https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok',
    supports: 'Concept (vinyl bar, records not playlists), rotating guest-chef model, "sound right, food unbeatable" pull-quote, yellow storefront image (Plate I).',
  },
  {
    id: 'longlai-instagram',
    title:    'Longlai · Instagram @longlai.bar',
    author:   '@longlai.bar',
    date:     'continuous',
    url:      'https://www.instagram.com/longlai.bar/',
    supports: 'Brand handle, hours (Tue–Th 17:30–00:00, Fr–Su 17:30–02:00), follower context (1,592 followers, 245 posts as of June 2026).',
  },
  {
    id: 'longlai-maps-listing',
    title:    'Longlai · Google Maps listing — venue page',
    author:   'Google Maps · venue listing + user-contributed photos',
    date:     'continuous',
    url:      'https://maps.app.goo.gl/KLkF21SE6hSKbnWW7',
    supports: 'Address (13/9 Anuwong Rd, Chakkrawat), coordinates, rating (4.9 / 55 reviews), price band (฿200–400), and the five user-contributed photographs of the venue used on this page: shopfront in daylight, twin turntables at the window, the record wall, the bar with cocktail + snack, and the room at night. Each cross-checked against the yellow signage in the Lufthansa / Adam Birkan press photo to confirm Anuwong (not the unrelated Pathum Thani "Longlai Home Cafe & Bar").',
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
