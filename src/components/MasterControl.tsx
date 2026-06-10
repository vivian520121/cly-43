import { useAudio } from '../context/AudioContext';

export function MasterControl() {
  const { trackStates, masterVolume, setMasterVolume, playAll, stopAll } =
    useAudio();

  const activeCount = trackStates.filter((t) => t.playing).length;
  const anyPlaying = activeCount > 0;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-ink-800/80 to-ink-800/40 ring-1 ring-ink-700/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`relative h-12 w-12 rounded-xl bg-gradient-to-br from-moss-500 to-moss-600 flex items-center justify-center shadow-lg ${
              anyPlaying ? 'shadow-moss-500/30 animate-pulse-slow' : 'shadow-black/30'
            }`}
          >
            <span className="text-2xl">🎵</span>
            {anyPlaying && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-moss-400 ring-2 ring-ink-900 animate-pulse" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-ink-100">主控</h2>
            <p className="text-xs text-ink-400 mt-0.5">
              {activeCount > 0
                ? `${activeCount} 轨正在播放`
                : '选择音效开始混音'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playAll}
            disabled={activeCount > 0}
            className="p-2.5 rounded-xl bg-ink-700/50 hover:bg-moss-500/20 text-ink-300 hover:text-moss-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="全部播放"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            onClick={stopAll}
            disabled={activeCount === 0}
            className="p-2.5 rounded-xl bg-ink-700/50 hover:bg-red-500/20 text-ink-300 hover:text-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="全部停止"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-400 font-medium">总音量</span>
          <span className="text-sm font-mono text-moss-400 font-semibold">
            {masterVolume}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-ink-500">🔈</span>
          <div className="relative flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={masterVolume}
              onChange={(e) => setMasterVolume(Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${masterVolume}%, #334155 ${masterVolume}%, #334155 100%)`,
              }}
            />
          </div>
          <span className="text-ink-500">🔊</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 pt-2">
          {[0, 25, 50, 100].map((v) => (
            <button
              key={v}
              onClick={() => setMasterVolume(v)}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                masterVolume === v
                  ? 'bg-moss-500/20 text-moss-400 ring-1 ring-moss-500/40'
                  : 'bg-ink-700/40 text-ink-400 hover:bg-ink-700/60 hover:text-ink-200'
              }`}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
