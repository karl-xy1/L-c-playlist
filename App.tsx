import React, { useState, useEffect, useCallback } from 'react';
import { Track, AppView, PlaylistAnalysis } from './types';
import { MOCK_FAVORITES, MOCK_TOP_PLAYED } from './constants';
import { CyberButton } from './components/CyberButton';
import { TrackCard } from './components/TrackCard';
import { analyzePlaylistWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.CONNECT);
  const [mergedTracks, setMergedTracks] = useState<Track[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PlaylistAnalysis | null>(null);

  // Filter and Merge Logic
  const processTracks = useCallback(() => {
    // 1. Combine lists
    const allTracks = [...MOCK_TOP_PLAYED, ...MOCK_FAVORITES];
    
    // 2. Deduplicate based on ID
    const uniqueTracksMap = new Map<string, Track>();
    
    allTracks.forEach(track => {
      if (uniqueTracksMap.has(track.id)) {
        // If it exists, update source to 'mixed'
        const existing = uniqueTracksMap.get(track.id)!;
        uniqueTracksMap.set(track.id, { ...existing, source: 'mixed' });
      } else {
        uniqueTracksMap.set(track.id, track);
      }
    });

    setMergedTracks(Array.from(uniqueTracksMap.values()));
  }, []);

  const handleConnect = () => {
    // Simulate API delay
    setTimeout(() => {
      processTracks();
      setView(AppView.DASHBOARD);
    }, 1200);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzePlaylistWithGemini(mergedTracks);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      alert("Không thể truy cập Mạng Thần Kinh (Kiểm tra API Key)");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen crt relative text-gray-300 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#00ffff]"></div>
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 neon-text">
              NEON<span className="text-white">STREAM</span>
            </h1>
          </div>
          <div className="text-xs font-mono text-gray-500 hidden sm:block">
            V.2.0.77 // HỆ THỐNG SẴN SÀNG
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 min-h-screen flex flex-col items-center justify-center">
        
        {/* VIEW: CONNECT */}
        {view === AppView.CONNECT && (
          <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-black border border-gray-800 rounded-lg">
                <h2 className="text-4xl font-black mb-4 text-white">ĐỒNG BỘ DỮ LIỆU</h2>
                <p className="text-gray-400 mb-8 font-mono text-sm leading-relaxed">
                  Thiết lập liên kết thần kinh với máy chủ Spotify. 
                  Thuật toán tổng hợp sẽ biên soạn các bài hát Hay Nghe và Yêu Thích thành một luồng thống nhất.
                </p>
                <CyberButton onClick={handleConnect}>
                  KHỞI TẠO KẾT NỐI
                </CyberButton>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 text-xs text-gray-600 font-mono">
              <span>BẢO MẬT SSL</span>
              <span>•</span>
              <span>OAUTH_2.0</span>
              <span>•</span>
              <span>CHỈ ĐỌC</span>
            </div>
          </div>
        )}

        {/* VIEW: DASHBOARD */}
        {view === AppView.DASHBOARD && (
          <div className="w-full max-w-5xl animate-fade-in">
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              
              {/* Left Col: Info / AI */}
              <div className="md:w-1/3 space-y-6">
                <div className="p-6 border border-cyan-500/30 bg-black/50 backdrop-blur shadow-[0_0_15px_rgba(0,255,255,0.1)] rounded-sm">
                  <h3 className="text-cyan-400 text-lg font-bold mb-2 border-b border-cyan-900 pb-2">TÓM TẮT DỮ LIỆU</h3>
                  <ul className="space-y-2 text-sm font-mono text-gray-400">
                    <li className="flex justify-between">
                      <span>TỔNG SỐ BÀI:</span> <span className="text-white">{mergedTracks.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>NGUỒN:</span> <span className="text-pink-500">TỔNG HỢP</span>
                    </li>
                    <li className="flex justify-between">
                      <span>TRẠNG THÁI:</span> <span className="text-green-500">TRỰC TUYẾN</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                     {!analysis ? (
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-4">MODULE PHÂN TÍCH AI SẴN SÀNG</p>
                          <CyberButton variant="pink" onClick={handleAnalyze} isLoading={isAnalyzing} className="w-full text-sm">
                            KÍCH HOẠT GEMINI AI
                          </CyberButton>
                        </div>
                     ) : (
                       <div className="animate-fade-in">
                          <div className="mb-4">
                            <span className="text-xs text-pink-500 font-bold uppercase block mb-1">Tên Playlist Được Tạo</span>
                            <h2 className="text-2xl font-bold text-white neon-text-pink leading-none">{analysis.playlistName}</h2>
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-xs text-cyan-500 font-bold uppercase block mb-1">Phân Tích Vibe</span>
                            <p className="text-sm text-gray-300 italic border-l-2 border-cyan-500 pl-3">"{analysis.vibeDescription}"</p>
                          </div>

                          <div className="mb-4">
                             <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                               <span>MỨC NĂNG LƯỢNG</span>
                               <span>{analysis.energyLevel}%</span>
                             </div>
                             <div className="w-full bg-gray-900 h-1">
                               <div className="bg-gradient-to-r from-cyan-500 to-pink-500 h-1 transition-all duration-1000" style={{ width: `${analysis.energyLevel}%`}}></div>
                             </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {analysis.suggestedTags.map(tag => (
                              <span key={tag} className="text-[10px] uppercase px-2 py-1 border border-gray-700 text-gray-400 rounded hover:border-cyan-500 hover:text-cyan-400 cursor-default transition-colors">
                                #{tag}
                              </span>
                            ))}
                          </div>
                       </div>
                     )}
                  </div>
                </div>
              </div>

              {/* Right Col: List */}
              <div className="md:w-2/3">
                 <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
                   <h3 className="text-xl font-bold text-white">LUỒNG ĐÃ BIÊN DỊCH</h3>
                   <div className="flex gap-4 text-xs font-mono text-gray-500">
                     <span className="flex items-center gap-1"><div className="w-2 h-2 bg-pink-500 rounded-full"></div> = YÊU THÍCH</span>
                     <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-500 rounded-full"></div> = HAY NGHE</span>
                   </div>
                 </div>

                 <div className="space-y-2 h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                    {mergedTracks.map((track, idx) => (
                      <TrackCard key={track.id} track={track} index={idx} />
                    ))}
                 </div>
                 
                 <div className="mt-4 flex justify-end">
                    <button className="text-xs text-gray-500 hover:text-cyan-400 font-mono flex items-center gap-2 transition-colors uppercase">
                      Xuất sang Spotify <span className="text-lg">»</span>
                    </button>
                 </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Decorative Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-top"></div>
      </div>
    </div>
  );
};

export default App;