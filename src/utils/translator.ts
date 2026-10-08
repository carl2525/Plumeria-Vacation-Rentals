/**
 * Plumeria Vacation Rentals - Real-Time Multilingual Translation Engine
 * 
 * Provides comprehensive, instant client-side translation across the entire website
 * (focused on Japanese as requested, plus full multilingual coverage),
 * paired with Google Translate synchronization for dynamic fallback.
 */

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  popular?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (Original)', flag: '🇺🇸' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', popular: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Simplified Chinese', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Traditional Chinese', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Filipino / Tagalog', flag: '🇵🇭' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const STORAGE_KEY = 'plumeria_selected_language';

// Comprehensive dictionary covering paragraphs, sentences, headers, cards, and buttons
export const TRANSLATION_DICTIONARY: Record<string, Record<string, string>> = {
  // ==========================================
  // TOP ANNOUNCEMENT BAR & NAVIGATION
  // ==========================================
  'Direct Inquiries: $179*/night promo rate in all units (Valid until October)': {
    ja: '直接予約特典：全室プロモーション料金 1泊$179*（10月末まで有効）',
    ko: '직접 문의 특가: 전 객シル 1박 $179* 프로모션 (10월 말까지 유효)',
    'zh-CN': '直接预订优惠：全房型每晚 $179* 促销价（有效期至10月）',
    'zh-TW': '直接預訂優惠：全房型每晚 $179* 促銷價（有效期至10月）',
    es: 'Consultas directas: tarifa promo de $179*/noche en todas las unidades (Válido hasta octubre)',
    tl: 'Direktang katanungan: $179*/gabi promo rate sa lahat ng unit (May bisa hanggang Oktubre)',
    de: 'Direktanfragen: 179 $*/Nacht Aktionspreis in allen Einheiten (Gültig bis Oktober)',
    fr: 'Demandes directes : Tarif promo de 179 $*/nuit dans toutes les unités (Valable jusqu’en octobre)',
  },
  'Direct Inquiries: $179*/night promo': {
    ja: '直接予約：1泊$179* プロモ',
    ko: '직접 문의: 1박 $179* 프로모션',
    'zh-CN': '直接预订：每晚 $179* 促销',
    'zh-TW': '直接預訂：每晚 $179* 促銷',
    es: 'Consultas directas: promo de $179*/noche',
    tl: 'Direktang katanungan: $179*/gabi promo',
  },
  'Inquire Now': {
    ja: 'お問い合わせ',
    ko: '예약 문의하기',
    'zh-CN': '立即咨询',
    'zh-TW': '立即諮詢',
    es: 'Consultar ahora',
    tl: 'Magtanong ngayon',
    de: 'Jetzt anfragen',
    fr: 'Demander maintenant',
  },
  'Call Now': {
    ja: '今すぐ電話',
    ko: '전화 문의',
    'zh-CN': '立即致电',
    'zh-TW': '立即致電',
    es: 'Llamar ahora',
    tl: 'Tumawag ngayon',
    de: 'Jetzt anrufen',
    fr: 'Appeler maintenant',
  },
  'Home': {
    ja: 'ホーム',
    ko: '홈',
    'zh-CN': '首页',
    'zh-TW': '首頁',
    es: 'Inicio',
    tl: 'Tahanan',
    de: 'Startseite',
    fr: 'Accueil',
  },
  'Suites & Rentals': {
    ja: 'お部屋一覧',
    ko: '객실 및 숙소',
    'zh-CN': '套房与房源',
    'zh-TW': '套房與房源',
    es: 'Suites y Alquileres',
    tl: 'Mga Kwarto at Rentals',
    de: 'Suiten & Unterkünfte',
    fr: 'Suites & Locations',
  },
  'Waikiki Banyan': {
    ja: 'ワイキキ・バニアン',
    ko: '와이키키 반얀',
    'zh-CN': '威基基榕树 (Waikiki Banyan)',
    'zh-TW': '威基基榕樹 (Waikiki Banyan)',
    es: 'Waikiki Banyan',
    tl: 'Waikiki Banyan',
  },
  'Amenities': {
    ja: '施設・アメニティ',
    ko: '부대시설 및 편의시설',
    'zh-CN': '设施与便利',
    'zh-TW': '設施與便利',
    es: 'Amenidades',
    tl: 'Mga Pasilidad',
    de: 'Ausstattung',
    fr: 'Équipements',
  },
  'Parking & Garage': {
    ja: '駐車場案内',
    ko: '주차장 안내',
    'zh-CN': '停车场指南',
    'zh-TW': '停車場指南',
    es: 'Estacionamiento y Garaje',
    tl: 'Paradahan at Garahe',
  },
  'House Rules': {
    ja: 'ハウスルール',
    ko: '이용 규칙',
    'zh-CN': '房屋守则',
    'zh-TW': '房屋守則',
    es: 'Reglas de la Casa',
    tl: 'Mga Patakaran sa Bahay',
  },
  'Rental Policies': {
    ja: 'レンタル利用規約',
    ko: '임대 정책',
    'zh-CN': '租赁政策',
    'zh-TW': '租賃政策',
    es: 'Políticas de Alquiler',
    tl: 'Mga Patakaran sa Pagrenta',
  },
  'Waikiki Guide': {
    ja: 'ワイキキ周辺ガイド',
    ko: '와이키키 가이드',
    'zh-CN': '威基基攻略',
    'zh-TW': '威基基攻略',
    es: 'Guía de Waikiki',
    tl: 'Gabay sa Waikiki',
  },
  'FAQ': {
    ja: 'よくあるご質問',
    ko: '자주 묻는 질문',
    'zh-CN': '常见问题',
    'zh-TW': '常見問題',
    es: 'Preguntas Frecuentes',
    tl: 'Mga Madalas Itanong',
  },
  'Contact': {
    ja: 'お問い合わせ',
    ko: '문의하기',
    'zh-CN': '联系我们',
    'zh-TW': '聯絡我們',
    es: 'Contacto',
    tl: 'Makipag-ugnayan',
  },
  'Book Direct & Save': {
    ja: '直接予約でお得に宿泊',
    ko: '직접 예약하고 할인 받기',
    'zh-CN': '官网直订，立享优惠',
    'zh-TW': '官網直訂，立享優惠',
    es: 'Reserve directo y ahorre',
    tl: 'Mag-book nang direkta at makatipid',
  },
  'Zero Resort Fees': {
    ja: 'リゾート料金 $0 (無料)',
    ko: '리조트 피 $0 (무료)',
    'zh-CN': '度假村费 $0 (免收)',
    'zh-TW': '度假村費 $0 (免收)',
    es: 'Sin cargos de resort ($0)',
    tl: '$0 Resort Fees (Libre)',
  },
  'Free Parking Included': {
    ja: '無料駐車場付き',
    ko: '무료 주차 포함',
    'zh-CN': '包含免费车位',
    'zh-TW': '包含免費車位',
    es: 'Estacionamiento gratis incluido',
    tl: 'Kasama ang Libreng Paradahan',
  },

  // ==========================================
  // HERO SECTION
  // ==========================================
  'We prepare every detail,': {
    ja: '旅の細部まで私たちが整えます、',
    ko: '모든 세부 사항을 완벽히 준비합니다,',
    'zh-CN': '我们为您打理每一个细节，',
    'zh-TW': '我們為您打理每一個細節，',
    es: 'Preparamos cada detalle,',
    tl: 'Inihahanda namin ang bawat detalye,',
  },
  'so you can focus on your vacation.': {
    ja: 'だから、あなたはバケーションに集中できます。',
    ko: '오롯이 휴가에만 집중하실 수 있도록.',
    'zh-CN': '让您尽情享受完美的度假时光。',
    'zh-TW': '讓您盡情享受完美的度假時光。',
    es: 'para que usted solo se concentre en sus vacaciones.',
    tl: 'para makapag-focus ka sa iyong bakasyon.',
  },
  'We prepare every detail, so you can focus on your vacation.': {
    ja: '旅の細部まで私たちが整えます。だから、あなたはバケーションに集中できます。',
    ko: '모든 세부 사항을 완벽히 준비하여 오롯이 휴가에만 집중하실 수 있도록 돕습니다.',
    'zh-CN': '我们为您打理每一个细节，让您尽情享受完美的度假时光。',
    'zh-TW': '我們為您打理每一個細節，讓您盡情享受完美的度假時光。',
    es: 'Preparamos cada detalle para que usted solo se concentre en sus vacaciones.',
    tl: 'Inihahanda namin ang bawat detalye para makapag-focus ka sa iyong bakasyon.',
  },
  'Spacious high-floor 1-bedroom suites at Waikiki Banyan with Full kitchens, private lanais, and free covered parking—1 block to calm Kuhio Beach with $0 resort fees.': {
    ja: 'ワイキキ・バニアンの高層階1ベッドルームスイート。フルキッチン、専用ラナイ、無料屋内駐車場付き。波穏やかなクヒオビーチまでわずか1ブロック、リゾート料金は完全無料（$0）です。',
    ko: '와이키키 반얀의 넓은 고층 1베드룸 스위트. 풀 키친, 전용 라나이, 무료 실내 주차 포함. 쿠히오 비치까지 단 1블록, 리조트 피 $0.',
    'zh-CN': '威基基榕树宽敞高楼层单卧套房，配备全套厨房、独立阳台和免费室内停车位——距宁静的库希奥海滩仅1街区，零度假村费。',
    'zh-TW': '威基基榕樹寬敞高樓層單臥套房，配備全套廚房、獨立陽台和免費室內停車位——距寧靜的庫希奧海灘僅1街區，零度假村費。',
    es: 'Espaciosas suites de 1 dormitorio en pisos altos en Waikiki Banyan con cocina completa, lanai privado y estacionamiento techado gratis: a 1 cuadra de la playa Kuhio con $0 tarifas de resort.',
    tl: 'Maluluwag na 1-bedroom suite sa mataas na palapag sa Waikiki Banyan na may buong kusina, pribadong lanai, at libreng paradahan—1 block sa Kuhio Beach na may $0 resort fees.',
  },
  'Beach|Mountain View': {
    ja: 'ビーチ＆マウンテンビュー',
    ko: '비치 & 마운틴 뷰',
    'zh-CN': '海滩与山景',
    'zh-TW': '海灘與山景',
    es: 'Vista a Playa y Montaña',
    tl: 'Tanawin sa Dagat at Bundok',
  },
  '600+ Sq. Ft. Suite': {
    ja: '広々600+平方フィート',
    ko: '600+ 평방피트 스위트',
    'zh-CN': '600+ 平方英尺套房',
    'zh-TW': '600+ 平方英尺套房',
    es: 'Suite de más de 600 pies²',
    tl: '600+ Sq. Ft. Suite',
  },
  '$179* Promo Rate': {
    ja: 'プロモ料金 1泊$179*',
    ko: '1박 $179* 프로모션 특가',
    'zh-CN': '每晚 $179* 特惠价',
    'zh-TW': '每晚 $179* 特惠價',
    es: 'Tarifa promo $179*/noche',
    tl: '$179* Promo Rate',
  },
  '180° Beach, Ocean & Mountain Views': {
    ja: 'ビーチ・オーシャン＆山々の180度眺望',
    ko: '비치, 바다, 산이 어우러진 180° 파노라마 뷰',
    'zh-CN': '180° 海滩、大洋与山脉全景',
    'zh-TW': '180° 海灘、大洋與山脈全景',
    es: 'Vistas de 180° a Playa, Océano y Montaña',
    tl: '180° Tanawin sa Dagat at Bundok',
  },
  '600+ Sq. Ft. in Total': {
    ja: '総面積600+平方フィート (約58㎡)',
    ko: '총 면적 600+ 평방피트',
    'zh-CN': '总面积 600+ 平方英尺',
    'zh-TW': '總面積 600+ 平方英尺',
    es: 'Más de 600 pies² en total',
    tl: 'Higit sa 600 Sq. Ft. Kabuuan',
  },
  'Best Value vs Hotels': {
    ja: 'ホテルに比べ圧倒的な高コスパ',
    ko: '호텔 대비 최상의 가성비',
    'zh-CN': '相比酒店更具超高性价比',
    'zh-TW': '相比酒店更具超高性價比',
    es: 'Mejor valor frente a hoteles',
    tl: 'Pinakamagandang Halaga vs Hotel',
  },
  '$179* Promo · $0 Resort Fees': {
    ja: '1泊$179* プロモ · リゾート料$0',
    ko: '$179* 프로모션 · 리조트 피 $0',
    'zh-CN': '$179* 促销 · 零度假村费',
    'zh-TW': '$179* 促銷 · 零度假村費',
    es: 'Promo de $179* · $0 Tarifas de Resort',
    tl: '$179* Promo · $0 Resort Fees',
  },
  'Explore Our Rentals': {
    ja: 'お部屋を見る',
    ko: '숙소 둘러보기',
    'zh-CN': '浏览所有房源',
    'zh-TW': '瀏覽所有房源',
    es: 'Ver nuestros alojamientos',
    tl: 'Tingnan ang Aming Rentals',
  },
  'Book on Airbnb': {
    ja: 'Airbnbで予約する',
    ko: 'Airbnb에서 예약하기',
    'zh-CN': '在 Airbnb 预订',
    'zh-TW': '在 Airbnb 預訂',
    es: 'Reservar en Airbnb',
    tl: 'Mag-book sa Airbnb',
  },
  'Direct Booking Inquiry': {
    ja: '直接予約のお問い合わせ',
    ko: '직접 예약 문의',
    'zh-CN': '官网直接咨询',
    'zh-TW': '官網直接諮詢',
    es: 'Consulta de reserva directa',
    tl: 'Direktang Katanungan sa Booking',
  },
  'Direct Inquiry': {
    ja: '直接お問い合わせ',
    ko: '직접 문의',
    'zh-CN': '直接咨询',
    'zh-TW': '直接諮詢',
    es: 'Consulta directa',
    tl: 'Direktang Katanungan',
  },
  '201 ʻOhua Ave · 1 Block to Waikiki Beach': {
    ja: '201 オフア通り · ワイキキビーチまで1ブロック',
    ko: '201 오후아 애비뉴 · 와이키키 비치까지 1블록',
    'zh-CN': '201 奥胡亚大道 · 距威基基海滩仅1街区',
    'zh-TW': '201 奧胡亞大道 · 距威基基海灘僅1街區',
    es: '201 ʻOhua Ave · A 1 cuadra de la playa de Waikiki',
    tl: '201 ʻOhua Ave · 1 Block sa Waikiki Beach',
  },
  '201 ʻOhua Avenue · Waikiki, Honolulu, Hawaiʻi': {
    ja: 'ハワイ州ホノルル市ワイキキ オフア通り201番地',
    ko: '하와이 호놀룰루 와이키키 오후아 애비뉴 201',
    'zh-CN': '夏威夷檀香山威基基奥胡亚大道201号',
    'zh-TW': '夏威夷檀香山威基基奧胡亞大道201號',
    es: '201 ʻOhua Avenue · Waikiki, Honolulu, Hawái',
    tl: '201 ʻOhua Avenue · Waikiki, Honolulu, Hawaiʻi',
  },
  'Free Covered Parking': {
    ja: '無料屋内駐車場付き',
    ko: '무료 실내 주차',
    'zh-CN': '免费室内停车场',
    'zh-TW': '免費室內停車場',
    es: 'Estacionamiento techado gratis',
    tl: 'Libreng Covered Parking',
  },
  '1 Block to Beach': {
    ja: 'ビーチまで1ブロック',
    ko: '해변까지 1블록',
    'zh-CN': '距海滩1街区',
    'zh-TW': '距海灘1街區',
    es: 'A 1 cuadra de la playa',
    tl: '1 Block sa Dagat',
  },

  // ==========================================
  // INTRO SECTION
  // ==========================================
  'Plumeria Vacation Rentals · The Waikiki Banyan Advantage': {
    ja: 'プルメリア・バケーションレンタル · ワイキキ・バニアンの魅力',
    ko: '플루메리아 베케이션 렌탈 · 와이키키 반얀의 특별함',
    'zh-CN': '鸡蛋花度假租赁 · 威基基榕树独特优势',
    'zh-TW': '雞蛋花度假租賃 · 威基基榕樹獨特優勢',
    es: 'Plumeria Vacation Rentals · La ventaja de Waikiki Banyan',
  },
  'Why our Waikiki condo rentals outclass ordinary vacation rentals.': {
    ja: 'なぜ当社のワイキキコンドミニアムは、一般的なバケーションレンタルより選ばれるのか。',
    ko: '우리의 와이키키 콘도 렌탈이 일반적인 숙소보다 뛰어난 이유.',
    'zh-CN': '为什么我们的威基基公寓租赁远胜于普通度假出租房。',
    'zh-TW': '為什麼我們的威基基公寓租賃遠勝於普通度假出租房。',
    es: 'Por qué nuestros alquileres de condominios en Waikiki superan a los comunes.',
  },
  'When searching for a Waikiki vacation rental, travelers usually face a frustrating dilemma: cramped 280 sq. ft. hotel rooms with zero kitchen facilities and $50/day surprise resort fees, or aging walk-up rentals with zero amenities.': {
    ja: 'ワイキキの宿を探す際、多くの旅行者が悩まされます。キッチンがなく毎日$50以上のリゾート料金が加算される手狭なホテル（約26㎡）か、アメニティが何もない老朽化したコンドミニアムかの二者択一です。',
    ko: '와이키키 숙소를 찾을 때, 여행객들은 답답한 딜레마에 부딪힙니다. 주방도 없고 매일 $50의 기습 리조트 피가 청구되는 좁은 호텔방(약 26㎡)이거나, 편의시설이 전혀 없는 노후된 아파트뿐이기 때문입니다.',
    'zh-CN': '寻找威基基度假住宿时，旅行者常面临纠结的困境：狭小的280平方英尺酒店客房既无厨房还要加收$50/天的意外度假村费，或者没有任何配套设施的老旧公寓。',
    'zh-TW': '尋找威基基度假住宿時，旅行者常面臨糾結的困境：狹小的280平方英尺酒店客房既無廚房還要加收$50/天的意外度假村費，或者沒有任何配套設施的老舊公寓。',
    es: 'Al buscar un alquiler vacacional en Waikiki, los viajeros suelen enfrentar un dilema: habitaciones de hotel estrechas sin cocina y con cargos sorpresa de $50/día, o condominios antiguos sin comodidades.',
  },
  'Waikiki Banyan vacation rentals give you the best of both worlds: spacious 557 sq. ft. private 1-bedroom suites with 67 sq. ft. private lanais (624 sq. ft. total), Full kitchens, free covered garage parking included ($45/night value), 180° beach, ocean, Diamond Head, and mountain vistas, paired with Oʻahu’s largest 1-acre resort recreation deck (heated pool, 2 jet spas, sauna, tennis/pickleball, and sunset BBQ grills). When you book direct in Waikiki with Plumeria Vacation Rentals, you secure the finest Waikiki short term rentals with zero hidden fees.': {
    ja: 'ワイキキ・バニアンなら、その両方の良さを兼ね備えています。557平方フィートの室内＋67平方フィートの専用ラナイ（総面積624平方フィート・約58㎡）の広々とした1ベッドルームスイート、フルキッチン、無料屋内駐車場（1泊$45相当が無料）、海・ビーチ・ダイヤモンドヘッド・山々の180度眺望。さらにオアフ島最大級の1エーカーリゾートデッキ（温水プール、ジャグジー2基、サウナ、テニスコート、BBQグリル）をご利用いただけます。プルメリア・バケーションレンタルの公式直接予約なら、隠れた追加料金なしで最高のワイキキ滞在が叶います。',
    ko: '와이키키 반얀은 두 장점을 모두 제공합니다. 전용 라나이가 딸린 624평방피트(약 58㎡) 규모의 넓은 1베드룸 스위트, 풀 키친, 무료 실내 주차(1박 $45 가치 무료 제공), 해변과 다이아몬드헤드 전경, 그리고 오아후 최대 1에이커 리조트 덱(온수 수영장, 제트 스파 2개, 사우나, 테니스장, BBQ 그릴)을 누릴 수 있습니다. 플루메리아 직접 예약 시 숨은 수수료 없이 완벽한 숙박을 누리실 수 있습니다.',
    'zh-CN': '威基基榕树度假公寓兼具两者之长：宽敞的557平方英尺单卧套房加67平方英尺私人阳台（总计624平方英尺，约58平米），全套厨房，免费室内停车位（每晚价值$45免费赠送），180°海景与钻石山景观，并独享欧胡岛最大的1英亩度假休闲露台（温水泳池、2个喷流按摩池、桑拿、网球场及烧烤设施）。通过普卢梅里亚官网直接预订，尊享零隐藏费用的高品质度假体验。',
    'zh-TW': '威基基榕樹度假公寓兼具兩者之長：寬敞的557平方英尺單臥套房加67平方英尺私人陽台（總計624平方英尺，約58平米），全套廚房，免費室內停車位（每晚價值$45免費贈送），180°海景與鑽石山景觀，並獨享歐胡島最大的1英畝度假休閒露台（溫水泳池、2個噴流按摩池、桑拿、網球場及燒烤設施）。通過普盧梅里亞官網直接預訂，尊享零隱藏費用的高品質度假體驗。',
    es: 'Waikiki Banyan le ofrece lo mejor de ambos mundos: suites de 1 dormitorio de 624 pies² en total con lanai privado, cocina completa, estacionamiento techado gratis incluido ($45/noche de valor), vistas de 180° y acceso a la terraza recreativa de 1 acre más grande de Oʻahu con $0 cargos ocultos.',
  },
  '1-Acre Resort Deck': {
    ja: '1エーカーのリゾートデッキ',
    ko: '1에이커 규모 리조트 덱',
    'zh-CN': '1英亩度假休闲露台',
    'zh-TW': '1英畝度假休閒露台',
    es: 'Terraza de resort de 1 acre',
  },
  'Heated pool, 2 jet spas, sauna & 12 BBQ pavilions': {
    ja: '温水プール、ジェットスパ2基、サウナ、12台のBBQ設備',
    ko: '온수 수영장, 제트 스파 2개, 건식 사우나 및 12개 BBQ 그릴',
    'zh-CN': '温水泳池、2个喷流按摩浴缸、桑拿和12个烧烤区',
    'zh-TW': '溫水泳池、2個噴流按摩浴缸、桑拿和12個燒烤區',
    es: 'Piscina climatizada, 2 jacuzzis, sauna y 12 parrillas BBQ',
  },
  'Free Garage Parking': {
    ja: '無料屋内駐車場パス',
    ko: '무료 주차장 이용권',
    'zh-CN': '免费车库停车通行证',
    'zh-TW': '免費車庫停車通行證',
    es: 'Estacionamiento techado gratis',
  },
  'Covered parking pass included ($45/day value at $0)': {
    ja: '滞在中の屋内駐車場パス付き（1日$45相当が$0）',
    ko: '실내 주차권 포함 (일일 $45 가치를 $0에 제공)',
    'zh-CN': '包含室内停车证（每日价值$45，享受$0免费）',
    'zh-TW': '包含室內停車證（每日價值$45，享受$0免費）',
    es: 'Pase de garaje techado incluido (valor de $45/día a $0)',
  },
  'Full Kitchen & Beach': {
    ja: 'フルキッチン＆ビーチ至近',
    ko: '풀 키친 & 해변 근접',
    'zh-CN': '全套厨房与步行至沙滩',
    'zh-TW': '全套廚房與步行至沙灘',
    es: 'Cocina completa y playa cercana',
  },
  '1 block to Kuhio Beach; cook poke & fresh meals': {
    ja: 'クヒオビーチまで1ブロック。ポキや料理が作れます',
    ko: '쿠히오 비치까지 1블록, 신선한 포케와 요리 가능',
    'zh-CN': '距库希奥海滩仅1街区，随心烹饪新鲜美食',
    'zh-TW': '距庫希奧海灘僅1街區，隨心烹飪新鮮美食',
    es: 'A 1 cuadra de Kuhio Beach; prepare sus propias comidas',
  },

  // ==========================================
  // HOTEL COMPARISON & COST SAVINGS
  // ==========================================
  'Base Rate & Resort Fees': {
    ja: '基本料金＆リゾートフィー',
    ko: '기본 요금 및 리조트 피',
    'zh-CN': '基本房费与度假村费',
    'zh-TW': '基本房費與度假村費',
    es: 'Tarifa base y cargos de resort',
  },
  '$179* / Night (Promo)': {
    ja: '1泊 $179* (プロモ特価)',
    ko: '1박 $179* (특가 프로모션)',
    'zh-CN': '每晚 $179* (促销特惠)',
    'zh-TW': '每晚 $179* (促銷特惠)',
    es: '$179* / Noche (Promo)',
  },
  '$0 Resort fees': {
    ja: 'リゾート料金 $0 (無料)',
    ko: '리조트 피 $0 (무료)',
    'zh-CN': '度假村费 $0 (免收)',
    'zh-TW': '度假村費 $0 (免收)',
    es: '$0 Tarifas de resort',
  },
  'Promotional $179*/nt': {
    ja: 'プロモーション料金 1泊$179*',
    ko: '프로모션 특가 1박 $179*',
    'zh-CN': '促销特价 $179*/晚',
    'zh-TW': '促銷特價 $179*/晚',
    es: 'Promo de $179*/noche',
  },
  '$0 Resort fees. Total 5-night stay: ~$1,060 all-in with taxes & waived cleaning (3+ nights).': {
    ja: 'リゾート料金$0。5泊の総額：税金込み・清掃費無料（3泊以上）で約$1,060。',
    ko: '리조트 피 $0. 5박 총 숙박비: 세금 및 청소비 면제(3박 이상) 포함 약 $1,060.',
    'zh-CN': '零度假村费。5晚总费用：含税及免收清洁费（3晚以上），总计约 $1,060。',
    'zh-TW': '零度假村費。5晚總費用：含稅及免收清潔費（3晚以上），總計約 $1,060。',
    es: '$0 tarifas de resort. Estadía de 5 noches: aprox. $1,060 todo incluido con impuestos y limpieza gratis (3+ noches).',
  },
  'Sheraton & Hilton:': {
    ja: 'シェラトン＆ヒルトン等：',
    ko: '쉐라톤 & 힐튼 등:',
    'zh-CN': '喜来登与希尔顿等酒店：',
    'zh-TW': '喜來登與希爾頓等酒店：',
    es: 'Sheraton y Hilton:',
  },
  '$750–$1,450/nt': {
    ja: '1泊 $750〜$1,450',
    ko: '1박 $750–$1,450',
    'zh-CN': '$750–$1,450/晚',
    'zh-TW': '$750–$1,450/晚',
    es: '$750–$1,450/noche',
  },
  'Total 5-night stay: ~$4,800–$6,500+ (includes $55–$61/day resort fees)': {
    ja: '5泊の総額：約$4,800〜$6,500以上（1日$55〜$61のリゾート料金含む）',
    ko: '5박 총 숙박비: 약 $4,800–$6,500+ (일일 $55–$61 리조트 피 포함)',
    'zh-CN': '5晚总价：约 $4,800–$6,500+（包含每日 $55–$61 度假村费）',
    'zh-TW': '5晚總價：約 $4,800–$6,500+（包含每日 $55–$61 度假村費）',
    es: 'Total 5 noches: ~$4,800–$6,500+ (incluye $55–$61/día de resort fees)',
  },
  'Save $3,700+ on room & resort fees': {
    ja: '宿泊費とリゾート料金で$3,700以上お得',
    ko: '객실료 및 리조트 피에서 $3,700 이상 절약',
    'zh-CN': '在房费与度假村费上立省 $3,700 以上',
    'zh-TW': '在房費與度假村費上立省 $3,700 以上',
    es: 'Ahorre más de $3,700 en habitación y tarifas de resort',
  },
  'Covered Garage Parking': {
    ja: '屋根付きガレージ駐車場',
    ko: '실내 전용 주차장',
    'zh-CN': '室内带顶停车场',
    'zh-TW': '室內帶頂停車場',
    es: 'Estacionamiento techado',
  },
  'Free Parking Pass': {
    ja: '無料駐車パス付き',
    ko: '무료 주차권 제공',
    'zh-CN': '免费停车通行证',
    'zh-TW': '免費停車通行證',
    es: 'Pase de estacionamiento gratis',
  },
  'Included ($0)': {
    ja: '宿泊に含まれる ($0)',
    ko: '숙박에 포함 ($0)',
    'zh-CN': '包含在房费中 ($0)',
    'zh-TW': '包含在房費中 ($0)',
    es: 'Incluido ($0)',
  },
  'Covered Garage Included': {
    ja: '屋内ガレージパスが無料',
    ko: '실내 주차 무료 포함',
    'zh-CN': '包含带顶车库通行证',
    'zh-TW': '包含帶頂車庫通行證',
    es: 'Garaje techado incluido',
  },
  'Dedicated garage pass with unlimited in-and-out privileges for your stay.': {
    ja: '滞在中は24時間何度でも出入庫可能な専用ガレージパスをご利用いただけます。',
    ko: '숙박 기간 동안 무제한 입출차가 가능한 전용 주차권이 제공됩니다.',
    'zh-CN': '入住期间提供专享车库停车卡，可无限次自由进出。',
    'zh-TW': '入住期間提供專享車庫停車卡，可無限次自由進出。',
    es: 'Pase de estacionamiento dedicado con privilegios ilimitados de entrada y salida.',
  },
  '$55–$72 / day': {
    ja: '1日あたり $55〜$72',
    ko: '하루 $55–$72',
    'zh-CN': '$55–$72 / 天',
    'zh-TW': '$55–$72 / 天',
    es: '$55–$72 / día',
  },
  'Total parking: $275–$360+ for 5 nights (plus parking tax)': {
    ja: '5泊の駐車料金：$275〜$360以上（税別）',
    ko: '5박 총 주차비: $275–$360+ (주차세 별도)',
    'zh-CN': '5晚停车总费：$275–$360+（不含停车税）',
    'zh-TW': '5晚停車總費：$275–$360+（不含停車稅）',
    es: 'Total estacionamiento: $275–$360+ por 5 noches (más impuestos)',
  },
  'Save $275–$360 on parking (5 nights)': {
    ja: '5泊で駐車料金が$275〜$360お得',
    ko: '5박 기준 주차비 $275–$360 절약',
    'zh-CN': '5晚停车费立省 $275–$360',
    'zh-TW': '5晚停車費立省 $275–$360',
    es: 'Ahorre $275–$360 en estacionamiento (5 noches)',
  },
  'Full Kitchen & Dining': {
    ja: 'フルキッチン＆ダイニング',
    ko: '풀 키친 및 다이닝',
    'zh-CN': '全套厨房与就餐区',
    'zh-TW': '全套廚房與就餐區',
    es: 'Cocina completa y comedor',
  },
  "Chef's Kitchen": {
    ja: '充実のフルキッチン',
    ko: '완비된 주방',
    'zh-CN': '主厨级完备厨房',
    'zh-TW': '主廚級完備廚房',
    es: 'Cocina completa',
  },
  'Full refrigerator, range, microwave, coffee maker, cookware & dining table.': {
    ja: '大型冷蔵庫、コンロ、オーブン、電子レンジ、コーヒーメーカー、調理器具、ダイニングテーブル完備。',
    ko: '대형 냉장고, 레인지, 전자레인지, 커피 메이커, 조리도구 및 식탁 완비.',
    'zh-CN': '全尺寸大冰箱、炉灶、微波炉、咖啡机、全套烹饪器具及餐桌。',
    'zh-TW': '全尺寸大冰箱、爐灶、微波爐、咖啡機、全套烹飪器具及餐桌。',
    es: 'Refrigerador completo, estufa, microondas, cafetera, utensilios y mesa de comedor.',
  },
  'Mini-Fridge Only': {
    ja: '小型冷蔵庫のみ',
    ko: '미니 냉장고만 제공',
    'zh-CN': '仅有迷你小冰箱',
    'zh-TW': '僅有迷你小冰箱',
    es: 'Solo frigobar pequeño',
  },
  'No kitchen; forced to dine out 3 meals/day ($180+/day for family of 4).': {
    ja: 'キッチンなし。1日3食外食が必要（4人家族で1日$180以上）。',
    ko: '주방 없음: 하루 세 끼 외식 필수 (4인 가족 기준 일일 $180 이상 지출).',
    'zh-CN': '无厨房，每日三餐必须外食（4口之家每日餐饮花费达$180以上）。',
    'zh-TW': '無廚房，每日三餐必須外食（4口之家每日餐飲花費達$180以上）。',
    es: 'Sin cocina; obligado a comer fuera las 3 comidas ($180+/día para familia de 4).',
  },
  'Save $600–$900 on dining': {
    ja: '自炊により食費を$600〜$900節約',
    ko: '외식비 $600–$900 절감',
    'zh-CN': '自炊省下 $600–$900 餐饮开支',
    'zh-TW': '自炊省下 $600–$900 餐飲開支',
    es: 'Ahorre $600–$900 en comidas',
  },
  'Total Vacation Savings': {
    ja: 'バケーション全体の節約額',
    ko: '총 휴가 비용 절약 금액',
    'zh-CN': '假期总共节省开支',
    'zh-TW': '假期總共節省開支',
    es: 'Ahorro total en vacaciones',
  },
  'Save $4,500–$7,000+': {
    ja: '$4,500〜$7,000以上お得',
    ko: '$4,500–$7,000 이상 절약',
    'zh-CN': '省下 $4,500–$7,000 以上',
    'zh-TW': '省下 $4,500–$7,000 以上',
    es: 'Ahorre $4,500–$7,000+',
  },
  '5-Night Comparison': {
    ja: '5泊のご滞在比較',
    ko: '5박 숙박 기준 비교',
    'zh-CN': '5晚入住对比',
    'zh-TW': '5晚入住對比',
    es: 'Comparación de 5 noches',
  },
  'Spend ~$1,060 with Plumeria vs. ~$2,150+ in Nearby Hotels': {
    ja: 'Plumeriaなら5泊 約$1,060（周辺ホテルは~$2,150〜$6,000以上）',
    ko: 'Plumeria 이용 시 5박 약 $1,060 (주변 호텔 ~$2,150+ 대비 대폭 절약)',
    'zh-CN': 'Plumeria 5晚仅需约 $1,060（对比周边酒店 $2,150 以上）',
    'zh-TW': 'Plumeria 5晚僅需約 $1,060（對比周邊酒店 $2,150 以上）',
    es: 'Gaste ~$1,060 con Plumeria frente a ~$2,150+ en hoteles cercanos',
  },
  'See Full Side-by-Side Comparison': {
    ja: 'ホテルとの詳細比較表を見る',
    ko: '호텔과의 상세 비교 보기',
    'zh-CN': '查看完整逐项对比',
    'zh-TW': '查看完整逐項對比',
    es: 'Ver comparación completa detallada',
  },
  'View Full Waikiki Hotel Comparison': {
    ja: 'ワイキキ主要ホテルとの徹底比較',
    ko: '와이키키 주요 호텔과의 전체 비교 보기',
    'zh-CN': '查看威基基酒店全面对比',
    'zh-TW': '查看威基基酒店全面對比',
    es: 'Ver comparación completa de hoteles de Waikiki',
  },

  // ==========================================
  // WAIKIKI BANYAN ADVANTAGE & AMENITIES
  // ==========================================
  'Waikiki Banyan Vacation Rentals · The Gold Standard': {
    ja: 'ワイキキ・バニアン · ゴールドスタンダード',
    ko: '와이키키 반얀 베케이션 렌탈 · 골드 스탠다드',
    'zh-CN': '威基基榕树度假租赁 · 黄金品质标杆',
    'zh-TW': '威基基榕樹度假租賃 · 黃金品質標杆',
    es: 'Waikiki Banyan Vacation Rentals · El estándar de oro',
  },
  'The Waikiki Banyan Advantage': {
    ja: 'ワイキキ・バニアンならではの特長',
    ko: '와이키키 반얀만의 차별화된 혜택',
    'zh-CN': '威基基榕树核心优势',
    'zh-TW': '威基基榕樹核心優勢',
    es: 'La ventaja de Waikiki Banyan',
  },
  'Discover why savvy Hawaiian travelers choose our Waikiki Banyan condo rentals over cramped beachfront hotels and standard vacation rentals.': {
    ja: 'ハワイ通の旅行者が、窮屈なビーチフロントホテルや一般的なコンドミニアムではなく、ワイキキ・バニアンを選ぶ理由をご覧ください。',
    ko: '하와이 여행 고수들이 답답한 호텔이나 일반 렌탈 대신 와이키키 반얀을 선택하는 이유를 확인해보세요.',
    'zh-CN': '了解为什么精明的夏威夷旅行者选择威基基榕树度假公寓，而不是拥挤的海滩酒店或普通出租房。',
    'zh-TW': '了解為什麼精明的夏威夷旅行者選擇威基基榕樹度假公寓，而不是擁擠的海灘酒店或普通出租房。',
    es: 'Descubra por qué los viajeros eligen Waikiki Banyan en lugar de hoteles estrechos o alquileres comunes.',
  },
  '1-Acre Resort Oasis': {
    ja: '1エーカーのリゾートオアシス',
    ko: '1에이커 규모 리조트 오아시스',
    'zh-CN': '1英亩度假绿洲',
    'zh-TW': '1英畝度假綠洲',
    es: 'Oasis de resort de 1 acre',
  },
  'While ordinary condos offer little or no pool, Banyan’s 6th-floor deck features a heated swimming pool, 2 jet hot tubs, dry sauna, tennis & pickleball, and 12 gas BBQs.': {
    ja: '一般的なコンドミニアムにはプールがないか小さめですが、バニアンの6階デッキには温水プール、ジェットジャグジー2基、ドライサウナ、テニス・ピックルボールコート、12台のガスBBQグリルが揃っています。',
    ko: '일반 콘도는 수영장이 없거나 협소하지만, 반얀 6층 덱에는 온수 수영장, 제트 스파 2개, 건식 사우나, 테니스/피클볼 코트, 12개의 가스 BBQ 그릴이 갖춰져 있습니다.',
    'zh-CN': '普通公寓通常泳池极小甚至没有，而威基基榕树6楼露台拥有温水泳池、2个喷流按摩浴缸、干桑拿房、网球和匹克球场以及12台燃气烧烤炉。',
    'zh-TW': '普通公寓通常泳池極小甚至沒有，而威基基榕樹6樓露台擁有溫水泳池、2個噴流按摩浴缸、乾桑拿房、網球和匹克球場以及12台燃氣燒烤爐。',
    es: 'Mientras otros condominios casi no tienen piscina, el piso 6 de Banyan cuenta con piscina climatizada, 2 spas, sauna, tenis y 12 parrillas BBQ.',
  },
  'Unmatched on Oʻahu': {
    ja: 'オアフ島随一の充実度',
    ko: '오아후 최고의 시설',
    'zh-CN': '欧胡岛无可比拟',
    'zh-TW': '歐胡島無可比擬',
    es: 'Inigualable en Oʻahu',
  },
  'Covered Garage Parking Included': {
    ja: '屋根付きガレージ駐車場無料',
    ko: '실내 주차장 무료 포함',
    'zh-CN': '包含免费室内停车位',
    'zh-TW': '包含免費室內停車位',
    es: 'Estacionamiento techado incluido',
  },
  'Parking in Waikiki costs up to $72/night. We include a guaranteed covered garage pass with 24/7 unlimited access.': {
    ja: 'ワイキキのホテル駐車料金は1泊最大$72にも達します。当社では24時間出入庫自由な屋内駐車パスを無料でお付けしています。',
    ko: '와이키키 주차비는 1박에 최대 $72에 이릅니다. 당사는 24시간 언제든 입출차가 가능한 무료 실내 주차권을 기본 제공합니다.',
    'zh-CN': '威基基停车费每晚高达$72。我们为您免费提供全天候24小时不限次出入的有顶车库停车证。',
    'zh-TW': '威基基停車費每晚高達$72。我們為您免費提供全天候24小時不限次出入的有頂車庫停車證。',
    es: 'El estacionamiento en Waikiki cuesta hasta $72/noche. Incluimos un pase de garaje techado con acceso 24/7.',
  },
  'Save $45–$72/Day': {
    ja: '1日あたり$45〜$72節約',
    ko: '하루 $45–$72 절약',
    'zh-CN': '每天立省 $45–$72',
    'zh-TW': '每天立省 $45–$72',
    es: 'Ahorre $45–$72/día',
  },
  'Spacious 1-Bedroom Layout': {
    ja: 'ゆとりの1ベッドルーム間取り',
    ko: '넓은 1베드룸 구조',
    'zh-CN': '宽敞的一居室套房格局',
    'zh-TW': '寬敞的一居室套房格局',
    es: 'Espacioso diseño de 1 dormitorio',
  },
  '624 total sq. ft. of living space with private bedroom, full kitchen, living area, and private lanai. Sleeps 4–6 comfortably.': {
    ja: '寝室が独立した総面積624平方フィート（約58㎡）。フルキッチン、リビング、プライベートラナイを備え、4〜6名様までゆったり宿泊可能です。',
    ko: '독립된 침실, 풀 키친, 거실, 전용 라나이를 갖춘 총 624평방피트(약 58㎡)의 여유로운 공간으로 4–6인이 편안히 숙박할 수 있습니다.',
    'zh-CN': '总面积达624平方英尺（约58平米），独立卧室、全套厨房、客厅及私人阳台，舒适入住4至6位宾客。',
    'zh-TW': '總面積達624平方英尺（約58平米），獨立臥室、全套廚房、客廳及私人陽台，舒適入住4至6位賓客。',
    es: '624 pies² totales con dormitorio privado, cocina completa, sala y lanai privado. Capacidad cómoda para 4–6 personas.',
  },
  '2x Standard Hotel Size': {
    ja: '一般ホテルの約2倍の広さ',
    ko: '일반 호텔 객실의 2배 크기',
    'zh-CN': '相当于普通酒店房间的2倍面积',
    'zh-TW': '相當於普通酒店房間的2倍面積',
    es: '2 veces el tamaño de un hotel estándar',
  },
  'Prime East Waikiki Location': {
    ja: '静かで便利な東ワイキキの好立地',
    ko: '이스트 와이키키 최상의 입지',
    'zh-CN': '东威基基绝佳地段',
    'zh-TW': '東威基基絕佳地段',
    es: 'Ubicación privilegiada en East Waikiki',
  },
  'Just 1 short block to calm Kuhio Beach lagoons, Honolulu Zoo, Diamond Head, and premier dining—away from rowdy strip noise.': {
    ja: '波の静かなクヒオビーチ、ホノルル動物園、ダイヤモンドヘッド、人気レストランまでわずか1ブロック。繁華街の騒音から離れた穏やかな環境です。',
    ko: '잔잔한 쿠히오 비치 라군, 호놀룰루 동물원, 다이아몬드 헤드, 유명 맛집까지 단 1블록 거리이며 번화가의 소음에서 벗어나 쾌적합니다.',
    'zh-CN': '距风平浪静的库希奥海滩泻湖、檀香山动物园、钻石山及精品餐厅仅1个短街区，远离闹市街头的喧闹。',
    'zh-TW': '距風平浪靜的庫希奧海灘瀉湖、檀香山動物園、鑽石山及精品餐廳僅1個短街區，遠離鬧市街頭的喧鬧。',
    es: 'A solo 1 cuadra de las tranquilas aguas de Kuhio Beach, el zoológico de Honolulu, Diamond Head y excelentes restaurantes.',
  },

  // ==========================================
  // WHY BOOK WITH PLUMERIA
  // ==========================================
  'Our Guiding Promise · The Plumeria Difference': {
    ja: '私たちの想い · プルメリアのおもてなし',
    ko: '우리의 약속 · 플루메리아의 차별성',
    'zh-CN': '我们的服务承诺 · 普卢梅里亚与众不同之处',
    'zh-TW': '我們的服務承諾 · 普盧梅里亞與眾不同之處',
    es: 'Nuestra promesa · La diferencia Plumeria',
  },
  '“We prepare for the things you shouldn’t have to think about, so you can focus on your vacation.”': {
    ja: '「あなたが旅先で悩む必要のないよう、細部まで整えてお待ちしています。心置きなくバケーションをお楽しみください。」',
    ko: '“여행지에서 신경 쓸 필요 없도록 저희가 모든 것을 준비합니다. 오직 휴가에만 집중하세요.”',
    'zh-CN': '“我们提前为您打理好无需烦恼的每一个细节，让您全心全意享受假期。”',
    'zh-TW': '“我們提前為您打理好無需煩惱的每一個細節，讓您全心全意享受假期。”',
    es: '“Preparamos las cosas en las que usted no debería pensar, para que pueda concentrarse en sus vacaciones.”',
  },
  'Vacation is about swimming in turquoise waters, watching golden sunsets, and savoring island life—not stressing over parking garages, deciphering surprise checkout fees, or feeling confined in a cramped hotel room. We anticipate and prepare every detail before you step through the door.': {
    ja: 'バケーションとは、エメラルドグリーンの海で泳ぎ、黄金色の夕日を眺め、ハワイの時間を満喫すること。駐車場の空きを探したり、チェックアウト時の想定外の請求に驚いたり、狭い部屋で息苦しさを感じる時間ではありません。お客様がドアを開ける前に、あらゆる準備を完了しています。',
    ko: '휴가란 에메랄드빛 바다에서 수영하고 황금빛 일몰을 바라보며 섬의 여유를 즐기는 것입니다. 주차장을 찾아 헤매거나 숨은 체크아웃 요금에 당황하거나 좁은 호텔방에 갇혀 있을 필요가 없습니다. 문을 열고 들어오시기 전 모든 것을 미리 준비해 드립니다.',
    'zh-CN': '度假的意义在于畅游碧波、欣赏落日并品味海岛生活——而不是为寻找停车位发愁、为退房时的意外账单费解，或是局限在狭窄的酒店客房中。在您踏进家门之前，我们已为您安排好一切。',
    'zh-TW': '度假的意義在於暢遊碧波、欣賞落日並品味海島生活——而不是為尋找停車位發愁、為退房時的意外賬單費解，或是局限在狹窄的酒店客房中。在您踏進家門之前，我們已為您安排好一切。',
    es: 'Las vacaciones consisten en nadar en aguas turquesas, contemplar atardeceres y saborear la vida isleña, no en estresarse por estacionamientos o tarifas sorpresa.',
  },
  'Thoughtful Living Space': {
    ja: '心地よい居住空間',
    ko: '세심하게 설계된 주거 공간',
    'zh-CN': '贴心舒适的居住空间',
    'zh-TW': '貼心舒適的居住空間',
    es: 'Espacio de vida acogedor',
  },
  '557 sq. ft. 1-bedroom suite + 67 sq. ft. private lanai (624 sq. ft. total) with closing bedroom doors, full kitchen, and separate living room (sleeps 4–6 guests). Plenty of room to unpack and recharge.': {
    ja: '557平方フィートの室内＋67平方フィートの専用ラナイ（総面積約58㎡）。ドアで仕切られた寝室、フルキッチン、独立リビング（4〜6名様宿泊可）。荷物を広げてくつろぐ十分な広さがあります。',
    ko: '557평방피트 침실 + 67평방피트 전용 라나이(총 624평방피트), 문으로 분리된 침실, 풀 키친, 독립된 거실(4–6인 숙박 가능). 짐을 풀고 편히 휴식할 수 있습니다.',
    'zh-CN': '557平方英尺单卧套房 + 67平方英尺私人阳台（总计624平方英尺），带独立卧室门、全套厨房及独立客厅（可住4–6人）。空间充裕，尽情放松。',
    'zh-TW': '557平方英尺單臥套房 + 67平方英尺私人陽台（總計624平方英尺），帶獨立臥室門、全套廚房及獨立客廳（可住4–6人）。空間充裕，盡情放鬆。',
    es: 'Suite de 1 dormitorio de 624 pies² totales con lanai privado, cocina completa y sala independiente (capacidad para 4–6 huéspedes).',
  },
  'View 1-Bedroom Suites': {
    ja: '1ベッドルームスイートを見る',
    ko: '1베드룸 스위트 보기',
    'zh-CN': '查看单卧套房',
    'zh-TW': '查看單臥套房',
    es: 'Ver suites de 1 dormitorio',
  },
  'Turnkey Resort Deck': {
    ja: '充実のリゾートデッキ',
    ko: '원스톱 리조트 레크리에이션 덱',
    'zh-CN': '完备的度假露台设施',
    'zh-TW': '完備的度假露台設施',
    es: 'Terraza de resort con todo incluido',
  },
  'All-inclusive access to Oʻahu’s largest 1-acre 6th-floor recreation deck: heated pool, 2 jet spas, sauna, tennis court, and 12 gas BBQs with covered picnic tables.': {
    ja: 'オアフ島最大級を誇る6階の1エーカーレクリエーションデッキ：温水プール、ジェットスパ2基、サウナ、テニスコート、屋根付きピクニックテーブル付きガスBBQグリル12台。',
    ko: '오아후 최대 1에이커 규모 6층 레크리에이션 덱 자유 이용: 온수 수영장, 제트 스파 2개, 사우나, 테니스장 및 12개 가스 BBQ 그릴.',
    'zh-CN': '免费使用欧胡岛最大的1英亩6楼休闲露台：温水泳池、2个水疗按摩池、桑拿房、网球场以及配备遮阳野餐桌的12个燃气烧烤台。',
    'zh-TW': '免費使用歐胡島最大的1英畝6樓休閒露台：溫水泳池、2個水療按摩池、桑拿房、網球場以及配備遮陽野餐桌的12個燃氣燒烤台。',
    es: 'Acceso total a la terraza de 1 acre: piscina climatizada, 2 jacuzzis, sauna, cancha de tenis y 12 parrillas BBQ.',
  },
  'Explore Resort Deck': {
    ja: 'リゾートデッキのご案内',
    ko: '리조트 덱 둘러보기',
    'zh-CN': '探索度假露台',
    'zh-TW': '探索度假露台',
    es: 'Explorar terraza del resort',
  },
  'Complimentary Beach Gear': {
    ja: '無料のビーチグッズ完備',
    ko: '무료 비치 용품 완비',
    'zh-CN': '免费配备海滩装备',
    'zh-TW': '免費配備海灘裝備',
    es: 'Equipo de playa de cortesía',
  },
  'High-end Tommy Bahama beach chairs, plush beach towels, umbrella, boogie boards, and sand toys ready in your suite on arrival.': {
    ja: 'トミー・バハマ製の高級ビーチチェア、ふかふかのビーチタオル、パラソル、ボディーボード、砂遊びセットをお部屋にご用意しています。',
    ko: '고급 토미 바하마 비치 체어, 포근한 비치 타월, 파라솔, 부기 보드, 모래놀이 장난감이 객실에 미리 준비되어 있습니다.',
    'zh-CN': '客房内已为您备齐高品质 Tommy Bahama 沙滩椅、柔软沙滩毛巾、遮阳伞、冲浪趴板及沙滩玩具。',
    'zh-TW': '客房內已為您備齊高品質 Tommy Bahama 沙灘椅、柔軟沙灘毛巾、遮陽傘、衝浪趴板及沙灘玩具。',
    es: 'Sillas de playa Tommy Bahama, toallas suaves, sombrilla, tablas de boogie y juguetes de arena listos en su suite.',
  },
  'Check Included Gear': {
    ja: 'アメニティ・備品を確認',
    ko: '포함된 용품 확인하기',
    'zh-CN': '查看配备装备',
    'zh-TW': '查看配備裝備',
    es: 'Ver equipo incluido',
  },
  'Local Superhost Care': {
    ja: '安心の現地スーパーホスト対応',
    ko: '현지 슈퍼호스트의 세심한 케어',
    'zh-CN': '当地超赞房东专业关照',
    'zh-TW': '當地超贊房東專業關照',
    es: 'Atención local de Superhost',
  },
  'Direct contact with your Honolulu host team. Keyless electronic lock self check-in, responsive local recommendations, and prompt support anytime.': {
    ja: 'ホノルル現地のホストチームと直接連絡が可能。スマートロックによる非対面セルフチェックイン、地元のおすすめ情報、迅速なサポートを提供します。',
    ko: '호놀룰루 현지 호스트 팀과 직접 소통. 스마트 도어락 비대면 셀프 체크인, 신속한 현지 추천 및 언제든 빠른 지원.',
    'zh-CN': '可直接联系檀香山本色房东团队。电子密码锁自助入住，提供地道本地出行推荐与随时随地的周到协助。',
    'zh-TW': '可直接聯絡檀香山本色房東團隊。電子密碼鎖自助入住，提供地道本地出行推薦與隨時隨地的周到協助。',
    es: 'Contacto directo con su equipo anfitrión de Honolulu. Check-in autónomo sin llave, recomendaciones locales y soporte rápido.',
  },
  'Meet Your Host': {
    ja: 'ホストについて',
    ko: '호스트 소개',
    'zh-CN': '认识您的房东',
    'zh-TW': '認識您的房東',
    es: 'Conozca a su anfitrión',
  },

  // ==========================================
  // BOOKING CTA
  // ==========================================
  'Ready for your Waikiki Getaway?': {
    ja: 'ワイキキでの特別な滞在を始めませんか？',
    ko: '와이키키 휴가를 떠날 준비가 되셨나요?',
    'zh-CN': '准备好开启您的威基基度假之旅了吗？',
    'zh-TW': '準備好開啟您的威基基度假之旅了嗎？',
    es: '¿Listo para su escapada a Waikiki?',
  },
  'Book Direct & Save · Zero Hidden Fees': {
    ja: '直接予約でお得に · 隠れた追加手数料ゼロ',
    ko: '직접 예약하고 할인 받기 · 숨은 수수료 $0',
    'zh-CN': '官网直订享优惠 · 零隐藏附加费',
    'zh-TW': '官網直訂享優惠 · 零隱藏附加費',
    es: 'Reserve directo y ahorre · Cero cargos ocultos',
  },
  'Experience the best of Waikiki at Waikiki Banyan. High-floor comfort, free covered garage parking, full kitchen, and steps from Kuhio Beach.': {
    ja: 'ワイキキ・バニアンで最高のハワイ体験を。高層階の心地よさ、無料の屋内駐車場、フルキッチン、クヒオビーチまですぐの立地。',
    ko: '와이키키 반얀에서 최고의 휴식을 경험하세요. 고층의 안락함, 무료 실내 주차, 풀 키친, 쿠히오 비치 도보 이동.',
    'zh-CN': '在威基基榕树体验欧胡岛度假的极致魅力。高层舒适体验、免费车库停车位、完备厨房，步行即达库希奥海滩。',
    'zh-TW': '在威基基榕樹體驗歐胡島度假的極致魅力。高層舒適體驗、免費車庫停車位、完備廚房，步行即達庫希奧海灘。',
    es: 'Viva lo mejor de Waikiki en Waikiki Banyan. Comodidad en pisos altos, estacionamiento techado gratis, cocina completa y a pasos de Kuhio Beach.',
  },
  'Promotional rates start at $179*/night. Inquire directly for personalized dates, multi-week savings, and instant confirmation.': {
    ja: 'プロモーション料金は1泊$179*から。ご希望の日程、長期滞在割引、迅速な予約確定はお気軽にお問い合わせください。',
    ko: '프로모션 특가는 1박 $179*부터 시작합니다. 맞춤 일정, 장기 투숙 할인 및 신속 예약을 원하시면 직접 문의해 주세요.',
    'zh-CN': '促销价格每晚仅 $179* 起。直接联系我们获取自选日期报价、多周长住折扣及快速确认。',
    'zh-TW': '促銷價格每晚僅 $179* 起。直接聯絡我們獲取自選日期報價、多週長住折扣及快速確認。',
    es: 'Tarifas promocionales desde $179*/noche. Consulte directamente para fechas personalizadas y confirmación rápida.',
  },
  'Send Direct Inquiry': {
    ja: '直接予約のお問い合わせを送る',
    ko: '직접 예약 문의 보내기',
    'zh-CN': '发送直接预订咨询',
    'zh-TW': '發送直接預訂諮詢',
    es: 'Enviar consulta directa',
  },
  'Check Airbnb Availability': {
    ja: 'Airbnbで空室状況を確認',
    ko: 'Airbnb에서 예약 가능 여부 확인',
    'zh-CN': '在 Airbnb 查看实时房态',
    'zh-TW': '在 Airbnb 查看實時房態',
    es: 'Consultar disponibilidad en Airbnb',
  },
  'Call Host Directly': {
    ja: 'ホストに直接電話する',
    ko: '호스트에게 직접 전화 문의',
    'zh-CN': '直接致电房东团队',
    'zh-TW': '直接致電房東團隊',
    es: 'Llamar al anfitrión directamente',
  },

  // ==========================================
  // INQUIRY FORM & MODAL
  // ==========================================
  'Check Dates & Request Special Promo Rate': {
    ja: '日程確認＆プロモ特別料金リクエスト',
    ko: '일정 확인 및 특별 프로모션 요금 요청',
    'zh-CN': '查询空房及申请特惠价格',
    'zh-TW': '查詢空房及申請特惠價格',
    es: 'Consulte fechas y solicite tarifa promocional',
  },
  'Full Name': {
    ja: 'お名前（フルネーム）',
    ko: '성함 (전체 성명)',
    'zh-CN': '姓名',
    'zh-TW': '姓名',
    es: 'Nombre completo',
  },
  'Email Address': {
    ja: 'メールアドレス',
    ko: '이메일 주소',
    'zh-CN': '电子邮箱',
    'zh-TW': '電子郵箱',
    es: 'Correo electrónico',
  },
  'Phone Number': {
    ja: 'お電話番号',
    ko: '전화번호',
    'zh-CN': '电话号码',
    'zh-TW': '電話號碼',
    es: 'Número de teléfono',
  },
  'Check-in Date': {
    ja: 'チェックイン日',
    ko: '체크인 날짜',
    'zh-CN': '入住日期',
    'zh-TW': '入住日期',
    es: 'Fecha de llegada',
  },
  'Check-out Date': {
    ja: 'チェックアウト日',
    ko: '체크아웃 날짜',
    'zh-CN': '退房日期',
    'zh-TW': '退房日期',
    es: 'Fecha de salida',
  },
  'Number of Guests': {
    ja: 'ご宿泊人数',
    ko: '투숙 인원수',
    'zh-CN': '入住人数',
    'zh-TW': '入住人數',
    es: 'Número de huéspedes',
  },
  'Preferred Suite': {
    ja: 'ご希望のお部屋',
    ko: '선호하는 객실',
    'zh-CN': '偏好房型',
    'zh-TW': '偏好房型',
    es: 'Suite preferida',
  },
  'Message or Special Requests': {
    ja: 'ご質問・ご要望など',
    ko: '문의사항 또는 특별 요청',
    'zh-CN': '留言或特殊要求',
    'zh-TW': '留言或特殊要求',
    es: 'Mensaje o peticiones especiales',
  },
  'Submit Inquiry': {
    ja: 'お問い合わせを送信',
    ko: '문의 접수하기',
    'zh-CN': '提交咨询',
    'zh-TW': '提交諮詢',
    es: 'Enviar consulta',
  },
  'Submitting...': {
    ja: '送信中...',
    ko: '전송 중...',
    'zh-CN': '正在提交...',
    'zh-TW': '正在提交...',
    es: 'Enviando...',
  },
  'Inquiry Sent Successfully!': {
    ja: 'お問い合わせを送信いたしました！',
    ko: '문의가 성공적으로 전송되었습니다!',
    'zh-CN': '咨询已成功发送！',
    'zh-TW': '諮詢已成功發送！',
    es: '¡Consulta enviada con éxito!',
  },
  'Thank you! Our host team will contact you within 24 hours.': {
    ja: 'ありがとうございます！24時間以内にホストチームよりご連絡いたします。',
    ko: '감사합니다! 호스트 팀이 24시간 이내에 답변을 드리겠습니다.',
    'zh-CN': '感谢您的咨询！我们的房东团队将在24小时内与您联系。',
    'zh-TW': '感謝您的諮詢！我們的房東團隊將在24小時內與您聯絡。',
    es: '¡Gracias! Nuestro equipo anfitrión se comunicará con usted en un plazo de 24 horas.',
  },

  // ==========================================
  // PRICING CALCULATOR CARD
  // ==========================================
  'Direct Booking Quote Calculator': {
    ja: '直接予約お見積もり計算機',
    ko: '직접 예약 견적 계산기',
    'zh-CN': '官网直订报价计算器',
    'zh-TW': '官網直訂報價計算器',
    es: 'Calculadora de cotización directa',
  },
  'Estimated Total': {
    ja: '概算合計金額',
    ko: '예상 총 금액',
    'zh-CN': '预计总费用',
    'zh-TW': '預計總費用',
    es: 'Total estimado',
  },
  'Average Nightly': {
    ja: '1泊あたり平均',
    ko: '1박 평균',
    'zh-CN': '每晚均价',
    'zh-TW': '每晚均價',
    es: 'Promedio por noche',
  },
  'Cleaning Fee ($250 waived for 3+ nights!)': {
    ja: '清掃費（3泊以上で$250全額免除！）',
    ko: '청소비 (3박 이상 시 $250 전액 면제!)',
    'zh-CN': '清洁费（入住3晚以上立免 $250！）',
    'zh-TW': '清潔費（入住3晚以上立免 $250！）',
    es: 'Tarifa de limpieza (¡gratis $250 en estadías de 3+ noches!)',
  },
  'Cleaning Fee: WAIVED ($0)': {
    ja: '清掃費：無料 ($0)',
    ko: '청소비: 면제 ($0)',
    'zh-CN': '清洁费：免除 ($0)',
    'zh-TW': '清潔費：免除 ($0)',
    es: 'Tarifa de limpieza: EXONERADA ($0)',
  },
  'Send Inquiry with this Quote': {
    ja: 'このお見積もりでお問い合わせ',
    ko: '이 견적으로 문의 보내기',
    'zh-CN': '使用此报价提交咨询',
    'zh-TW': '使用此報價提交諮詢',
    es: 'Enviar consulta con esta cotización',
  },

  // ==========================================
  // COMMON BADGES, BUTTONS & LABELS
  // ==========================================
  'View Suite Details': {
    ja: 'お部屋の詳細を見る',
    ko: '객실 상세 정보 보기',
    'zh-CN': '查看套房详情',
    'zh-TW': '查看套房詳情',
    es: 'Ver detalles de la suite',
  },
  'Check Availability': {
    ja: '空室状況を確認',
    ko: '예약 가능 여부 확인',
    'zh-CN': '查看空房状态',
    'zh-TW': '查看空房狀態',
    es: 'Consultar disponibilidad',
  },
  'Starting from': {
    ja: '料金目安',
    ko: '시작 요금',
    'zh-CN': '起价',
    'zh-TW': '起價',
    es: 'Desde',
  },
  'Not available as of the moment': {
    ja: '現在満室となっております',
    ko: '현재 예약이 마감되었습니다',
    'zh-CN': '目前暂无空房',
    'zh-TW': '目前暫無空房',
    es: 'No disponible por el momento',
  },
  'Master Bedroom': {
    ja: '主寝室（マスターベッドルーム）',
    ko: '메인 침실 (마스터 베드룸)',
    'zh-CN': '主卧室',
    'zh-TW': '主臥室',
    es: 'Dormitorio principal',
  },
  'Living Room': {
    ja: 'リビングルーム',
    ko: '거실',
    'zh-CN': '客厅',
    'zh-TW': '客廳',
    es: 'Sala de estar',
  },
  '2 Full/Double Beds': {
    ja: 'フル/ダブルベッド 2台',
    ko: '더블/풀 침대 2개',
    'zh-CN': '2张全尺寸双人床',
    'zh-TW': '2張全尺寸雙人床',
    es: '2 camas dobles',
  },
  '1 King Bed': {
    ja: 'キングサイズベッド 1台',
    ko: '킹사이즈 침대 1개',
    'zh-CN': '1张特大双人床 (King)',
    'zh-TW': '1張特大雙人床 (King)',
    es: '1 cama King',
  },
  '1 Queen Pullout Sofa Bed': {
    ja: 'クイーンサイズ引き出し式ソファベッド 1台',
    ko: '퀸사이즈 소파베드 1개',
    'zh-CN': '1张Queen尺寸抽拉式沙发床',
    'zh-TW': '1張Queen尺寸抽拉式沙發床',
    es: '1 sofá cama Queen',
  },
  'Standard Check-In: 4:00 PM (HST)': {
    ja: '通常チェックイン：午後4:00（ハワイ時間）',
    ko: '체크인: 오후 4:00 (하와이 표준시)',
    'zh-CN': '标准入住时间：下午4:00（夏威夷时间）',
    'zh-TW': '標準入住時間：下午4:00（夏威夷時間）',
    es: 'Check-in estándar: 4:00 PM (HST)',
  },
  'Standard Check-Out: 10:00 AM (HST)': {
    ja: '通常チェックアウト：午前10:00（ハワイ時間）',
    ko: '체크아웃: 오전 10:00 (하와이 표준시)',
    'zh-CN': '标准退房时间：上午10:00（夏威夷时间）',
    'zh-TW': '標準退房時間：上午10:00（夏威夷時間）',
    es: 'Check-out estándar: 10:00 AM (HST)',
  },
  'Quiet Hours: 10:00 PM – 8:00 AM': {
    ja: '静粛時間：午後10:00 〜 午前8:00',
    ko: '정숙 시간: 오후 10:00 – 오전 8:00',
    'zh-CN': '静音时段：晚上10:00至早晨8:00',
    'zh-TW': '靜音時段：晚上10:00至早晨8:00',
    es: 'Horas de silencio: 10:00 PM – 8:00 AM',
  },
  'Quiet Hours: 10:00 PM to 6:00 AM': {
    ja: 'デッキ静粛時間：午後10:00 〜 午前6:00',
    ko: '덱 정숙 시간: 오후 10:00 – 오전 6:00',
    'zh-CN': '露台静音时段：晚上10:00至早晨6:00',
    'zh-TW': '露台靜音時段：晚上10:00至早晨6:00',
    es: 'Horas de silencio de terraza: 10:00 PM a 6:00 AM',
  },
  '100% Smoke-Free Building & Lanai': {
    ja: '館内およびラナイ完全禁煙',
    ko: '건물 및 라나이 100% 금연',
    'zh-CN': '大楼及阳台全面100%严禁吸烟',
    'zh-TW': '大樓及陽台全面100%嚴禁吸煙',
    es: 'Edificio y lanai 100% libres de humo',
  },
  'No Smoking in Units or Lanai': {
    ja: '客室内およびラナイでの喫煙厳禁',
    ko: '객실 및 라나이 내 절대 금연',
    'zh-CN': '套房内及阳台严禁吸烟',
    'zh-TW': '套房內及陽台嚴禁吸煙',
    es: 'Prohibido fumar en unidades o lanai',
  },
  'No Pets Allowed': {
    ja: 'ペット同伴不可（建物規約による）',
    ko: '반려동물 동반 불가 (HOA 규정)',
    'zh-CN': '禁止携带宠物（根据大楼管理规定）',
    'zh-TW': '禁止攜帶寵物（根據大樓管理規定）',
    es: 'No se permiten mascotas',
  },
  'Maximum Occupancy: 6 Guests': {
    ja: '最大宿泊人数：6名様まで',
    ko: '최대 수용 인원: 6명',
    'zh-CN': '最多入住人数：6位宾客',
    'zh-TW': '最多入住人數：6位賓客',
    es: 'Ocupación máxima: 6 huéspedes',
  },
  'Trash Chutes Located on Every Floor': {
    ja: '各フロアにゴミシューター設置',
    ko: '각 층마다 쓰레기 투입구 완비',
    'zh-CN': '每层均设有垃圾投放道',
    'zh-TW': '每層均設有垃圾投放道',
    es: 'Conductos de basura en cada piso',
  },
  'Coin & Card Laundry on Every Floor': {
    ja: '各階にコイン＆カード式ランドリー完備',
    ko: '각 층마다 동전/카드 겸용 세탁실 완비',
    'zh-CN': '每层均设有投币及刷卡洗衣房',
    'zh-TW': '每層均設有投幣及刷卡洗衣房',
    es: 'Lavandería con tarjeta y monedas en cada piso',
  },
  '24/7 Security Patrol & Front Desk': {
    ja: '24時間警備員巡回＆フロントデスク',
    ko: '24시간 보안 순찰 및 안내 데스크',
    'zh-CN': '24/7 昼夜安保巡逻及前台服务',
    'zh-TW': '24/7 晝夜安保巡邏及前台服務',
    es: 'Patrulla de seguridad y recepción 24/7',
  },
  'Check-in': {
    ja: 'チェックイン',
    ko: '체크인',
    'zh-CN': '入住',
    'zh-TW': '入住',
    es: 'Llegada',
  },
  'Check-out': {
    ja: 'チェックアウト',
    ko: '체크아웃',
    'zh-CN': '退房',
    'zh-TW': '退房',
    es: 'Salida',
  },
  'Why Waikiki Banyan?': {
    ja: 'なぜワイキキ・バニアンなのか？',
    ko: '왜 와이키키 반얀인가요?',
    'zh-CN': '为什么选择威基基榕树？',
    'zh-TW': '為什麼選擇威基基榕樹？',
    es: '¿Por qué Waikiki Banyan?',
  },
  'Why Book Direct?': {
    ja: '直接予約のメリット',
    ko: '직접 예약의 혜택',
    'zh-CN': '为何选择官网直订？',
    'zh-TW': '為何選擇官網直訂？',
    es: '¿Por qué reservar directo?',
  },
};

