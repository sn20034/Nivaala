// Central image config — every photo on the site lives here.
// All URLs are real Pexels stock photos (license-free, no watermark).
// Replace any slot with your own photo by changing the `src` value.

const px = (url, w = 800) => {
  if (!url) return url;
  if (url.includes('?')) return url;
  return `${url}?auto=compress&cs=tinysrgb&w=${w}`;
};

export const images = {
  // ── Hero ──────────────────────────────────────────────
  hero: {
    src: px('https://images.pexels.com/photos/11347737/pexels-photo-11347737.jpeg', 1200),
    alt: 'Indian home kitchen with steel utensils and warm morning light',
    focal: 'center 40%',
  },

  // ── Categories ────────────────────────────────────────
  categories: {
    lunch: {
      src: px('https://images.pexels.com/photos/32797056/pexels-photo-32797056.jpeg'),
      alt: 'Vegetarian Indian lunch thali with rice, dal, sabzi and roti',
      focal: 'center',
    },
    dinner: {
      src: px('https://images.pexels.com/photos/36125185/pexels-photo-36125185.jpeg'),
      alt: 'Indian dinner with dal, roti and sabzi on a steel plate',
      focal: 'center',
    },
    trialPack: {
      src: px('https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg'),
      alt: 'Stacked tiffin boxes packed with Indian home-cooked food',
      focal: 'center',
    },
    skipPause: {
      src: px('https://images.pexels.com/photos/36478888/pexels-photo-36478888.jpeg'),
      alt: 'Calm Indian kitchen scene with packed food',
      focal: 'center 60%',
    },
  },

  // ── Menu dishes (at least 11) ─────────────────────────
  menu: {
    roti: {
      src: px('https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg'),
      alt: 'Fresh hot roti and chapati on a plate',
      focal: 'center',
    },
    rice: {
      src: px('https://images.pexels.com/photos/8148149/pexels-photo-8148149.jpeg'),
      alt: 'Steamed jeera rice in a bowl',
      focal: 'center',
    },
    dal: {
      src: px('https://images.pexels.com/photos/36478888/pexels-photo-36478888.jpeg'),
      alt: 'Bowls of dal with roti and rice',
      focal: 'center',
    },
    sabzi: {
      src: px('https://images.pexels.com/photos/32797056/pexels-photo-32797056.jpeg'),
      alt: 'Mixed vegetable sabzi on a thali',
      focal: 'center',
    },
    kadhi: {
      src: px('https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg'),
      alt: 'Kadhi with steamed rice',
      focal: 'center',
    },
    khichdi: {
      src: px('https://images.pexels.com/photos/8148149/pexels-photo-8148149.jpeg'),
      alt: 'Comforting khichdi in a bowl',
      focal: 'center',
    },
    rajma: {
      src: px('https://images.pexels.com/photos/36125185/pexels-photo-36125185.jpeg'),
      alt: 'Rajma curry with rice',
      focal: 'center',
    },
    paneer: {
      src: px('https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg'),
      alt: 'Paneer sabzi with roti',
      focal: 'center',
    },
    seasonalSpecial: {
      src: px('https://images.pexels.com/photos/36478888/pexels-photo-36478888.jpeg'),
      alt: 'Seasonal special Indian vegetarian dish',
      focal: 'center',
    },
    sweetDish: {
      src: px('https://images.pexels.com/photos/13040266/pexels-photo-13040266.jpeg'),
      alt: 'Indian sweet dish kheer with nuts',
      focal: 'center',
    },
    curd: {
      src: px('https://images.pexels.com/photos/33430555/pexels-photo-33430555.jpeg'),
      alt: 'Fresh curd in a bowl',
      focal: 'center',
    },
  },

  // ── Kitchen process photos (7) ────────────────────────
  kitchen: {
    // TODO: replace with real photo — bright Indian home kitchen, aunty cooking, steel utensils
    hero: {
      src: '/images/kitchen-hero.jpg',
      alt: 'Indian aunty cooking in a bright home kitchen with steel utensils',
      focal: 'center 40%',
    },
    // TODO: replace with real photo — Indian hands cooking or rolling roti
    trailClip: {
      src: '/images/kitchen-trail-clip.jpg',
      alt: 'Indian hands rolling roti or cooking in a clean kitchen',
      focal: 'center 40%',
    },
    washingVegetables: {
      src: px('https://images.pexels.com/photos/12673949/pexels-photo-12673949.jpeg'),
      alt: 'Hands washing fresh vegetables in a kitchen sink',
      focal: 'center 40%',
    },
    cooking: {
      src: px('https://images.pexels.com/photos/36082977/pexels-photo-36082977.jpeg'),
      alt: 'Indian woman cooking on a stove with steel pots',
      focal: 'center',
    },
    packing: {
      src: px('https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg'),
      alt: 'Packing tiffin boxes with Indian food',
      focal: 'center',
    },
    delivery: {
      src: px('https://images.pexels.com/photos/11347737/pexels-photo-11347737.jpeg'),
      alt: 'Kitchen counter with packed tiffins ready for delivery',
      focal: 'center 50%',
    },
    kitchenWide: {
      src: px('https://images.pexels.com/photos/11347737/pexels-photo-11347737.jpeg', 1200),
      alt: 'Wide view of an Indian home kitchen with warm light',
      focal: 'center',
    },
    storage: {
      src: px('https://images.pexels.com/photos/14445303/pexels-photo-14445303.jpeg'),
      alt: 'Kitchen storage with steel containers and spices',
      focal: 'center',
    },
    handwashing: {
      src: px('https://images.pexels.com/photos/12673949/pexels-photo-12673949.jpeg'),
      alt: 'Hands being washed in a clean kitchen',
      focal: 'center 40%',
    },
  },

  // ── Aunties (4 portraits) ─────────────────────────────
  aunties: {
    1: {
      src: px('https://images.pexels.com/photos/29784226/pexels-photo-29784226.jpeg'),
      alt: 'Indian woman cooking in a home kitchen',
      focal: 'center 30%',
    },
    2: {
      src: px('https://images.pexels.com/photos/36082977/pexels-photo-36082977.jpeg'),
      alt: 'Indian aunty preparing food with traditional utensils',
      focal: 'center 40%',
    },
    3: {
      src: px('https://images.pexels.com/photos/36500351/pexels-photo-36500351.jpeg'),
      alt: 'Elderly Indian woman cooking a traditional meal',
      focal: 'center 30%',
    },
    4: {
      src: px('https://images.pexels.com/photos/37196707/pexels-photo-37196707.jpeg'),
      alt: 'Indian woman smiling in a kitchen',
      focal: 'center 30%',
    },
  },

  // ── Hostels ───────────────────────────────────────────
  hostels: {
    hostelBanner: {
      src: px('https://images.pexels.com/photos/39006532/pexels-photo-39006532.jpeg', 1200),
      alt: 'Group of Indian students on a college campus',
      focal: 'center',
    },
    hostelMess: {
      src: px('https://images.pexels.com/photos/5147364/pexels-photo-5147364.jpeg', 1200),
      alt: 'Indian university hostel building',
      focal: 'center',
    },
    studentsEating: {
      src: px('https://images.pexels.com/photos/31968811/pexels-photo-31968811.jpeg'),
      alt: 'Indian students eating together',
      focal: 'center',
    },
  },

  // ── Student life ──────────────────────────────────────
  student: {
    boxUnboxing: {
      src: px('https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg'),
      alt: 'Student opening a tiffin box at a study desk',
      focal: 'center',
    },
    studentsAtDesk: {
      src: px('https://images.pexels.com/photos/39006532/pexels-photo-39006532.jpeg'),
      alt: 'Indian students studying together',
      focal: 'center',
    },
  },

  // ── Live feed background ──────────────────────────────
  liveFeed: {
    src: px('https://images.pexels.com/photos/11347737/pexels-photo-11347737.jpeg', 1200),
    alt: 'Live kitchen feed showing cooking in progress',
    focal: 'center',
  },

  // ── OG / social share ─────────────────────────────────
  og: {
    src: px('https://images.pexels.com/photos/11347737/pexels-photo-11347737.jpeg', 1200),
    alt: 'Nivaala — Indian home-style vegetarian meals for students',
    focal: 'center',
  },
};

