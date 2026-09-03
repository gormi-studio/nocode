// Static catalog content for the standalone (non-VibeX-backed) build of the
// site. Replace/extend these arrays — or swap `src/lib/localData.js` for a
// real API client — when a production backend is wired up.

export const categories = [
  { id: 1, name: '가위', group: 'salon', sortOrder: 1 },
  { id: 2, name: '빗', group: 'salon', sortOrder: 2 },
  { id: 3, name: '브러쉬', group: 'salon', sortOrder: 3 },
  { id: 4, name: '정리 트레이', group: 'storage', sortOrder: 4 },
  { id: 5, name: '이동식 정리함', group: 'storage', sortOrder: 5 },
  { id: 6, name: '핀·클립 정리', group: 'storage', sortOrder: 6 },
];

// Root-relative paths like '/images/x.jpg' resolve against the domain root,
// not wherever the app is actually mounted — fine when served from '/', but
// wrong under a sub-path host like GitHub Pages (import.meta.env.BASE_URL is
// e.g. '/nocode/' there). Route every local asset path through this so it
// resolves correctly in both.
const asset = (path) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

function withCategory(p) {
  const c = categoryById[p.categoryId];
  return { ...p, category: c ? { id: c.id, title: c.name } : null };
}

// Real product photos supplied by the brand owner, with a hand-drawn local
// SVG as an onError fallback in the unlikely event a file goes missing.
// The hero uses the same licensed salon-interior photo source as BrandStory,
// with the local SVG as a fallback if the hotlinked photo fails to load.
export const HERO_IMAGE = 'https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const HERO_IMAGE_FALLBACK = asset('/images/hero.svg');

