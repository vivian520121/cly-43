import { useAudio } from '../context/AudioContext';

export function Header() {
  const { trackStates, timerActive, timerRemaining } = useAudio();

  const activeCount = trackStates.filter((t) => t.playing).length;

  const timerDisplay = (() => {
    if (!timerActive) return null;
    const total = Math.ceil(timerRemaining / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  })();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-ink-900/70 border-b border-ink-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-moss-500 to-moss-600 flex items-center justify-center shadow-lg shadow-moss-500/20">
            <span className="text-xl">🏔️</span>
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-moss-400 text-ink-900 text-[10px] font-bold flex items-center justify-center ring-2 ring-ink-900">
                {activeCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-ink-100 tracking-tight leading-tight">
              白噪音工作室
            </h1>
            <p className="text-[11px] text-ink-500 leading-tight mt-0.5 hidden sm:block">
              专注 · 放松 · 睡眠
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {timerDisplay && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-moss-500/15 ring-1 ring-moss-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-moss-400 animate-pulse" />
              <span className="font-mono text-xs text-moss-400 font-semibold tabular-nums">
                {timerDisplay}
              </span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-800/60 ring-1 ring-ink-700/50">
            <span className={`w-1.5 h-1.5 rounded-full ${activeCount > 0 ? 'bg-moss-400 animate-pulse' : 'bg-ink-600'}`} />
            <span className="text-xs text-ink-400 font-medium">
              {activeCount > 0 ? '播放中' : '待机'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
