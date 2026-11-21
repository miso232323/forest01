export const PRODUCTION_FORM_URL = 'https://forms.gle/G6t8SsftQTnhhsPC9';

export type MapStyleId = 'yakdo' | 'detail' | 'aerial' | 'overview' | 'botanical';

export interface MapStyleSpec {
  id: MapStyleId;
  index: string;
  name: string;
  englishName: string;
  summary: string;
  description: string;
  recommendedUses: string;
  expressionMethod: string;
  leadTime: string;
  deliverables: string;
  image: string;
  alt: string;
}

export interface SampleWork {
  id: string;
  index: string;
  category: string;
  title: string;
  styleId: MapStyleId;
  styleLabel: string;
  medium: string;
  clientType: string;
  description: string;
  image: string;
  alt: string;
  featured?: boolean;
}

export const MAP_STYLES: MapStyleSpec[] = [
  {
    id: 'yakdo',
    index: '01',
    name: '약도',
    englishName: 'Simplified Wayfinding Map',
    summary: '처음 방문하는 길도 망설임 없이 찾도록 안내하는 핵심 동선 지도',
    description:
      '복잡한 골목과 불필요한 지형 정보를 덜어내고, 지하철 출구·주요 교차로·주차장·매장 파사드 등 길 찾기에 꼭 필요한 단서만 선명하게 정돈합니다. 모바일 초대장부터 명함 뒷면, 리플렛 오시는 길까지 가장 명쾌한 첫인상을 전합니다.',
    recommendedUses: '카페 및 로컬 매장 · 전시 초대장 · 행사장 안내문 · 웹 오시는 길',
    expressionMethod: '단순화된 도로망 · 핵심 랜드마크 아이콘 · 선명한 보행 동선',
    leadTime: '약 5–7영업일',
    deliverables: 'AI 벡터 원본 · 고해상도 PNG/PDF · 웹용 SVG',
    image: '/assets/aistudio/koc_1_5a932480.jpg',
    alt: '지하철 출구와 정류장, 다리를 건너 벽돌 카페까지 이어지는 점선 동선을 그린 약도 스타일 그림지도',
  },
  {
    id: 'detail',
    index: '02',
    name: '상세도',
    englishName: 'Precinct Detail Map',
    summary: '건물과 마당, 산책로의 세부 구성을 세밀하게 담아낸 공간 안내도',
    description:
      '문화예술마을, 캠퍼스, 복합문화공간, 리조트처럼 여러 동과 야외 마당이 어우러진 장소의 실제 배치를 펜화와 수채 담채로 정밀하게 그려냅니다. 방문객이 현재 위치와 출입구, 편의시설의 위치를 한눈에 파악하고 머물고 싶게 만듭니다.',
    recommendedUses: '복합문화공간 · 대학 캠퍼스 · 리조트 및 빌리지 · 대형 안내판',
    expressionMethod: '건축 파사드 세밀화 · 중정 및 보행로 정밀 배치 · 범례 시스템',
    leadTime: '약 2–3주',
    deliverables: '대형 실사 출력용 PDF · AI 레이어 원본 · 다국어 범례 대응',
    image: '/assets/aistudio/koc_4_5839210f.jpg',
    alt: '전시관, 안내소, 야외무대, 서점, 카페, 주차장과 보행 동선 아이콘을 세밀하게 그린 상세도 스타일 그림지도',
  },
  {
    id: 'aerial',
    index: '03',
    name: '조감도',
    englishName: 'Bird’s-Eye Panorama Map',
    summary: '하늘에서 내려다본 입체적 시선으로 공간의 풍경과 분위기를 전하는 지도',
    description:
      '산세와 해안선, 마을의 지붕과 숲의 입체감을 비스듬한 부감 구도로 펼쳐 보입니다. 단순한 위치 전달을 넘어 그 장소가 지닌 계절의 온도와 풍경의 매력을 한 폭의 그림처럼 담아 관광 리플렛과 지역 브랜드 홍보에 폭넓게 쓰입니다.',
    recommendedUses: '항구·해안 관광지 · 지역 축제 포스터 · 마을 여행 리플렛 · 숙박단지',
    expressionMethod: '입체 부감 투시도 · 과슈 및 색연필 질감 · 원근감 있는 지형 묘사',
    leadTime: '약 3–4주',
    deliverables: '인쇄용 CMYK 고해상도 원본 · 레이어 분리 파일 · 배너 응용 컷',
    image: '/assets/aistudio/koc_2_3793adee.jpg',
    alt: '주황 지붕 해안 마을과 방파제, 어선, 등대, 언덕 위 정자를 입체 부감 구도로 그린 조감도 스타일 그림지도',
  },
  {
    id: 'overview',
    index: '04',
    name: '전도',
    englishName: 'Regional Overview Map',
    summary: '권역 전체의 산맥, 물길, 철도와 주요 거점을 아우르는 광역 관광 지도',
    description:
      '도시 전체나 광역 문화권, 둘레길·기차 여행 노선처럼 넓은 범위의 지리를 하나의 맥락으로 엮어냅니다. 나침반과 축척, 주요 문화유산 일러스트가 균형을 이루어 지자체 관광 가이드북과 기념 포스터로 오래 소장되는 가치를 지닙니다.',
    recommendedUses: '시·군 광역 관광 안내 · 철도 및 드라이브 코스 · 지역 문화유산 지도',
    expressionMethod: '광역 등고 및 수계 묘사 · 권역별 거점 일러스트 · 고전 지도학 레이아웃',
    leadTime: '약 3–5주',
    deliverables: '접지 리플렛 판형 · 포스터용 고해상도 마스터 · 디지털 줌 뷰어용 타일',
    image: '/assets/aistudio/koc_3_5b2e06aa.jpg',
    alt: '산맥과 폭포, 강줄기, 기차 노선, 전통 성문과 항구 마을을 폭넓게 담은 전도 스타일 그림지도',
  },
  {
    id: 'botanical',
    index: '05',
    name: '수목원 테마지도',
    englishName: 'Botanical & Garden Theme Map',
    summary: '식물의 세밀화와 산책 코스를 함께 엮어낸 생태·정원 특화 테마 지도',
    description:
      '수목원, 식물원, 자연휴양림, 생태 공원이 품고 있는 대표 수종과 초화류를 식물 세밀화로 그려 산책로와 나란히 배치합니다. 데크길, 온실, 연못, 계절별 관찰 포인트가 자연스럽게 읽혀 관람객에게 도감처럼 소장하고 싶은 경험을 선사합니다.',
    recommendedUses: '수목원 및 식물원 · 자연휴양림 · 생태 탐방로 · 정원 박람회 가이드',
    expressionMethod: '식물 세밀 수채화 · 테마 산책 동선 · 계절 식생 도감 프레임',
    leadTime: '약 3–4주',
    deliverables: '접지 리플렛 · 야외 수목 안내판 소스 · 계절별 리뉴얼 호환 레이어',
    image: '/assets/aistudio/koc_5_537efa59.jpg',
    alt: '유리 온실, 장미 아치, 단풍숲, 연꽃 연못, 야생화 정원과 숲속 동물들을 그린 수목원 테마지도',
  },
];

