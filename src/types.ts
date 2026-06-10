export interface Track {
  id: string;
  name: string;
  icon: string;
  category: 'nature' | 'indoor' | 'ambient';
  color: string;
  src: string;
}

export interface TrackState {
  id: string;
  volume: number;
  playing: boolean;
}

export interface Preset {
  id: string;
  name: string;
  createdAt: number;
  tracks: TrackState[];
}

export type TimerDuration = 0 | 15 | 25 | 45 | 60 | 90;

export interface AudioContextValue {
  tracks: Track[];
  trackStates: TrackState[];
  toggleTrack: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  stopAll: () => void;
  playAll: () => void;
  masterVolume: number;
  setMasterVolume: (v: number) => void;
  presets: Preset[];
  savePreset: (name: string) => void;
  loadPreset: (id: string) => void;
  deletePreset: (id: string) => void;
  timerDuration: TimerDuration;
  setTimerDuration: (d: TimerDuration) => void;
  timerRemaining: number;
  timerActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
}
