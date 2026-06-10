import { AudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { TrackGrid } from './components/TrackGrid';
import { MasterControl } from './components/MasterControl';
import { TimerPanel } from './components/TimerPanel';
import { PresetPanel } from './components/PresetPanel';

export default function App() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-ink-900 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-moss-500/10 blur-3xl" />
          <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
              <div className="min-w-0">
                <TrackGrid />
              </div>

              <div className="space-y-5 lg:sticky lg:top-20 lg:self-start">
                <MasterControl />
                <TimerPanel />
                <PresetPanel />

                <div className="rounded-2xl bg-ink-800/30 ring-1 ring-ink-700/40 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg shrink-0">💡</span>
                    <div>
                      <p className="text-xs text-ink-300 leading-relaxed">
                        <span className="font-semibold text-ink-200">小贴士：</span>
                        拖动滑块调节音量，首次滑动会自动开启音轨。混合多种自然音效，创造专属的沉浸式环境。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-ink-800/60 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-ink-500">
                © 2025 白噪音工作室 · 为专注与宁静而生
              </p>
              <div className="flex items-center gap-4 text-xs text-ink-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-moss-400 animate-pulse" />
                  支持后台播放
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" strokeLinecap="round" />
                  </svg>
                  PWA 离线可用
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </AudioProvider>
  );
}
