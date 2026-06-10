import { useMemo } from 'react';
import { useAudio } from '../context/AudioContext';
import { TimerDuration } from '../types';

const DURATIONS: { value: TimerDuration; label: string }[] = [
  { value: 15, label: '15 分' },
  { value: 25, label: '25 分' },
  { value: 45, label: '45 分' },
  { value: 60, label: '1 小时' },
  { value: 90, label: '1.5 小时' },
];

export function TimerPanel() {
  const {
    timerDuration,
    setTimerDuration,
    timerRemaining,
    timerActive,
    startTimer,
    stopTimer,
  } = useAudio();

  const display = useMemo(() => {
    if (!timerActive) return null;
    const total = Math.ceil(timerRemaining / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, [timerRemaining, timerActive]);

  const progress = useMemo(() => {
    if (!timerActive || timerDuration === 0) return 0;
    const total = timerDuration * 60 * 1000;
    return 1 - timerRemaining / total;
  }, [timerRemaining, timerDuration, timerActive]);

  return (
    <div className="rounded-2xl bg-ink-800/50 ring-1 ring-ink-700/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">⏱️</span>
          <h2 className="font-semibold text-ink-100">专注模式</h2>
        </div>
        {timerActive && (
          <span className="text-xs px-2 py-1 rounded-full bg-moss-500/15 text-moss-400 animate-pulse">
            计时中
          </span>
        )}
      </div>

      {timerActive && display ? (
        <div className="space-y-4">
          <div className="relative">
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-ink-700"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="url(#timerGrad)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress)}`}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-mono text-3xl font-bold text-ink-100 tracking-wider">
                    {display}
                  </div>
                  <div className="text-xs text-ink-400 mt-1">剩余时间</div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={stopTimer}
            className="w-full py-2.5 rounded-xl bg-ink-700/60 hover:bg-ink-700 text-ink-200 text-sm font-medium transition-all active:scale-[0.98]"
          >
            取消计时
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => setTimerDuration(d.value)}
                className={`py-2 rounded-xl text-sm font-medium transition-all ${
                  timerDuration === d.value
                    ? 'bg-moss-500/20 text-moss-400 ring-1 ring-moss-500/40'
                    : 'bg-ink-700/40 text-ink-300 hover:bg-ink-700/60'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={startTimer}
            disabled={timerDuration === 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-moss-500 to-moss-600 text-white font-semibold text-sm shadow-lg shadow-moss-500/20 hover:shadow-moss-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始专注 {timerDuration > 0 && `(${timerDuration} 分钟)`}
          </button>
        </div>
      )}
    </div>
  );
}
