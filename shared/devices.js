/* ============================================
   YKS Mobile View — Device Presets (Single Source)
   ============================================ */

const DEVICE_PRESETS = {
  // ── iPhones ──
  'iphone-4s': {
    name: 'iPhone 4s',
    width: 320,
    height: 480,
    scale: 1,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/9.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-se': {
    name: 'iPhone SE',
    width: 320,
    height: 568,
    scale: 2,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-7': {
    name: 'iPhone 7',
    width: 375,
    height: 667,
    scale: 2,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-8': {
    name: 'iPhone 8',
    width: 375,
    height: 667,
    scale: 2,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-x': {
    name: 'iPhone X',
    width: 375,
    height: 812,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-11': {
    name: 'iPhone 11',
    width: 414,
    height: 896,
    scale: 2,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-12': {
    name: 'iPhone 12',
    width: 390,
    height: 844,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-13': {
    name: 'iPhone 13',
    width: 390,
    height: 844,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-14': {
    name: 'iPhone 14',
    width: 393,
    height: 852,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-15': {
    name: 'iPhone 15',
    width: 393,
    height: 852,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-16': {
    name: 'iPhone 16',
    width: 393,
    height: 852,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-12-pro-max': {
    name: 'iPhone 12 Pro Max',
    width: 428,
    height: 926,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-13-pro-max': {
    name: 'iPhone 13 Pro Max',
    width: 428,
    height: 926,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-14-pro-max': {
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-15-pro-max': {
    name: 'iPhone 15 Pro Max',
    width: 440,
    height: 932,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'iphone-16-pro-max': {
    name: 'iPhone 16 Pro Max',
    width: 440,
    height: 956,
    scale: 3,
    type: 'phone',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
  },

  // ── Samsung Galaxy ──
  'galaxy-s4': {
    name: 'Galaxy S4',
    width: 360,
    height: 640,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.105 Mobile Safari/537.36'
  },
  'galaxy-s8-plus': {
    name: 'Galaxy S8+',
    width: 360,
    height: 740,
    scale: 4,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 7.0; SM-G955F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36'
  },
  'galaxy-s20': {
    name: 'Galaxy S20',
    width: 360,
    height: 800,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.119 Mobile Safari/537.36'
  },
  'galaxy-s21': {
    name: 'Galaxy S21',
    width: 360,
    height: 800,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36'
  },
  'galaxy-s22': {
    name: 'Galaxy S22',
    width: 360,
    height: 780,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36'
  },
  'galaxy-s23': {
    name: 'Galaxy S23',
    width: 360,
    height: 780,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.137 Mobile Safari/537.36'
  },
  'galaxy-s24': {
    name: 'Galaxy S24',
    width: 360,
    height: 780,
    scale: 3,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },
  'galaxy-s24-ultra': {
    name: 'Galaxy S24 Ultra',
    width: 412,
    height: 915,
    scale: 3.5,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },
  'galaxy-a54': {
    name: 'Galaxy A54',
    width: 412,
    height: 915,
    scale: 2.625,
    type: 'phone',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 13; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.137 Mobile Safari/537.36'
  },

  // ── Google Pixel ──
  'pixel-5': {
    name: 'Google Pixel 5',
    width: 393,
    height: 851,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Mobile Safari/537.36'
  },
  'pixel-5a': {
    name: 'Google Pixel 5a',
    width: 412,
    height: 860,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 12; Pixel 5a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36'
  },
  'pixel-6': {
    name: 'Google Pixel 6',
    width: 412,
    height: 869,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36'
  },
  'pixel-7': {
    name: 'Google Pixel 7',
    width: 412,
    height: 869,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.137 Mobile Safari/537.36'
  },
  'pixel-8': {
    name: 'Google Pixel 8',
    width: 412,
    height: 869,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },
  'pixel-8-pro': {
    name: 'Google Pixel 8 Pro',
    width: 430,
    height: 932,
    scale: 3.75,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },
  'pixel-9': {
    name: 'Google Pixel 9',
    width: 412,
    height: 915,
    scale: 2.625,
    type: 'phone',
    brand: 'google',
    ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },

  // ── Other Phones ──
  'redmi-note-9': {
    name: 'Xiaomi Redmi Note 9',
    width: 393,
    height: 851,
    scale: 2.5,
    type: 'phone',
    brand: 'xiaomi',
    ua: 'Mozilla/5.0 (Linux; Android 11; Redmi Note 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
  },
  'redmi-note-12': {
    name: 'Xiaomi Redmi Note 12',
    width: 393,
    height: 873,
    scale: 2.5,
    type: 'phone',
    brand: 'xiaomi',
    ua: 'Mozilla/5.0 (Linux; Android 13; Redmi Note 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.137 Mobile Safari/537.36'
  },
  'sony-xz1-compact': {
    name: 'Sony XZ1 Compact',
    width: 360,
    height: 640,
    scale: 2,
    type: 'phone',
    brand: 'sony',
    ua: 'Mozilla/5.0 (Linux; Android 8.0; XZ1 Compact) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3329.83 Mobile Safari/537.36'
  },
  'oneplus-12': {
    name: 'OnePlus 12',
    width: 412,
    height: 915,
    scale: 3,
    type: 'phone',
    brand: 'oneplus',
    ua: 'Mozilla/5.0 (Linux; Android 14; CPH2573) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  },

  // ── Tablets ──
  'tablet-7-generic': {
    name: 'Tablet 7"',
    width: 600,
    height: 1024,
    scale: 1.5,
    type: 'tablet',
    brand: 'generic',
    ua: 'Mozilla/5.0 (Linux; Android 11; SM-T510) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Safari/537.36'
  },
  'lenovo-tab-m9': {
    name: 'Lenovo Tab M9',
    width: 800,
    height: 1280,
    scale: 2,
    type: 'tablet',
    brand: 'lenovo',
    ua: 'Mozilla/5.0 (Linux; Android 11; Lenovo TB-8705F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Safari/537.36'
  },
  'tcl-tab-10': {
    name: 'TCL Tab 10',
    width: 800,
    height: 1280,
    scale: 2,
    type: 'tablet',
    brand: 'tcl',
    ua: 'Mozilla/5.0 (Linux; Android 11; TCL TAB 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Safari/537.36'
  },
  'ipad-air-11': {
    name: 'iPad Air 11"',
    width: 820,
    height: 1180,
    scale: 2,
    type: 'tablet',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'lenovo-tab-p12': {
    name: 'Lenovo Tab P12',
    width: 1024,
    height: 1366,
    scale: 2,
    type: 'tablet',
    brand: 'lenovo',
    ua: 'Mozilla/5.0 (Linux; Android 11; Lenovo TB-X605F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Safari/537.36'
  },
  'ipad-air-13': {
    name: 'iPad Air 13"',
    width: 1032,
    height: 1376,
    scale: 2,
    type: 'tablet',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'ipad-pro-11': {
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    scale: 2,
    type: 'tablet',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'ipad-pro-12-9': {
    name: 'iPad Pro 12.9"',
    width: 1024,
    height: 1366,
    scale: 2,
    type: 'tablet',
    brand: 'apple',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  'galaxy-view': {
    name: 'Samsung Galaxy View',
    width: 1080,
    height: 1920,
    scale: 1,
    type: 'tablet',
    brand: 'samsung',
    ua: 'Mozilla/5.0 (Linux; Android 11; SM-T875) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Safari/537.36'
  }
};

const DEVICE_CATEGORIES = {
  phones: {
    label: 'PHONES',
    devices: Object.keys(DEVICE_PRESETS).filter(id => DEVICE_PRESETS[id].type === 'phone')
  },
  tablets: {
    label: 'TABLETS',
    devices: Object.keys(DEVICE_PRESETS).filter(id => DEVICE_PRESETS[id].type === 'tablet')
  }
};

const BRAND_ICONS = {
  apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
  samsung: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.004 5.293L11.996 1l9.001 4.293v4.293c0 5.249-3.86 10.108-9.001 11.414-5.141-1.306-9.001-6.165-9.001-11.414V5.293z"/></svg>',
  google: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>',
  xiaomi: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  sony: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  oneplus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  lenovo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  tcl: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  generic: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>'
};


