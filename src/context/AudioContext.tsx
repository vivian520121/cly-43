import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  AudioContextValue,
  Preset,
  TrackState,
  TimerDuration,
} from '../types';
import { TRACKS, DEFAULT_TRACK_STATES } from '../config/tracks';

const AudioContext = createContext<AudioContextValue | null>(null);

const PRESETS_KEY = 'whitenoise_presets_v1';

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const timerIntervalRef = useRef<number | null>(null);

  const [trackStates, setTrackStates] =
    useState<TrackState[]>(DEFAULT_TRACK_STATES);
  const [masterVolume, setMasterVolume] = useState(80);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(25);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const initAudioElements = useCallback(() => {
    const map = audioElementsRef.current;
    if (map.size > 0) return;
    TRACKS.forEach((track) => {
      const audio = new Audio(track.src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audio.volume = 0;
      map.set(track.id, audio);
    });
  }, []);

  useEffect(() => {
    initAudioElements();
    const saved = localStorage.getItem(PRESETS_KEY);
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch {
        setPresets([]);
      }
    }
    return () => {
      audioElementsRef.current.forEach((a) => {
        a.pause();
        a.src = '';
      });
      audioElementsRef.current.clear();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [initAudioElements]);

  useEffect(() => {
    trackStates.forEach((ts) => {
      const audio = audioElementsRef.current.get(ts.id);
      if (audio) {
        audio.volume = ts.playing
          ? (ts.volume / 100) * (masterVolume / 100)
          : 0;
      }
    });
  }, [trackStates, masterVolume]);

  const toggleTrack = useCallback((id: string) => {
    setTrackStates((prev) =>
      prev.map((ts) => {
        if (ts.id !== id) return ts;
        const audio = audioElementsRef.current.get(id);
        if (audio) {
          if (!ts.playing) {
            audio.play().catch(() => {});
          } else {
            audio.pause();
          }
        }
        return { ...ts, playing: !ts.playing };
      })
    );
  }, []);

  const setVolume = useCallback((id: string, volume: number) => {
    const v = Math.max(0, Math.min(100, volume));
    setTrackStates((prev) =>
      prev.map((ts) => (ts.id === id ? { ...ts, volume: v } : ts))
    );
  }, []);

  const stopAll = useCallback(() => {
    setTrackStates((prev) =>
      prev.map((ts) => {
        const audio = audioElementsRef.current.get(ts.id);
        if (audio) audio.pause();
        return { ...ts, playing: false };
      })
    );
  }, []);

  const playAll = useCallback(() => {
    setTrackStates((prev) =>
      prev.map((ts) => {
        if (ts.volume <= 0) return ts;
        const audio = audioElementsRef.current.get(ts.id);
        if (audio) audio.play().catch(() => {});
        return { ...ts, playing: true };
      })
    );
  }, []);

  const savePreset = useCallback(
    (name: string) => {
      const snapshot = trackStates.map((ts) => ({ ...ts }));
      const newPreset: Preset = {
        id: `preset_${Date.now()}`,
        name: name || `方案 ${presets.length + 1}`,
        createdAt: Date.now(),
        tracks: snapshot,
      };
      const next = [...presets, newPreset];
      setPresets(next);
      localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    },
    [presets, trackStates]
  );

  const loadPreset = useCallback(
    (id: string) => {
      const preset = presets.find((p) => p.id === id);
      if (!preset) return;
      setTrackStates((prev) =>
        prev.map((ts) => {
          const saved = preset.tracks.find((t) => t.id === ts.id);
          const target = saved ?? ts;
          const audio = audioElementsRef.current.get(ts.id);
          if (audio) {
            if (target.playing && !ts.playing) {
              audio.play().catch(() => {});
            } else if (!target.playing && ts.playing) {
              audio.pause();
            }
          }
          return { ...target };
        })
      );
    },
    [presets]
  );

  const deletePreset = useCallback(
    (id: string) => {
      const next = presets.filter((p) => p.id !== id);
      setPresets(next);
      localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    },
    [presets]
  );

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setTimerActive(false);
    setTimerRemaining(0);
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (timerDuration <= 0) return;
    const start = Date.now();
    const total = timerDuration * 60 * 1000;
    setTimerRemaining(total);
    setTimerActive(true);
    timerIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, total - elapsed);
      setTimerRemaining(remaining);
      if (remaining <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setTimerActive(false);
        stopAll();
      }
    }, 250);
  }, [timerDuration, stopAll]);

  const value: AudioContextValue = {
    tracks: TRACKS,
    trackStates,
    toggleTrack,
    setVolume,
    stopAll,
    playAll,
    masterVolume,
    setMasterVolume,
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    timerDuration,
    setTimerDuration,
    timerRemaining,
    timerActive,
    startTimer,
    stopTimer,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