// Common terms and regex-like translation helpers
const JAPANESE_TERMS: [RegExp, string][] = [
  [/\$179\*\s*(\/|\s*per\s*)night/gi, '1泊 $179*'],
  [/\$179\s*(\/|\s*per\s*)night/gi, '1泊 $179'],
  [/\$([0-9,]+)\s*(\/|\s*per\s*)(night|nt)/gi, '1泊 $$1'],
  [/\$0\s+resort\s+fees?/gi, 'リゾート料金 $0 (無料)'],
  [/free\s+covered\s+(garage\s+)?parking/gi, '無料屋内駐車場'],
  [/1\s+block\s+to\s+(the\s+)?beach/gi, 'ビーチまで1ブロック'],
  [/sleeps\s+(\d+)\s*[-–]\s*(\d+)/gi, '最大$1〜$2名様'],
  [/(\d+)\s+sq\.\s*ft\./gi, '$1平方フィート'],
  [/tower\s+(\d+)/gi, 'タワー$1'],
  [/suite\s*#?(\d+)/gi, '$1号室'],
  [/unit\s*#?(\d+)/gi, '$1号室'],
  [/(\d+)(st|nd|rd|th)\s+floor/gi, '$1階'],
  [/floor\s+(\d+)/gi, '$1階'],
  [/save\s+\$([0-9,]+)\+?/gi, '$1ドル以上お得'],
  [/(\d+)\s+nights?/gi, '$1泊'],
  [/(\d+)\s+guests?/gi, '$1名様'],
  [/(\d+)\s+bedrooms?/gi, '$1ベッドルーム'],
  [/(\d+)\s+bathrooms?/gi, '$1バスルーム'],
  [/(\d+)\s+beds?/gi, '$1ベッド'],
];

// Store original text node values to allow instant revert without DOM destruction
const nodeToOriginal = new WeakMap<Node, string>();
let domObserver: MutationObserver | null = null;
let activeTargetLang: string = 'en';

/**
 * Checks if a node or its ancestors are marked as non-translatable
 */
function isIgnoredNode(node: Node): boolean {
  if (!node.parentElement) return false;
  const parent = node.parentElement;
  if (['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) {
    return true;
  }
  if (parent.closest('.notranslate') || parent.closest('[translate="no"]')) {
    return true;
  }
  return false;
}

/**
 * Substring and regex replacement helper
 */
function translateSubstringsAndPatterns(rawText: string, lang: string): string {
  let result = rawText;

  // 1. Dictionary phrase replacement (longest to shortest)
  const keys = Object.keys(TRANSLATION_DICTIONARY).sort((a, b) => b.length - a.length);
  for (const phrase of keys) {
    if (result.includes(phrase)) {
      const translated = TRANSLATION_DICTIONARY[phrase][lang];
      if (translated) {
        result = result.split(phrase).join(translated);
      }
    }
  }

  // 2. Japanese-specific dynamic regex patterns
  if (lang === 'ja') {
    for (const [pattern, replacement] of JAPANESE_TERMS) {
      result = result.replace(pattern, replacement);
    }
  }

  return result;
}

/**
 * Translate a single text string using exact match, sentence deconstruction, and phrase replacement
 */
export function translateString(rawText: string, lang: string): string {
  if (!rawText || lang === 'en') return rawText;

  const trimmed = rawText.trim();
  if (!trimmed) return rawText;

  // 1. Exact match in dictionary
  if (TRANSLATION_DICTIONARY[trimmed] && TRANSLATION_DICTIONARY[trimmed][lang]) {
    const translation = TRANSLATION_DICTIONARY[trimmed][lang];
    return rawText.replace(trimmed, translation);
  }

  // 2. Multi-sentence deconstruction
  // Split paragraph by sentence breaks (. , ! , ? , newline)
  const sentencePattern = /([^\n.!?]+[.!?]+|\n+|[^\n.!?]+$)/g;
  const parts = trimmed.match(sentencePattern);
  if (parts && parts.length > 1) {
    let anyTranslated = false;
    const translatedParts = parts.map((part) => {
      const partTrimmed = part.trim();
      if (!partTrimmed) return part;

      const puncMatch = partTrimmed.match(/([.!?]+)$/);
      const punc = puncMatch ? puncMatch[1] : '';
      const basePart = punc ? partTrimmed.slice(0, -punc.length).trim() : partTrimmed;

      if (TRANSLATION_DICTIONARY[partTrimmed] && TRANSLATION_DICTIONARY[partTrimmed][lang]) {
        anyTranslated = true;
        return part.replace(partTrimmed, TRANSLATION_DICTIONARY[partTrimmed][lang]);
      }
      if (basePart && TRANSLATION_DICTIONARY[basePart] && TRANSLATION_DICTIONARY[basePart][lang]) {
        anyTranslated = true;
        const res = TRANSLATION_DICTIONARY[basePart][lang];
        return part.replace(basePart, res);
      }
      return translateSubstringsAndPatterns(part, lang);
    });

    if (anyTranslated) {
      const joined = translatedParts.join('');
      return rawText.replace(trimmed, joined);
    }
  }

  // 3. Fallback to substrings & patterns
  return translateSubstringsAndPatterns(rawText, lang);
}

/**
 * Walks the DOM and applies translations to visible text nodes and form placeholders
 */
export function translatePageDOM(lang: string) {
  if (typeof document === 'undefined') return;

  activeTargetLang = lang;

  // If restoring to English, restore original values
  if (lang === 'en') {
    restoreOriginalEnglish();
    document.documentElement.lang = 'en';
    return;
  }

  document.documentElement.lang = lang;

  // 1. Translate all text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (isIgnoredNode(node)) return NodeFilter.FILTER_REJECT;
        const text = node.textContent?.trim();
        if (!text) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let currentNode: Node | null;
  while ((currentNode = walker.nextNode())) {
    if (!nodeToOriginal.has(currentNode)) {
      nodeToOriginal.set(currentNode, currentNode.textContent || '');
    }

    const original = nodeToOriginal.get(currentNode) || currentNode.textContent || '';
    const translated = translateString(original, lang);

    if (translated !== currentNode.textContent) {
      currentNode.textContent = translated;
    }
  }

  // 2. Translate form placeholders
  const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[placeholder], textarea[placeholder]'
  );
  inputs.forEach((input) => {
    if (!input.hasAttribute('data-original-placeholder')) {
      input.setAttribute('data-original-placeholder', input.placeholder);
    }
    const origPlaceholder = input.getAttribute('data-original-placeholder') || '';
    if (origPlaceholder) {
      input.placeholder = translateString(origPlaceholder, lang);
    }
  });

  // Ensure MutationObserver watches for route transitions and modal openings
  startDOMObserver(lang);
}

/**
 * Restores original English text on all modified nodes and input placeholders
 */
export function restoreOriginalEnglish() {
  if (typeof document === 'undefined') return;

  activeTargetLang = 'en';

  if (domObserver) {
    domObserver.disconnect();
    domObserver = null;
  }

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (nodeToOriginal.has(node)) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      },
    }
  );

  let currentNode: Node | null;
  while ((currentNode = walker.nextNode())) {
    const original = nodeToOriginal.get(currentNode);
    if (original !== undefined && currentNode.textContent !== original) {
      currentNode.textContent = original;
    }
  }

  // Restore input placeholders
  const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[data-original-placeholder], textarea[data-original-placeholder]'
  );
  inputs.forEach((input) => {
    const orig = input.getAttribute('data-original-placeholder');
    if (orig) {
      input.placeholder = orig;
    }
  });

  document.documentElement.lang = 'en';
}