export const products = [
  {
    id: 1,
    slug: 'pro-cutting-scissors',
    name: '프로 커팅가위 세트',
    image: asset('/images/products/scissors-pro.jpg'),
    imageFallback: asset('/images/product-scissors.svg'),
    contextCopy: '매일 다수의 고객을 응대하는 현직 디자이너를 위한 고정밀 커팅가위 세트입니다.',
    price: 128000,
    originalPrice: 148000,
    rating: 4.9,
    reviewCount: 86,
    level: 'professional',
    categoryId: 1,
    group: 'salon',
    tags: ['가위', '전문가용'],
    isFeatured: true,
    recommendSituations: ['하루 다수의 커트 시술이 있는 현직 디자이너', '정밀한 슬라이드 커트가 필요한 경우'],
    exceptSituations: ['가위를 처음 다뤄보는 입문자', '월 1~2회 이하로 가볍게 사용하는 경우'],
  },
  {
    id: 2,
    slug: 'beginner-styling-scissors',
    name: '입문자 스타일링가위',
    image: asset('/images/products/scissors-beginner.jpg'),
    imageFallback: asset('/images/product-scissors.svg'),
    contextCopy: '처음 가위를 잡는 분도 안전하고 편안하게 다룰 수 있도록 무게와 그립을 조정했습니다.',
    price: 45000,
    rating: 4.7,
    reviewCount: 34,
    level: 'beginner',
    categoryId: 1,
    group: 'salon',
    tags: ['가위', '입문'],
    isFeatured: false,
    recommendSituations: ['셀프 커트나 취미로 미용을 시작하는 경우', '가벼운 무게의 가위를 찾는 경우'],
    exceptSituations: ['매일 다수의 고객을 시술하는 전업 디자이너'],
  },
  {
    id: 3,
    slug: 'wide-tooth-comb',
    name: '와이드 콤 세트',
    image: asset('/images/products/comb-set.jpg'),
    imageFallback: asset('/images/product-comb.svg'),
    contextCopy: '엉킴 없이 부드럽게 빗어지는 와이드 간격 콤으로, 일반 소비자의 데일리 헤어케어에 알맞습니다.',
    price: 18000,
    rating: 4.6,
    reviewCount: 19,
    level: 'beginner',
    categoryId: 2,
    group: 'salon',
    tags: ['빗'],
    isFeatured: false,
    recommendSituations: ['곱슬·웨이브 모발의 데일리 브러싱', '샤워 후 젖은 머리 정리'],
    exceptSituations: ['정밀한 섹션 분리가 필요한 전문 시술'],
  },
  {
    id: 4,
    slug: 'cutting-comb-pro',
    name: '전문가용 커팅 콤',
    image: asset('/images/products/comb-set.jpg'),
    imageFallback: asset('/images/product-comb.svg'),
    contextCopy: '섹션 분리와 커트 라인 가이드에 최적화된 내열 소재 커팅 콤입니다.',
    price: 32000,
    rating: 4.8,
    reviewCount: 41,
    level: 'professional',
    categoryId: 2,
    group: 'salon',
    tags: ['빗', '전문가용'],
    isFeatured: true,
    recommendSituations: ['정밀한 섹션 분리가 필요한 커트 시술', '드라이·아이론과 함께 쓰는 스타일링'],
    exceptSituations: ['가벼운 데일리 빗질 용도'],
  },
  {
    id: 5,
    slug: 'round-styling-brush',
    name: '라운드 스타일링 브러쉬',
    image: asset('/images/products/brush-round.jpg'),
    imageFallback: asset('/images/product-brush.svg'),
    contextCopy: '볼륨과 컬을 동시에 살리는 라운드 브러쉬로, 입문자도 쉽게 블로우 드라이를 완성할 수 있습니다.',
    price: 27000,
    rating: 4.7,
    reviewCount: 28,
    level: 'beginner',
    categoryId: 3,
    group: 'salon',
    tags: ['브러쉬'],
    isFeatured: false,
    recommendSituations: ['셀프 블로우 드라이로 볼륨을 살리고 싶은 경우', '짧은~중단발 스타일링'],
    exceptSituations: ['매우 얇거나 손상이 심한 모발 (열 손상 주의)'],
  },
  {
    id: 6,
    slug: 'salon-tray-basic',
    name: '살롱 정리 트레이 (기본)',
    image: asset('/images/products/tray-basic.jpg'),
    imageFallback: asset('/images/product-tray.svg'),
    contextCopy: '자주 쓰는 도구 3~4종을 한눈에 정리할 수 있는 기본형 트레이입니다.',
    price: 39000,
    rating: 4.8,
    reviewCount: 52,
    level: 'beginner',
    categoryId: 4,
    group: 'storage',
    tags: ['정리', '트레이'],
    isFeatured: true,
    recommendSituations: ['도구 2~3종의 기본 구성', '집에서 개인적으로 사용하는 경우'],
    exceptSituations: ['7종 이상의 도구를 정리해야 하는 경우 → 프로 트레이 권장'],
  },
  {
    id: 7,
    slug: 'salon-tray-pro',
    name: '살롱 정리 트레이 (프로)',
    image: asset('/images/products/tray-pro.jpg'),
    imageFallback: asset('/images/product-tray.svg'),
    contextCopy: '가위·빗·브러쉬·클립까지 종류별로 나눠 담는 확장형 프로 트레이입니다.',
    price: 69000,
    originalPrice: 79000,
    rating: 4.9,
    reviewCount: 63,
    level: 'professional',
    categoryId: 4,
    group: 'storage',
    tags: ['정리', '트레이', '전문가용'],
    isFeatured: false,
    recommendSituations: ['좁은 매장 공간에서 다수 도구를 정리해야 하는 1인 원장', '도구 7종 이상 보유'],
    exceptSituations: ['도구 수가 적어 기본 트레이로 충분한 경우'],
  },
  {
    id: 8,
    slug: 'mobile-caddy',
    name: '이동식 도구 정리함',
    image: asset('/images/products/caddy-mobile.jpg'),
    imageFallback: asset('/images/product-caddy.svg'),
    contextCopy: '손잡이가 달려 있어 출장·이동이 잦은 프리랜서 미용사에게 알맞은 휴대형 정리함입니다.',
    price: 58000,
    originalPrice: 68000,
    rating: 4.8,
    reviewCount: 47,
    level: 'professional',
    categoryId: 5,
    group: 'storage',
    tags: ['이동', '정리함'],
    isFeatured: true,
    recommendSituations: ['출장·방문 미용 서비스', '이동 시 도구 파손·분실이 걱정되는 경우'],
    exceptSituations: ['매장에 고정해 두고 쓰는 경우 (휴대 기능이 불필요)'],
  },
  {
    id: 9,
    slug: 'clip-pin-organizer',
    name: '핀·클립 정리 트레이',
    image: asset('/images/products/clip-organizer.jpg'),
    imageFallback: asset('/images/product-clip.svg'),
    contextCopy: '흩어지기 쉬운 헤어핀·클립을 칸별로 나눠 담는 소형 정리 트레이입니다.',
    price: 15000,
    rating: 4.6,
    reviewCount: 22,
    level: 'beginner',
    categoryId: 6,
    group: 'storage',
    tags: ['핀', '클립'],
    isFeatured: false,
    recommendSituations: ['핀·클립을 자주 사용하고 잃어버리기 쉬운 경우'],
    exceptSituations: ['핀·클립을 거의 사용하지 않는 경우'],
  },
].map(withCategory);

