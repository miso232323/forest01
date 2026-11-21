import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Expand, MapPin } from 'lucide-react';
import {
  MAP_STYLES,
  PROCESS_STEPS,
  SAMPLE_WORKS,
  STUDIO_METRICS,
  type MapStyleId,
  type SampleWork,
} from './data/mapStyles';
import { Navbar } from './components/Navbar';
import { MapImage } from './components/MapImage';
import { MapLightboxModal, type LightboxItem } from './components/MapLightboxModal';
import { InquiryModal, type InquiryMode } from './components/InquiryModal';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

export default function App() {
  const [activeStyleId, setActiveStyleId] = useState<MapStyleId>('yakdo');
  const [sampleFilter, setSampleFilter] = useState<'all' | MapStyleId>('all');
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('production');
  const [inquiryStyle, setInquiryStyle] = useState<MapStyleId | 'undecided'>('yakdo');

  const activeStyle =
    MAP_STYLES.find((style) => style.id === activeStyleId) ?? MAP_STYLES[0];

  const filteredSamples =
    sampleFilter === 'all'
      ? SAMPLE_WORKS
      : SAMPLE_WORKS.filter((item) => item.styleId === sampleFilter);

  const openInquiry = (
    mode: InquiryMode,
    style: MapStyleId | 'undecided' = activeStyleId
  ) => {
    setInquiryMode(mode);
    setInquiryStyle(style);
    setInquiryOpen(true);
  };

  const openSampleLightbox = (sample: SampleWork) => {
    setLightboxItem({
      title: sample.title,
      subtitle: `${sample.category} · ${sample.medium}`,
      styleId: sample.styleId,
      styleLabel: sample.styleLabel,
      description: sample.description,
      image: sample.image,
      alt: sample.alt,
    });
  };

  const openStyleLightbox = (style = activeStyle) => {
    setLightboxItem({
      title: `${style.index}. ${style.name}`,
      subtitle: style.englishName,
      styleId: style.id,
      styleLabel: style.name,
      description: style.description,
      image: style.image,
      alt: style.alt,
    });
  };

  return (
    <div id="top" className="min-h-screen bg-[#f8f9f7] text-[#161816]">
      <Navbar onOpenInquiry={(mode) => openInquiry(mode, activeStyleId)} />

      <main>
        {/* 1. Hero Section */}
        <section
          id="about"
          className="mx-auto max-w-[1280px] px-6 pt-12 pb-10 md:px-10 md:pt-16 md:pb-14"
        >
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-6 py-2">
              <div>
                <p className="text-sm font-medium text-[#1b4d3e]">
                  그림지도 제작 스튜디오 · 지도에 마음을 담다
                </p>
                <h1
                  className="mt-4 font-display font-bold tracking-tight text-[#161816] leading-[1.18]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  장소의 이야기를
                  <br />
                  <span className="text-[#1b4d3e]">한 장의 지도로.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#525852] md:text-[17px]">
                  낯선 골목에는 명쾌한 방향을, 익숙한 공간에는 따뜻한 시선을 더합니다.
                  약도부터 상세도, 조감도, 전도, 수목원 테마지도까지 목적과 매체에
                  알맞은 손그림 지도로 오래 기억되는 방문 경험을 설계합니다.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#samples"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-[#1b4d3e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#13382d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
                >
                  제작 샘플 살펴보기
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#styles"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#161816] transition-colors hover:bg-[#f0f2ee]"
                >
                  그림지도 5가지 스타일 보기
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#dfe3dc] bg-white">
                <div className="relative flex-1 overflow-hidden bg-[#f2f4ef]">
                  <MapImage
                    src="/assets/aistudio/koc_3_5b2e06aa.jpg"
                    alt="산맥과 폭포, 기차 노선, 전통 성문과 항구 마을을 손그림 수채화로 담은 전도 스타일 그림지도"
                    title="광역 전도 일러스트"
                    className="h-full max-h-[520px] w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <button
                    type="button"
                    onClick={() => openStyleLightbox(MAP_STYLES[3])}
                    aria-label="대표 전도 그림지도 크게 보기"
                    className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md border border-[#dfe3dc] bg-white/95 px-3 py-1.5 text-xs font-medium text-[#161816] shadow-xs transition-colors hover:bg-white cursor-pointer"
                  >
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    크게 보기
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-[#dfe3dc] bg-white px-5 py-3 text-xs text-[#525852]">
                  <span>대표 아트워크 · 지역 문화유산 광역 전도</span>
                  <span className="font-mono-tabular text-[#161816]">04 / 전도</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Studio Strip below Hero Split */}
          <div className="mt-10 grid grid-cols-2 border-y border-[#dfe3dc] bg-white md:grid-cols-4">
            {STUDIO_METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                className={`px-5 py-5 ${
                  idx % 2 === 1 ? 'border-l border-[#dfe3dc]' : ''
                } ${idx >= 2 ? 'border-t border-[#dfe3dc] md:border-t-0 md:border-l' : ''}`}
              >
                <p className="font-display text-xl font-bold text-[#161816] md:text-2xl font-mono-tabular">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-[#525852] md:text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Selected Works / 제작 샘플 예시 */}
        <section
          id="samples"
          className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20"
        >
          <div className="flex flex-col gap-6 border-b border-[#dfe3dc] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#1b4d3e]">제작 샘플 예시</p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-[#161816] md:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                목적과 공간에 맞춰 그린 지도들
              </h2>
            </div>

            {/* Interactive Sample Filter Controls */}
            <div
              role="group"
              aria-label="샘플 스타일 필터"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-[#f0f2ee] p-1"
            >
              <button
                type="button"
                onClick={() => setSampleFilter('all')}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  sampleFilter === 'all'
                    ? 'bg-white text-[#161816] shadow-xs'
                    : 'text-[#525852] hover:text-[#161816]'
                }`}
              >
                전체 보기
              </button>
              {MAP_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSampleFilter(style.id)}
                  className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    sampleFilter === style.id
                      ? 'bg-white text-[#161816] shadow-xs'
                      : 'text-[#525852] hover:text-[#161816]'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSamples.map((sample, idx) => {
              const isWide = sampleFilter === 'all' && idx === 0;
              return (
                <article
                  key={sample.id}
                  className={`group flex flex-col overflow-hidden rounded-xl border border-[#dfe3dc] bg-white transition-colors hover:border-[#b9c1b6] ${
                    isWide ? 'md:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openSampleLightbox(sample)}
                    className="relative block w-full overflow-hidden bg-[#f2f4ef] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1b4d3e]"
                  >
                    <div
                      className={`w-full overflow-hidden ${
                        isWide ? 'aspect-square md:aspect-16/10' : 'aspect-square'
                      }`}
                    >
                      <MapImage
                        src={sample.image}
                        alt={sample.alt}
                        title={sample.title}
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#525852]">
                        <span className="font-mono-tabular font-medium text-[#1b4d3e]">
                          {sample.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{sample.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{sample.styleLabel}</span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-bold text-[#161816]">
                        {sample.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#525852]">
                        {sample.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#dfe3dc] pt-4 text-xs">
                      <span className="text-[#525852]">
                        {sample.clientType} <span aria-hidden="true">·</span> {sample.medium}
                      </span>
                      <button
                        type="button"
                        onClick={() => openSampleLightbox(sample)}
                        className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[#1b4d3e] hover:underline cursor-pointer"
                      >
                        자세히 보기
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Five Map Styles Menu / 5가지 그림지도 스타일 분류 */}
        <section
          id="styles"
          className="border-y border-[#dfe3dc] bg-white py-16 md:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium text-[#1b4d3e]">
                  그림지도 5가지 스타일 분류
                </p>
                <h2
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-[#161816] md:text-4xl"
                  style={{ textWrap: 'balance' }}
                >
                  공간에 가장 알맞은 시선을 선택하세요
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#525852]">
                필요한 정보의 밀도와 보여주고 싶은 풍경의 범위에 따라 5가지 그림지도
                스타일로 분류해 제작합니다.
              </p>
            </div>

            {/* 5-Style Menu Tabs */}
            <div
              role="tablist"
              aria-label="그림지도 5가지 스타일 메뉴"
              className="mt-8 flex flex-wrap gap-2 border-b border-[#dfe3dc] pb-4"
            >
              {MAP_STYLES.map((style) => {
                const isSelected = style.id === activeStyleId;
                return (
                  <button
                    key={style.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    aria-controls={`style-panel-${style.id}`}
                    onClick={() => setActiveStyleId(style.id)}
                    className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1b4d3e] ${
                      isSelected
                        ? 'bg-[#1b4d3e] text-white'
                        : 'border border-[#dfe3dc] bg-[#f8f9f7] text-[#525852] hover:bg-[#f0f2ee] hover:text-[#161816]'
                    }`}
                  >
                    <span className="font-mono-tabular text-xs opacity-80">
                      {style.index}
                    </span>
                    <span>{style.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Style Showcase Panel */}
            <div
              id={`style-panel-${activeStyle.id}`}
              role="tabpanel"
              className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-7">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#dfe3dc] bg-[#f2f4ef]">
                  <div className="relative aspect-square max-h-[580px] w-full overflow-hidden bg-[#f2f4ef]">
                    <MapImage
                      src={activeStyle.image}
                      alt={activeStyle.alt}
                      title={activeStyle.name}
                      className="h-full w-full object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={() => openStyleLightbox(activeStyle)}
                      aria-label={`${activeStyle.name} 샘플 크게 보기`}
                      className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md border border-[#dfe3dc] bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#161816] shadow-xs transition-colors hover:bg-white cursor-pointer"
                    >
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                      샘플 확대 보기
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tabular text-sm font-medium text-[#1b4d3e]">
                      {activeStyle.index}
                    </span>
                    <span className="text-xs text-[#525852]">
                      {activeStyle.englishName}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-3xl font-bold text-[#161816]">
                    {activeStyle.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[#1b4d3e]">
                    {activeStyle.summary}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#525852]">
                    {activeStyle.description}
                  </p>

                  <dl className="mt-6 divide-y divide-[#dfe3dc] border-y border-[#dfe3dc] text-sm">
                    <div className="grid grid-cols-3 gap-3 py-3">
                      <dt className="font-medium text-[#525852]">추천 용도</dt>
                      <dd className="col-span-2 text-[#161816]">
                        {activeStyle.recommendedUses}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-3 py-3">
                      <dt className="font-medium text-[#525852]">표현 방식</dt>
                      <dd className="col-span-2 text-[#161816]">
                        {activeStyle.expressionMethod}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-3 py-3">
                      <dt className="font-medium text-[#525852]">평균 제작 기간</dt>
                      <dd className="col-span-2 font-mono-tabular text-[#161816]">
                        {activeStyle.leadTime}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-3 py-3">
                      <dt className="font-medium text-[#525852]">납품 규격</dt>
                      <dd className="col-span-2 text-[#161816]">
                        {activeStyle.deliverables}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openInquiry('production', activeStyle.id)}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-[#1b4d3e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#13382d] cursor-pointer"
                  >
                    {activeStyle.name} 제작 신청
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openInquiry('consultation', activeStyle.id)}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#161816] transition-colors hover:bg-[#f0f2ee] cursor-pointer"
                  >
                    이 스타일 상담받기
                  </button>
                </div>
              </div>
            </div>

            {/* 5-Style Visual Quick Index Strip */}
            <div className="mt-12 border-t border-[#dfe3dc] pt-8">
              <p className="text-xs font-medium text-[#525852]">
                5가지 스타일 한눈에 비교하기
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {MAP_STYLES.map((style) => {
                  const isActive = style.id === activeStyleId;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setActiveStyleId(style.id)}
                      className={`group flex flex-col overflow-hidden rounded-lg border text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#1b4d3e] bg-[#f8f9f7]'
                          : 'border-[#dfe3dc] bg-white hover:border-[#b9c1b6]'
                      }`}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-[#f2f4ef]">
                        <MapImage
                          src={style.image}
                          alt={style.alt}
                          title={style.name}
                          className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tabular text-xs text-[#1b4d3e]">
                            {style.index}
                          </span>
                          {isActive && (
                            <span className="text-[11px] font-semibold text-[#1b4d3e]">
                              선택됨
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-display text-sm font-bold text-[#161816]">
                          {style.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Studio Process */}
        <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1b4d3e]">지도 제작 과정</p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#161816] md:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              작은 단서부터 완성본까지
            </h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 divide-y divide-[#dfe3dc] border-y border-[#dfe3dc] bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
            {PROCESS_STEPS.map((item) => (
              <li key={item.step} className="p-6 md:p-8">
                <span className="font-mono-tabular text-sm font-medium text-[#1b4d3e]">
                  {item.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#161816]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#161816]">
                  {item.summary}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#525852]">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. CTA Banner (제작 신청 및 상담 신청 버튼) */}
        <section id="contact" className="mx-auto max-w-[1280px] px-6 pb-16 md:px-10 md:pb-24">
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-[#14241e] px-8 py-12 text-white md:flex-row md:items-center md:px-12 md:py-16">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-[#b5d2c6]">
                맞춤 그림지도 제작 의뢰
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                당신의 장소를 한 장의 지도에 담아볼까요?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#d2dfd9] md:text-base">
                약도, 상세도, 조감도, 전도, 수목원 테마지도 중 공간의 목적에 알맞은
                구성과 일정을 제안해 드립니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openInquiry('production', activeStyleId)}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#14241e] transition-colors hover:bg-[#edf2ef] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                제작 신청하기
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => openInquiry('consultation', 'undecided')}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-white/35 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                상담 신청하기
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer (회사 위치 설명 포함) */}
      <footer className="border-t border-[#dfe3dc] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-display text-lg font-bold text-[#161816]">
                지도에 마음을 담다
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#525852]">
                장소의 역사와 동선, 풍경의 온도를 손그림 지도로 기록하는 일러스트 지도
                제작 스튜디오입니다.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#161816]">
                <MapPin className="h-3.5 w-3.5 text-[#1b4d3e]" aria-hidden="true" />
                <span>회사 위치 안내</span>
              </div>
              <address className="mt-2.5 not-italic text-sm leading-relaxed text-[#525852]">
                <p className="font-medium text-[#161816]">
                  서울특별시 마포구 월드컵로 12길 34, 2층 작업실
                </p>
                <p className="mt-1">
                  지하철 2·6호선 합정역 8번 출구에서 망원한강공원 방면 도보 5분 거리에
                  위치해 있습니다. 스튜디오 내 원화 지류 샘플 열람 및 대면 상담은 사전
                  예약 후 방문해 주시기 바랍니다.
                </p>
              </address>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold text-[#161816]">문의 및 운영 시간</p>
              <div className="mt-2.5 space-y-1 text-sm text-[#525852]">
                <p>이메일: hello@mapstory.kr</p>
                <p className="font-mono-tabular">전화: 02-332-1048</p>
                <p>운영: 평일 10:00 – 18:00 (주말·공휴일 휴무)</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[#dfe3dc] pt-6 text-xs text-[#525852] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 지도에 마음을 담다. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-[#161816]">
                스튜디오 소개
              </a>
              <a href="#samples" className="hover:text-[#161816]">
                제작 샘플
              </a>
              <a href="#styles" className="hover:text-[#161816]">
                5가지 지도 스타일
              </a>
            </div>
          </div>
        </div>
      </footer>

      <MapLightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onRequestStyle={(styleId) => openInquiry('production', styleId)}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        initialMode={inquiryMode}
        initialStyle={inquiryStyle}
        onClose={() => setInquiryOpen(false)}
      />

      <BackgroundMusicPlayer />
    </div>
  );
}
