import { useState } from 'react';
import { TrackCard } from './TrackCard';
import { useAudio } from '../context/AudioContext';
import { CATEGORIES } from '../config/tracks';

type CategoryId = (typeof CATEGORIES)[number]['id'] | 'all';

export function TrackGrid() {
  const { tracks, trackStates } = useAudio();
  const [activeCat, setActiveCat] = useState<CategoryId>('all');

  const activeCount = trackStates.filter((t) => t.playing).length;

  const filtered =
    activeCat === 'all'
      ? tracks
      : tracks.filter((t) => t.category === activeCat);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-ink-100 tracking-tight">
            音轨库
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-ink-700/60 text-ink-400 font-medium">
            {tracks.length} 轨
          </span>
          {activeCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-moss-500/15 text-moss-400 font-medium animate-pulse">
              ● {activeCount} 播放中
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCat === 'all'
                ? 'bg-moss-500/20 text-moss-400 ring-1 ring-moss-500/40'
                : 'bg-ink-800/50 text-ink-400 hover:bg-ink-800 hover:text-ink-200 ring-1 ring-ink-700/50'
            }`}
          >
            全部
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCat === c.id
                  ? 'bg-moss-500/20 text-moss-400 ring-1 ring-moss-500/40'
                  : 'bg-ink-800/50 text-ink-400 hover:bg-ink-800 hover:text-ink-200 ring-1 ring-ink-700/50'
              }`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