export const SAMPLE_WORKS: SampleWork[] = [
  {
    id: 'sample-bayview',
    index: '01',
    category: '관광 안내',
    title: '바다를 품은 항구 마을',
    styleId: 'aerial',
    styleLabel: '조감도',
    medium: '접지 리플렛',
    clientType: '해안 관광 협의체',
    description:
      '등대 전망대와 부두, 방파제와 해안 산책로를 한눈에 조망할 수 있도록 구상한 조감도 사례입니다. 여행자가 도착 전부터 마을의 지형과 동선을 직관적으로 그려볼 수 있습니다.',
    image: '/assets/aistudio/koc_2_3793adee.jpg',
    alt: '항구 마을과 등대, 방파제를 그린 조감도 일러스트 샘플',
    featured: true,
  },
  {
    id: 'sample-village',
    index: '02',
    category: '공간 안내',
    title: '문화예술단지 안내',
    styleId: 'detail',
    styleLabel: '상세도',
    medium: '옥외 대형 안내판',
    clientType: '복합문화예술단지',
    description:
      '전시관, 안내소, 야외공연장, 서점, 카페와 주차장 배치를 실제 동선에 맞춰 그린 상세도입니다. 초행길 방문객도 시설과 편의공간 위치를 쉽게 이해합니다.',
    image: '/assets/aistudio/koc_4_5839210f.jpg',
    alt: '복합문화예술단지의 건물과 안내 아이콘을 그린 상세도 일러스트 샘플',
  },
  {
    id: 'sample-arboretum',
    index: '03',
    category: '생태 테마',
    title: '계절이 머무는 정원',
    styleId: 'botanical',
    styleLabel: '수목원 테마지도',
    medium: '테마 투어 가이드북',
    clientType: '국공립·민간 수목원',
    description:
      '유리 온실과 수련 연못, 단풍숲과 야생화 정원을 잇는 순환 산책로와 사계절 식생을 담아낸 수목원 테마지도입니다.',
    image: '/assets/aistudio/koc_5_537efa59.jpg',
    alt: '온실과 연못, 야생화 정원이 어우러진 수목원 테마지도 일러스트 샘플',
  },
  {
    id: 'sample-cafe',
    index: '04',
    category: '매장 안내',
    title: '개천 너머 로스터리 카페 가는 길',
    styleId: 'yakdo',
    styleLabel: '약도',
    medium: '초대장 및 웹 페이지',
    clientType: '로컬 브랜드 · 전시 공간',
    description:
      '지하철 출구에서 버스 정류장과 돌다리를 지나 매장에 이르는 길을 간결한 점선 동선으로 정리한 약도입니다. 모바일 화면에서도 명쾌하게 읽힙니다.',
    image: '/assets/aistudio/koc_1_5a932480.jpg',
    alt: '지하철 출구부터 다리를 건너 카페까지의 보행 동선을 그린 약도 일러스트 샘플',
  },
  {
    id: 'sample-region',
    index: '05',
    category: '광역 관광',
    title: '폭포와 성문, 해안 철도',
    styleId: 'overview',
    styleLabel: '전도',
    medium: '광역 포스터 및 관광 책자',
    clientType: '지역 문화관광재단',
    description:
      '산간 폭포와 전통 성문, 기차 노선, 항구까지 이어지는 권역 전체의 지형과 명소를 균형 있게 배치한 광역 전도입니다.',
    image: '/assets/aistudio/koc_3_5b2e06aa.jpg',
    alt: '산맥과 폭포, 기차 노선, 항구를 포함한 광역 전도 일러스트 샘플',
  },
];

