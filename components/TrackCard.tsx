import React from 'react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  index: number;
}

const SOURCE_MAP: Record<string, string> = {
  favorite: 'YÊU THÍCH',
  top_played: 'HAY NGHE',
  mixed: 'TỔNG HỢP'
};

export const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  return (
    <div 
      className="flex items-center gap-4 p-4 border-l-2 border-cyan-900 bg-black/40 hover:bg-cyan-900/10 hover:border-cyan-400 transition-all duration-300 group backdrop-blur-sm animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="text-gray-500 font-mono text-sm w-6">{(index + 1).toString().padStart(2, '0')}</div>
      
      <div className="relative w-12 h-12 overflow-hidden border border-gray-800 group-hover:border-cyan-500 transition-colors">
        <img src={track.coverUrl} alt={track.album} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-gray-200 font-bold truncate group-hover:text-cyan-400 transition-colors">{track.title}</h4>
        <p className="text-gray-500 text-sm truncate">{track.artist}</p>
      </div>

      <div className="hidden md:block text-gray-600 text-xs uppercase tracking-wider px-2 border border-gray-800 rounded">
        {SOURCE_MAP[track.source] || track.source}
      </div>

      <div className="text-gray-600 font-mono text-sm group-hover:text-cyan-200">
        {track.duration}
      </div>
    </div>
  );
};