export const reviews = [
  {
    id: 1,
    authorType: 'professional',
    authorName: '김민지',
    authorRole: '1인 헤어샵 원장',
    rating: 5,
    content: '트레이 하나로 가위·빗·브러쉬가 다 정리되니까 손님 앞에서 허둥대는 일이 없어졌어요. 좁은 매장에 딱이에요.',
    productName: '살롱 정리 트레이 (프로)',
  },
  {
    id: 2,
    authorType: 'professional',
    authorName: '박서준',
    authorRole: '출장 미용사',
    rating: 5,
    content: '이동식 정리함 덕분에 방문 시술 준비 시간이 확 줄었습니다. 손잡이가 튼튼해서 도구가 흔들리지 않아요.',
    productName: '이동식 도구 정리함',
  },
  {
    id: 3,
    authorType: 'general',
    authorName: '이하늘',
    authorRole: '홈케어 사용자',
    rating: 4,
    content: '처음 써보는 스타일링가위인데 무게가 가벼워서 손목이 안 아파요. 입문자에게 추천합니다.',
    productName: '입문자 스타일링가위',
  },
  {
    id: 4,
    authorType: 'general',
    authorName: '최유리',
    authorRole: '일반 소비자',
    rating: 5,
    content: '커스텀 트레이로 색상까지 골라서 만들었더니 화장대에 두기 예쁘네요. 실용성도 만족스러워요.',
    productName: '살롱 정리 트레이 (기본)',
  },
  {
    id: 5,
    authorType: 'professional',
    authorName: '정다은',
    authorRole: '프리랜서 헤어디자이너',
    rating: 5,
    content: '전문가용 커팅 콤은 섹션이 정말 잘 나뉘어서 시술 시간이 단축됐어요. 내열 소재라 드라이와 같이 써도 안전합니다.',
    productName: '전문가용 커팅 콤',
  },
  {
    id: 6,
    authorType: 'general',
    authorName: '한소민',
    authorRole: '일반 소비자',
    rating: 4,
    content: '핀·클립이 늘 서랍에서 굴러다녔는데 칸별 정리 트레이 덕분에 찾는 시간이 없어졌어요.',
    productName: '핀·클립 정리 트레이',
  },
];

