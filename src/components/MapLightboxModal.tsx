import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { MapImage } from './MapImage';
import { PRODUCTION_FORM_URL, type MapStyleId } from '../data/mapStyles';

export interface LightboxItem {
  title: string;
  subtitle: string;
  styleId: MapStyleId;
  styleLabel: string;
  description: string;
  image: string;
  alt: string;
}

interface MapLightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export function MapLightboxModal({
  item,
  onClose,
}: MapLightboxModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-8 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#dfe3dc] bg-[#f8f9f7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#dfe3dc] bg-white px-6 py-4">
          <div className="min-w-0 pr-4">
            <p className="text-xs font-medium text-[#525852]">
              {item.styleLabel} <span aria-hidden="true">·</span> {item.subtitle}
            </p>
            <h3
              id="lightbox-title"
              className="font-display text-lg font-bold text-[#161816] truncate"
            >
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="상세 보기 닫기"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#dfe3dc] text-[#161816] transition-colors hover:bg-[#f0f2ee] focus-visible:outline-2 focus-visible:outline-[#1b4d3e] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto bg-[#f0f2ee] p-4 md:p-6">
          <div className="overflow-hidden rounded-lg border border-[#dfe3dc] bg-white">
            <MapImage
              src={item.image}
              alt={item.alt}
              title={item.title}
              className="max-h-[62vh] w-full object-contain bg-[#f0f2ee]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#dfe3dc] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-[#525852] max-w-2xl">
            {item.description}
          </p>
          <a
            href={PRODUCTION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#1b4d3e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#13382d]"
          >
            이 스타일로 제작 신청
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
