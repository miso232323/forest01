interface NavbarProps {
  onOpenInquiry: (mode: 'production' | 'consultation') => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe3dc] bg-[#f8f9f7]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4 md:px-10">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#161816] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b4d3e]"
        >
          지도에 마음을 담다
        </a>

        {/* Zone 2: Concise single-line text nav links */}
        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525852]"
        >
          <a
            href="#about"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#161816] hover:underline hover:underline-offset-4 transition-colors"
          >
            소개
          </a>
          <a
            href="#samples"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#161816] hover:underline hover:underline-offset-4 transition-colors"
          >
            제작 샘플
          </a>
          <a
            href="#styles"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#161816] hover:underline hover:underline-offset-4 transition-colors"
          >
            지도 스타일
          </a>
          <a
            href="#contact"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#161816] hover:underline hover:underline-offset-4 transition-colors"
          >
            제작 문의
          </a>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onOpenInquiry('production')}
            className="whitespace-nowrap shrink-0 rounded-md bg-[#1b4d3e] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#13382d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] cursor-pointer"
          >
            제작 신청
          </button>
        </div>
      </div>
    </header>
  );
}
