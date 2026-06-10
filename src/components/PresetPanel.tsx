import { useState } from 'react';
import { useAudio } from '../context/AudioContext';

export function PresetPanel() {
  const { presets, savePreset, loadPreset, deletePreset, trackStates } =
    useAudio();
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const activeCount = trackStates.filter((t) => t.playing).length;

  const handleSave = () => {
    savePreset(name.trim());
    setName('');
    setShowForm(false);
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="rounded-2xl bg-ink-800/50 ring-1 ring-ink-700/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">💾</span>
          <h2 className="font-semibold text-ink-100">混音方案</h2>
          {activeCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-moss-500/15 text-moss-400">
              {activeCount} 轨
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="text-xs px-3 py-1.5 rounded-lg bg-moss-500/15 hover:bg-moss-500/25 text-moss-400 font-medium transition-colors"
        >
          {showForm ? '取消' : '+ 保存'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 flex gap-2 animate-in">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="方案名称..."
            className="flex-1 px-3 py-2 rounded-xl bg-ink-900/60 ring-1 ring-ink-700/70 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-moss-500/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-moss-500 hover:bg-moss-600 text-white text-sm font-medium transition-colors active:scale-95"
          >
            保存
          </button>
        </div>
      )}

      {presets.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-4xl mb-2 opacity-30">📋</div>
          <p className="text-sm text-ink-400">暂无方案</p>
          <p className="text-xs text-ink-500 mt-1">
            调好混音后点击保存
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 -mr-1">
          {presets.map((p) => {
            const count = p.tracks.filter((t) => t.playing).length;
            return (
              <div
                key={p.id}
                className="group flex items-center gap-3 p-3 rounded-xl bg-ink-900/40 hover:bg-ink-900/70 ring-1 ring-ink-700/40 transition-all"
              >
                <button
                  onClick={() => loadPreset(p.id)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink-100 truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-ink-700/60 text-ink-400 shrink-0">
                      {count} 轨
                    </span>
                  </div>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {formatDate(p.createdAt)}
                  </p>
                </button>
                <button
                  onClick={() => loadPreset(p.id)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs bg-ink-700/60 hover:bg-moss-500/20 text-ink-300 hover:text-moss-400 font-medium transition-colors"
                >
                  应用
                </button>
                <button
                  onClick={() => deletePreset(p.id)}
                  className="shrink-0 p-1.5 rounded-lg text-ink-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="删除"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
