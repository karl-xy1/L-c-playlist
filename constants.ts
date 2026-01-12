import { Track } from "./types";

export const MOCK_FAVORITES: Track[] = [
  { id: '1', title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', duration: '4:18', coverUrl: 'https://picsum.photos/200/200?random=1', source: 'favorite', genre: 'Synthwave' },
  { id: '2', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03', coverUrl: 'https://picsum.photos/200/200?random=2', source: 'favorite', genre: 'Dream Pop' },
  { id: '3', title: 'Harder, Better, Faster, Stronger', artist: 'Daft Punk', album: 'Discovery', duration: '3:44', coverUrl: 'https://picsum.photos/200/200?random=3', source: 'favorite', genre: 'House' },
  { id: '4', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', coverUrl: 'https://picsum.photos/200/200?random=4', source: 'favorite', genre: 'Synth-pop' },
];

export const MOCK_TOP_PLAYED: Track[] = [
  { id: '1', title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', duration: '4:18', coverUrl: 'https://picsum.photos/200/200?random=1', source: 'top_played', genre: 'Synthwave' }, // Duplicate intended
  { id: '5', title: 'Turbo Killer', artist: 'Carpenter Brut', album: 'Trilogy', duration: '4:12', coverUrl: 'https://picsum.photos/200/200?random=5', source: 'top_played', genre: 'Darksynth' },
  { id: '6', title: 'Resonance', artist: 'HOME', album: 'Odyssey', duration: '3:32', coverUrl: 'https://picsum.photos/200/200?random=6', source: 'top_played', genre: 'Chillwave' },
  { id: '7', title: 'Tech Noir', artist: 'Gunship', album: 'Gunship', duration: '4:52', coverUrl: 'https://picsum.photos/200/200?random=7', source: 'top_played', genre: 'Synthwave' },
];