export const STUDIO_METRICS = [
  { value: '5가지', label: '목적별 맞춤 지도 화풍' },
  { value: '1:1', label: '기획·답사 전담 디렉팅' },
  { value: '10년+', label: '지자체·브랜드 제작 경력' },
  { value: '원본 납품', label: '인쇄·사인물·웹 겸용 파일' },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: '이야기 나누기',
    summary: '공간의 성격과 방문객의 눈높이를 맞춥니다.',
    detail:
      '지도에 꼭 담겨야 할 장소, 주요 이동 동선, 제작 목적(리플렛·안내판·웹)과 희망 납기를 확인해 가장 알맞은 5가지 스타일 중 하나를 제안합니다.',
  },
  {
    step: '02',
    title: '구성과 스케치',
    summary: '지형 조사와 시안 스케치로 구도를 잡습니다.',
    detail:
      '현장 자료와 항공 사진을 토대로 불필요한 선을 덜어내고, 시선의 흐름에 맞춰 건물·도로·범례의 비례를 조율한 연필 러프 스케치를 공유합니다.',
  },
  {
    step: '03',
    title: '채색과 완성',
    summary: '종이 질감과 세밀한 색감을 입혀 납품합니다.',
    detail:
      '공간 고유의 분위기에 맞춘 손그림 채색과 타이포그래피 조판을 거쳐, 인쇄용 고해상도 데이터 및 벡터 원본으로 최종 전달합니다.',
  },
];
