import { useCallback } from 'react';
import { Track } from '../types';
import { useAudio } from '../context/AudioContext';

interface Props {
  track: Track;
}

export function TrackCard({ track }: Props) {
  const { trackStates, toggleTrack, setVolume } = useAudio();
  const state = trackStates.find((s) => s.id === track.id)!;

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(track.id, Number(e.target.value));
      if (!state.playing && Number(e.target.value) > 0) {
        toggleTrack(track.id);
      }
    },
    [track.id, state.playing, setVolume, toggleTrack]
  );

  return (
    <div
      className={`group relative rounded-2xl p-4 transition-all duration-300 ${
        state.playing
          ? 'bg-ink-800/80 ring-1 ring-moss-500/40 shadow-lg shadow-moss-500/5'
          : 'bg-ink-800/40 hover:bg-ink-800/60 ring-1 ring-ink-700/50'
      }`}
    >
      <div
        className={`absolute inset-x-4 top-0 h-px bg-gradient-to-r ${track.color} opacity-0 transition-opacity ${
          state.playing ? 'opacity-60' : 'group-hover:opacity-30'
        }`}
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <button
          onClick={() => toggleTrack(track.id)}
          className={`flex items-center gap-3 text-left transition-transform active:scale-95 ${
            state.playing ? '' : 'opacity-80'
          }`}
        >
          <div
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${track.color} text-2xl shadow-lg ${
              state.playing
                ? 'shadow-moss-500/20 animate-pulse-slow'
                : 'grayscale-[0.3]'
            }`}
          >
            <span className="drop-shadow">{track.icon}</span>
            {state.playing && (
              <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-[2px]">
                <span className="h-1 w-0.5 animate-pulse rounded-sm bg-moss-400" />
                <span
                  className="h-2 w-0.5 rounded-sm bg-moss-400"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="h-1.5 w-0.5 animate-pulse rounded-sm bg-moss-400"
                  style={{ animationDelay: '300ms' }}
                />
              </span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink-100">
              {track.name}
            </h3>
            <p className="text-xs text-ink-400 mt-0.5">
              {state.playing ? `音量 ${state.volume}%` : '点击开启'}
            </p>
          </div>
        </button>

        <div
          className={`flex h-7 w-12 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all ${
            state.playing
              ? 'bg-moss-500/20 text-moss-400'
              : 'bg-ink-700/50 text-ink-500'
          }`}
        >
          {state.playing ? 'ON' : 'OFF'}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-ink-500 text-xs">🔈</span>
        <div className="relative flex-1">
          <input
            type="range"
            min={0}
            max={100}
            value={state.volume}
            onChange={handleSlider}
            className="slider w-full h-2 rounded-full appearance-none cursor-pointer bg-ink-700/60"
            style={{
              background: state.playing
                ? `linear-gradient(to right, #4ade80 0%, #4ade80 ${state.volume}%, #334155 ${state.volume}%, #334155 100%)`
                : undefined,
            }}
          />
        </div>
        <span className="text-ink-500 text-xs w-4 text-right">🔊</span>
      </div>
    </div>
  );
}
