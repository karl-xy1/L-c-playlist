export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  source: 'favorite' | 'top_played' | 'mixed';
  genre?: string;
}

export interface PlaylistAnalysis {
  playlistName: string;
  vibeDescription: string;
  suggestedTags: string[];
  energyLevel: number; // 0-100
}

export enum AppView {
  CONNECT = 'CONNECT',
  DASHBOARD = 'DASHBOARD',
}