export const insights = [
  {
    id: 1,
    slug: 'choosing-your-first-scissors',
    title: '입문자를 위한 첫 가위 고르는 법',
    excerpt: '처음 가위를 구매할 때 꼭 확인해야 할 무게, 그립, 날의 형태를 정리했습니다.',
    image: asset('/images/products/scissors-pro.jpg'),
    imageFallback: asset('/images/insight-1.svg'),
    readMinutes: 4,
    content:
      '처음 가위를 구매할 때는 스펙보다 손에 맞는 무게와 그립을 먼저 확인하는 것이 중요합니다.\n\n' +
      '1. 무게: 가벼운 가위는 손목 부담이 적어 장시간 연습에 유리합니다.\n' +
      '2. 그립: 엄지 링의 각도가 손 크기에 맞아야 안정적으로 잡을 수 있습니다.\n' +
      '3. 날의 형태: 슬라이드 커트를 자주 한다면 컨벡스 날을, 기본 커트 위주라면 베벨 날을 권장합니다.\n\n' +
      '고르미의 입문자용 스타일링가위는 이 세 가지 기준을 반영해 처음 가위를 잡는 분도 편안하게 사용할 수 있도록 설계되었습니다.',
  },
  {
    id: 2,
    slug: 'salon-tray-organizing-tips',
    title: '좁은 매장에서 도구 정리하는 3가지 방법',
    excerpt: '1인 미용실 원장님들이 실제로 사용하는 공간 절약형 정리 노하우를 소개합니다.',
    image: asset('/images/products/insight-organizing.jpg'),
    imageFallback: asset('/images/insight-2.svg'),
    readMinutes: 5,
    content:
      '좁은 매장에서는 도구 정리가 곧 작업 효율로 이어집니다.\n\n' +
      '1. 사용 빈도순 배치: 가장 자주 쓰는 도구를 트레이 앞쪽에 배치하세요.\n' +
      '2. 모듈형 정리대 활용: 가위·롤빗처럼 종류가 다른 도구는 별도 모듈로 분리하면 찾기 쉬워집니다.\n' +
      '3. 수직 공간 활용: 도구함을 추가해 트레이 위 공간을 입체적으로 사용하세요.\n\n' +
      '고르미 트레이 빌더에서 모듈을 조합하면 이런 정리 방식을 나만의 구성으로 바로 만들어볼 수 있습니다.',
  },
  {
    id: 3,
    slug: 'mobile-hairstylist-checklist',
    title: '출장 미용사를 위한 이동 도구함 체크리스트',
    excerpt: '이동이 잦은 프리랜서 미용사가 놓치기 쉬운 도구 관리 포인트를 짚어봅니다.',
    image: asset('/images/products/caddy-mobile.jpg'),
    imageFallback: asset('/images/insight-3.svg'),
    readMinutes: 3,
    content:
      '출장 미용은 도구가 이동 중 손상되거나 분실되기 쉬운 환경입니다.\n\n' +
      '1. 고정: 이동 중 흔들림이 없도록 도구를 고정하는 트레이나 정리함을 사용하세요.\n' +
      '2. 방수: 날씨나 위생 상황에 대비해 물세척이 쉬운 합성가죽 소재를 권장합니다.\n' +
      '3. 무게: 하루 여러 곳을 방문한다면 정리함 자체의 무게도 고려해야 합니다.\n\n' +
      '고르미의 이동식 도구 정리함은 이 세 가지를 고려해 출장·방문 서비스에 맞게 제작되었습니다.',
  },
  {
    id: 4,
    slug: 'material-guide-natural-vs-synthetic',
    title: '천연가죽 vs 합성가죽, 트레이 소재 고르는 기준',
    excerpt: '커스텀 트레이 제작 시 가장 많이 받는 질문, 소재 선택 기준을 정리했습니다.',
    image: asset('/images/products/insight-material-grid.jpg'),
    imageFallback: asset('/images/insight-4.svg'),
    readMinutes: 4,
    content:
      '트레이 소재는 관리 방식과 사용 환경에 따라 선택하는 것이 좋습니다.\n\n' +
      '천연가죽은 고급스러운 질감이 특징이지만 습기와 직사광선 관리가 필요합니다. ' +
      '반면 합성가죽은 물세척이 간편해 매일 사용하는 작업대에도 부담이 없습니다.\n\n' +
      '위생 관리가 중요한 매장 환경이라면 합성가죽을, 질감과 분위기를 중시하고 관리 여건이 되는 경우라면 천연가죽을 권장합니다.',
  },
];

