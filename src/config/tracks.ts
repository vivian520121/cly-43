import { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'rain',
    name: '雨声',
    icon: '🌧️',
    category: 'nature',
    color: 'from-blue-500 to-cyan-400',
    src: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b1b0b4b8c.mp3',
  },
  {
    id: 'stream',
    name: '溪流',
    icon: '💧',
    category: 'nature',
    color: 'from-cyan-500 to-teal-400',
    src: 'https://cdn.pixabay.com/audio/2022/06/07/audio_c8c8a73467.mp3',
  },
  {
    id: 'campfire',
    name: '篝火',
    icon: '🔥',
    category: 'nature',
    color: 'from-orange-500 to-amber-400',
    src: 'https://cdn.pixabay.com/audio/2022/10/30/audio_94661726f3.mp3',
  },
  {
    id: 'waves',
    name: '海浪',
    icon: '🌊',
    category: 'nature',
    color: 'from-indigo-500 to-blue-400',
    src: 'https://cdn.pixabay.com/audio/2022/03/24/audio_2b78d1f75a.mp3',
  },
  {
    id: 'wind',
    name: '山风',
    icon: '🌬️',
    category: 'nature',
    color: 'from-slate-500 to-gray-400',
    src: 'https://cdn.pixabay.com/audio/2022/10/18/audio_f87b9f8a90.mp3',
  },
  {
    id: 'forest',
    name: '森林',
    icon: '🌲',
    category: 'nature',
    color: 'from-emerald-600 to-green-400',
    src: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3',
  },
  {
    id: 'cafe',
    name: '咖啡馆',
    icon: '☕',
    category: 'indoor',
    color: 'from-amber-700 to-yellow-500',
    src: 'https://cdn.pixabay.com/audio/2022/06/11/audio_2b78d1f75a.mp3',
  },
  {
    id: 'fan',
    name: '风扇',
    icon: '🌀',
    category: 'indoor',
    color: 'from-gray-500 to-zinc-400',
    src: 'https://cdn.pixabay.com/audio/2023/01/14/audio_1b1b0b4b8c.mp3',
  },
  {
    id: 'keyboard',
    name: '键盘',
    icon: '⌨️',
    category: 'indoor',
    color: 'from-slate-600 to-slate-400',
    src: 'https://cdn.pixabay.com/audio/2022/11/01/audio_94661726f3.mp3',
  },
  {
    id: 'clock',
    name: '钟摆',
    icon: '🕰️',
    category: 'indoor',
    color: 'from-stone-600 to-amber-600',
    src: 'https://cdn.pixabay.com/audio/2022/12/22/audio_f87b9f8a90.mp3',
  },
  {
    id: 'birds',
    name: '鸟鸣',
    icon: '🐦',
    category: 'ambient',
    color: 'from-sky-500 to-lime-400',
    src: 'https://cdn.pixabay.com/audio/2022/04/27/audio_c8c8a73467.mp3',
  },
  {
    id: 'thunder',
    name: '雷鸣',
    icon: '⛈️',
    category: 'ambient',
    color: 'from-purple-600 to-indigo-500',
    src: 'https://cdn.pixabay.com/audio/2022/05/13/audio_2b78d1f75a.mp3',
  },
];

export const DEFAULT_TRACK_STATES = TRACKS.map((t) => ({
  id: t.id,
  volume: 70,
  playing: false,
}));

export const CATEGORIES = [
  { id: 'nature', name: '自然', icon: '🌿' },
  { id: 'indoor', name: '室内', icon: '🏠' },
  { id: 'ambient', name: '氛围', icon: '✨' },
] as const;
