import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/assets/aistudio/Sunlight_on_Mahogany__1__1d0f1fdd.mp3';

export function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userStoppedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [prevVolume, setPrevVolume] = useState(0.45);
  const [awaitingInteraction, setAwaitingInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAwaitingInteraction(false);
      } catch {
        setIsPlaying(false);
        setAwaitingInteraction(true);
      }
    };

    tryAutoPlay();

    const handleFirstInteraction = async () => {
      if (userStoppedRef.current) return;
      if (!audio.paused) {
        cleanupListeners();
        return;
      }
      try {
        await audio.play();
        setIsPlaying(true);
        setAwaitingInteraction(false);
        cleanupListeners();
      } catch {
        // Keep listener if browser still requires a direct click
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      cleanupListeners();
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userStoppedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      setAwaitingInteraction(false);
    } else {
      userStoppedRef.current = false;
      try {
        await audio.play();
        setIsPlaying(true);
        setAwaitingInteraction(false);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (nextVolume: number) => {
    setVolume(nextVolume);
    if (nextVolume > 0) {
      setPrevVolume(nextVolume);
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 0.45);
    }
  };

  const volumePercent = Math.round(volume * 100);

  return (
    <aside
      aria-label="배경음악 컨트롤"
      className="fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-xl border border-[#dfe3dc] bg-white/95 px-3.5 py-2 shadow-md backdrop-blur-sm md:right-6 md:bottom-6"
    >
      <audio ref={audioRef} src={AUDIO_SRC} autoPlay loop preload="auto" />

      <button
        type="button"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? '배경음악 끄기' : '배경음악 켜기'}
        className={`inline-flex h-9 items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] ${
          isPlaying
            ? 'bg-[#1b4d3e] text-white hover:bg-[#13382d]'
            : 'border border-[#dfe3dc] bg-[#f8f9f7] text-[#161816] hover:bg-[#f0f2ee]'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>음악 ON</span>
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{awaitingInteraction ? '음악 재생' : '음악 OFF'}</span>
          </>
        )}
      </button>

      <div className="flex items-center gap-2 border-l border-[#dfe3dc] pl-3">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={volume === 0 ? '음소거 해제' : '음소거'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#525852] transition-colors hover:bg-[#f0f2ee] hover:text-[#161816] cursor-pointer"
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          aria-label="배경음악 음량 조절"
          className="h-1.5 w-20 cursor-pointer accent-[#1b4d3e] sm:w-24"
        />

        <span className="font-mono-tabular w-9 text-right text-[11px] font-medium text-[#525852]">
          {volumePercent}%
        </span>
      </div>
    </aside>
  );
}