export const curationSets = [
  {
    id: 1,
    targetType: 'solo',
    name: '1인 미용실용 세트',
    summary: '좁은 매장에서도 다수의 도구를 종류별로 정리할 수 있는 확장형 구성입니다.',
    price: 156000,
    contextCopy: '도구 7종 이상을 보유한 1인 원장님을 위해 프로 트레이와 다중 모듈을 조합했습니다.',
    items: ['살롱 정리 트레이 (프로)', '전문가용 커팅 콤', '가위 정리대 모듈', '브러쉬 홀더 모듈'],
    recommendSituations: ['좁은 매장 공간에서 다수 도구를 정리해야 하는 경우', '현직 1인 원장'],
    exceptSituations: ['도구 수가 적어 기본 구성으로 충분한 경우'],
  },
  {
    id: 2,
    targetType: 'mobile',
    name: '출장미용용 세트',
    summary: '이동 중 도구 손상·분실을 방지하는 휴대형 구성입니다.',
    price: 121000,
    contextCopy: '이동·방문 서비스가 잦은 프리랜서 미용사를 위해 이동식 정리함을 중심으로 구성했습니다.',
    items: ['이동식 도구 정리함', '전문가용 커팅 콤', '핀·클립 정리 트레이'],
    recommendSituations: ['출장·방문 미용 서비스', '이동이 잦은 프리랜서'],
    exceptSituations: ['매장에 고정해 두고 쓰는 경우'],
  },
  {
    id: 3,
    targetType: 'home',
    name: '홈케어용 세트',
    summary: '입문자도 부담 없이 시작할 수 있는 기본 구성입니다.',
    price: 82000,
    contextCopy: '처음 헤어 도구를 다뤄보는 일반 소비자를 위해 가볍고 다루기 쉬운 제품으로 구성했습니다.',
    items: ['입문자 스타일링가위', '와이드 콤 세트', '살롱 정리 트레이 (기본)'],
    recommendSituations: ['입문자 / 일반 소비자', '집에서 개인적으로 사용'],
    exceptSituations: ['하루 다수의 고객을 시술하는 전업 디자이너'],
  },
];

export const faqs = [
  {
    id: 1,
    sortOrder: 1,
    question: '커스텀 트레이는 얼마나 걸려서 제작되나요?',
    answer: '소재·색상·모듈 구성에 따라 추가 제작 기간이 발생할 수 있으며, 주문 단계에서 예상 제작 기간을 개별 안내드립니다.',
  },
  {
    id: 2,
    sortOrder: 2,
    question: '전문가용과 입문자용의 차이는 무엇인가요?',
    answer: '전문가용은 매일 다수의 고객을 응대하는 시술 환경에 맞춰 내구성과 정밀도를 높인 제품이며, 입문자용은 가벼운 무게와 쉬운 사용성에 초점을 맞췄습니다. 제품 상세 페이지의 추천·예외 상황을 참고해 주세요.',
  },
  {
    id: 3,
    sortOrder: 3,
    question: '천연가죽과 합성가죽 중 어떤 것을 골라야 하나요?',
    answer: '위생 관리가 중요한 매장 환경이라면 물세척이 간편한 합성가죽을, 질감과 분위기를 중시하고 관리 여건이 되신다면 천연가죽을 권장합니다.',
  },
  {
    id: 4,
    sortOrder: 4,
    question: '교환·반품이 가능한가요?',
    answer: '제품 하자·오배송의 경우 정상적으로 교환·반품이 가능합니다. 다만 소재·색상·모듈을 직접 조합한 커스텀 제작품은 단순 변심에 의한 교환·반품이 제한될 수 있습니다.',
  },
  {
    id: 5,
    sortOrder: 5,
    question: 'B2B·대량 구매 문의는 어떻게 하나요?',
    answer: '고객센터의 1:1·B2B 문의 폼에서 유형을 "B2B / 창업"으로 선택해 남겨주시면 담당자가 확인 후 순차적으로 안내드립니다.',
  },
  {
    id: 6,
    sortOrder: 6,
    question: '어떤 구성을 골라야 할지 모르겠어요.',
    answer: '추천 구성 페이지의 4단계 진단 퀴즈를 이용해 보세요. 작업 공간·이동 빈도·사용 도구 수를 바탕으로 1인 미용실용·출장미용용·홈케어용 중 맞는 세트를 안내해 드립니다.',
  },
];
