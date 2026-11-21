import { useState, useEffect, type FormEvent } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { MAP_STYLES, type MapStyleId } from '../data/mapStyles';

export type InquiryMode = 'production' | 'consultation';

interface InquiryModalProps {
  isOpen: boolean;
  initialMode: InquiryMode;
  initialStyle: MapStyleId | 'undecided';
  onClose: () => void;
}

export function InquiryModal({
  isOpen,
  initialMode,
  initialStyle,
  onClose,
}: InquiryModalProps) {
  const [mode, setMode] = useState<InquiryMode>(initialMode);
  const [styleChoice, setStyleChoice] = useState<MapStyleId | 'undecided'>(initialStyle);
  const [medium, setMedium] = useState('인쇄 리플렛');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [locationName, setLocationName] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStyleChoice(initialStyle);
      setErrorMsg('');
      setSubmitted(false);
    }
  }, [isOpen, initialMode, initialStyle]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedStyleName =
    styleChoice === 'undecided'
      ? '상담 후 추천 스타일 결정'
      : MAP_STYLES.find((s) => s.id === styleChoice)?.name ?? '약도';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (!trimmedName) {
      setErrorMsg('성함 또는 기관/브랜드명을 입력해 주세요.');
      return;
    }
    const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const phoneLike = /^[0-9+\-\s()]{8,20}$/.test(trimmedContact);
    if (!emailLike && !phoneLike) {
      setErrorMsg('회신받으실 연락처(휴대전화 번호 또는 이메일)를 정확히 입력해 주세요.');
      return;
    }
    if (!locationName.trim()) {
      setErrorMsg('지도로 담고자 하는 지역이나 공간명을 간단히 적어주세요.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl border border-[#dfe3dc] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#dfe3dc] px-6 py-5">
          <div>
            <p className="text-xs font-medium text-[#1b4d3e]">
              지도에 마음을 담다 · 의뢰 접수
            </p>
            <h3
              id="inquiry-modal-title"
              className="mt-1 font-display text-2xl font-bold text-[#161816]"
            >
              {mode === 'production' ? '그림지도 제작 신청' : '맞춤 제작 상담 신청'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="창 닫기"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#dfe3dc] text-[#161816] transition-colors hover:bg-[#f0f2ee] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 md:p-8">
            <div className="rounded-lg border border-[#dfe3dc] bg-[#f8f9f7] p-6">
              <div className="flex items-center gap-2.5 text-[#1b4d3e]">
                <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="text-base font-bold">
                  {mode === 'production'
                    ? '제작 신청이 정상적으로 접수되었습니다.'
                    : '상담 신청이 정상적으로 접수되었습니다.'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#525852]">
                담당 지도 디렉터가 전달해 주신 공간 정보를 검토한 뒤, 영업일 기준 1일 이내에
                남겨주신 연락처({contact})로 견적과 일정 가이드를 안내해 드립니다.
              </p>

              <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-[#dfe3dc] pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-[#525852]">신청 유형</dt>
                  <dd className="mt-0.5 font-medium text-[#161816]">
                    {mode === 'production' ? '제작 신청' : '상담 신청'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">희망 지도 스타일</dt>
                  <dd className="mt-0.5 font-medium text-[#161816]">{selectedStyleName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">신청인 · 소속</dt>
                  <dd className="mt-0.5 font-medium text-[#161816]">{name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">대상 지역 · 공간</dt>
                  <dd className="mt-0.5 font-medium text-[#161816]">{locationName}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-[#1b4d3e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#13382d] cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Mode Segmented Toggle */}
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#f0f2ee] p-1">
              <button
                type="button"
                onClick={() => setMode('production')}
                className={`rounded-md py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  mode === 'production'
                    ? 'bg-white text-[#161816] shadow-xs'
                    : 'text-[#525852] hover:text-[#161816]'
                }`}
              >
                제작 신청
              </button>
              <button
                type="button"
                onClick={() => setMode('consultation')}
                className={`rounded-md py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  mode === 'consultation'
                    ? 'bg-white text-[#161816] shadow-xs'
                    : 'text-[#525852] hover:text-[#161816]'
                }`}
              >
                상담 신청
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="block text-xs font-semibold text-[#161816]"
                >
                  성함 / 기관 · 브랜드명
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김서연 / 숲속수목원"
                  className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] placeholder:text-[#868d86] focus:border-[#1b4d3e] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-contact"
                  className="block text-xs font-semibold text-[#161816]"
                >
                  연락처 (전화번호 또는 이메일)
                </label>
                <input
                  id="inquiry-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] placeholder:text-[#868d86] focus:border-[#1b4d3e] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="inquiry-style"
                  className="block text-xs font-semibold text-[#161816]"
                >
                  희망 그림지도 스타일 (5종)
                </label>
                <select
                  id="inquiry-style"
                  value={styleChoice}
                  onChange={(e) =>
                    setStyleChoice(e.target.value as MapStyleId | 'undecided')
                  }
                  className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] focus:border-[#1b4d3e] focus:outline-none"
                >
                  <option value="yakdo">01. 약도</option>
                  <option value="detail">02. 상세도</option>
                  <option value="aerial">03. 조감도</option>
                  <option value="overview">04. 전도</option>
                  <option value="botanical">05. 수목원 테마지도</option>
                  <option value="undecided">상담 후 스타일 추천받기</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-medium"
                  className="block text-xs font-semibold text-[#161816]"
                >
                  주요 활용 매체
                </label>
                <select
                  id="inquiry-medium"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] focus:border-[#1b4d3e] focus:outline-none"
                >
                  <option value="인쇄 리플렛">인쇄 리플렛 · 팸플릿</option>
                  <option value="대형 안내판·사인물">옥외 대형 안내판 · 사인물</option>
                  <option value="웹·모바일 지도">웹사이트 · 모바일 안내</option>
                  <option value="복합 매체">인쇄 및 디지털 복합 매체</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="inquiry-location"
                className="block text-xs font-semibold text-[#161816]"
              >
                대상 지역 또는 공간명
              </label>
              <input
                id="inquiry-location"
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="예: 강원도 평창군 00수목원 / 서울시 마포구 성산동 매장"
                className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] placeholder:text-[#868d86] focus:border-[#1b4d3e] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-details"
                className="block text-xs font-semibold text-[#161816]"
              >
                {mode === 'production'
                  ? '포함할 주요 지점 및 희망 일정 (선택)'
                  : '궁금하신 사항이나 희망 상담 시간 (선택)'}
              </label>
              <textarea
                id="inquiry-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  mode === 'production'
                    ? '표기할 건물 수, 리플렛 규격, 희망 납기 등을 자유롭게 적어주세요.'
                    : '예산 범위, 5가지 스타일 중 적합한 방식 추천, 방문 미팅 가능 여부 등을 남겨주세요.'
                }
                className="mt-1.5 w-full rounded-md border border-[#dfe3dc] bg-white px-3.5 py-2.5 text-sm text-[#161816] placeholder:text-[#868d86] focus:border-[#1b4d3e] focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-800"
              >
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-[#dfe3dc] pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-[#dfe3dc] px-4 py-2.5 text-sm font-medium text-[#525852] transition-colors hover:bg-[#f0f2ee] hover:text-[#161816] cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#1b4d3e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#13382d] cursor-pointer"
              >
                {mode === 'production' ? '제작 신청 접수하기' : '상담 신청 접수하기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