/**
 * Starts a MutationObserver to translate dynamically rendered elements
 */
function startDOMObserver(lang: string) {
  if (typeof window === 'undefined' || lang === 'en') return;

  if (domObserver) {
    domObserver.disconnect();
  }

  domObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!isIgnoredNode(node)) {
            if (!nodeToOriginal.has(node)) {
              nodeToOriginal.set(node, node.textContent || '');
            }
            const original = nodeToOriginal.get(node) || '';
            const translated = translateString(original, lang);
            if (translated !== node.textContent) {
              node.textContent = translated;
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
            acceptNode(sub) {
              if (isIgnoredNode(sub)) return NodeFilter.FILTER_REJECT;
              const text = sub.textContent?.trim();
              if (!text) return NodeFilter.FILTER_SKIP;
              return NodeFilter.FILTER_ACCEPT;
            },
          });
          let subNode: Node | null;
          while ((subNode = walker.nextNode())) {
            if (!nodeToOriginal.has(subNode)) {
              nodeToOriginal.set(subNode, subNode.textContent || '');
            }
            const original = nodeToOriginal.get(subNode) || '';
            const translated = translateString(original, lang);
            if (translated !== subNode.textContent) {
              subNode.textContent = translated;
            }
          }

          // Check inputs inside added node
          const el = node as HTMLElement;
          if (el.querySelectorAll) {
            const inputs = el.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
              'input[placeholder], textarea[placeholder]'
            );
            inputs.forEach((input) => {
              if (!input.hasAttribute('data-original-placeholder')) {
                input.setAttribute('data-original-placeholder', input.placeholder);
              }
              const origPlaceholder = input.getAttribute('data-original-placeholder') || '';
              if (origPlaceholder) {
                input.placeholder = translateString(origPlaceholder, lang);
              }
            });
          }
        }
      });
    }
  });

  domObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Sets language in persistent localStorage
 */
export function setStoredLanguage(langCode: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, langCode);
  } catch (e) {
    // ignore
  }
}

/**
 * Gets current language from localStorage
 */
export function getStoredLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
      return stored;
    }
  } catch (e) {
    // ignore
  }

  return 'en';
}

/**
 * Master language change function:
 * 1. Immediately executes instant in-app DOM translation (guaranteed 0ms latency)
 * 2. Saves to localStorage
 * 3. Dispatches window custom event for reactive components
 */
export function setLanguage(langCode: string) {
  if (typeof window === 'undefined') return;

  setStoredLanguage(langCode);

  // 1. Instant built-in DOM Translation
  translatePageDOM(langCode);

  // 2. Dispatch global event
  window.dispatchEvent(
    new CustomEvent('plumeria-language-change', {
      detail: { language: langCode },
    })
  );
}