// ── Videos ────────────────────────────────────────────────
// TODO: replace with real Nivaala kitchen videos
export const videos = [
  {
    id: 'v1',
    title: 'Washing vegetables',
    duration: '0:45',
    category: 'Washing',
    thumbnail: images.kitchen.washingVegetables.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v2',
    title: 'Cooking dal',
    duration: '1:20',
    category: 'Cooking',
    thumbnail: images.kitchen.cooking.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v3',
    title: 'Rolling rotis',
    duration: '0:55',
    category: 'Cooking',
    thumbnail: images.menu.roti.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v4',
    title: 'Packing with names',
    duration: '0:38',
    category: 'Packing',
    thumbnail: images.kitchen.packing.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v5',
    title: 'Delivery run',
    duration: '1:05',
    category: 'Delivery',
    thumbnail: images.kitchen.delivery.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v6',
    title: "Auntie's story",
    duration: '2:30',
    category: 'Stories',
    thumbnail: images.aunties[1].src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v7',
    title: 'Open Kitchen Day',
    duration: '3:10',
    category: 'Events',
    thumbnail: images.kitchen.kitchenWide.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
  {
    id: 'v8',
    title: 'Weekly menu preview',
    duration: '1:45',
    category: 'Cooking',
    thumbnail: images.categories.lunch.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  },
];

/** Map a meal name to the best matching menu image slot. */
export function mealImage(name = '') {
  const n = name.toLowerCase();
  if (n.includes('roti') || n.includes('phulka') || n.includes('chapati') || n.includes('paratha')) return images.menu.roti;
  if (n.includes('rice') || n.includes('chawal')) return images.menu.rice;
  if (n.includes('khichdi')) return images.menu.khichdi;
  if (n.includes('kadhi')) return images.menu.kadhi;
  if (n.includes('rajma')) return images.menu.rajma;
  if (n.includes('paneer')) return images.menu.paneer;
  if (n.includes('curd') || n.includes('dahi')) return images.menu.curd;
  if (n.includes('halwa') || n.includes('sweet') || n.includes('kheer') || n.includes('sheer')) return images.menu.sweetDish;
  if (n.includes('gobi') || n.includes('aloo') || n.includes('sabzi') || n.includes('veg') || n.includes('bhindi')) return images.menu.sabzi;
  if (n.includes('chole')) return images.menu.rajma;
  if (n.includes('dal')) return images.menu.dal;
  if (n.includes('papad')) return images.menu.curd;
  return images.menu.sabzi;
}

export default images;
