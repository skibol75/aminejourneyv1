import React, { useState, useEffect } from 'react';
import { Brain, Palette, Settings, X, Wand2, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    // Show changelog modal on first visit
    const hasSeenChangelog = localStorage.getItem('hasSeenChangelog_v1.0');
    if (!hasSeenChangelog) {
      setShowChangelog(true);
    }
  }, []);

  const handleCloseChangelog = () => {
    setShowChangelog(false);
    localStorage.setItem('hasSeenChangelog_v1.0', 'true');
  };

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-full space-y-16 ${showChangelog ? 'blur-sm' : ''}`}>
        {/* Workflows Section - Centered */}
        <section className="w-full max-w-5xl">
          <div className="flex items-center justify-center mb-8 gap-3">
            <h2 className="text-3xl font-medium tracking-wide text-center bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-fast-gradient">
              Hello Amine,<br />Choose your creative journey
            </h2>
            <Wand2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/prompt-image" className="group">
              <div className="relative p-8 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#E0F7FF]/80 group-hover:via-[#E8F7FF]/50 group-hover:to-[#F2FCFF]/30 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center">
                <Brain className="w-16 h-16 text-neutral-400 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-6" />
                <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-4">PROMPT & IMAGE IT</h3>
                <button className="text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#0EA5E9] px-6 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 group-hover:border-[#0EA5E9]">
                  TRY IT
                </button>
              </div>
            </Link>

            <Link to="/stylize-it" className="group relative">
              <div className="relative p-8 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#F3E8FF]/80 group-hover:via-[#F5EEFF]/50 group-hover:to-[#F8F2FF]/30 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center">
                <div className="absolute top-4 right-4 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-[#A855F7]/20 rounded-full transition-colors duration-300">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-[#A855F7]">BETA</span>
                </div>
                <Palette className="w-16 h-16 text-neutral-400 transition-colors duration-300 group-hover:text-[#A855F7] mb-6" />
                <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#A855F7] mb-4">STYLIZE IT</h3>
                <button className="text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#A855F7] px-6 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 group-hover:border-[#A855F7]">
                  TRY IT
                </button>
              </div>
            </Link>

            <Link to="/tweak-it" className="group">
              <div className="relative p-8 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#FFF7ED]/80 group-hover:via-[#FFFBF5]/50 group-hover:to-[#FFFEF9]/30 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center">
                <div className="absolute top-4 right-4 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-[#F97316]/20 rounded-full transition-colors duration-300">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-[#F97316]">NEW</span>
                </div>
                <Settings className="w-16 h-16 text-neutral-400 transition-colors duration-300 group-hover:text-[#F97316] mb-6" />
                <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#F97316] mb-4">TWEAK IT</h3>
                <button className="text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#F97316] px-6 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 group-hover:border-[#F97316]">
                  TRY IT
                </button>
              </div>
            </Link>

            <Link to="/video-it" className="group">
              <div className="relative p-8 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#F0F9FF]/80 group-hover:via-[#E0F2FE]/50 group-hover:to-[#F0F9FF]/30 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center">
                <div className="absolute top-4 right-4 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-[#0284C7]/20 rounded-full transition-colors duration-300">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-[#0284C7]">NEW</span>
                </div>
                <Video className="w-16 h-16 text-neutral-400 transition-colors duration-300 group-hover:text-[#0284C7] mb-6" />
                <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#0284C7] mb-4">VIDEO IT</h3>
                <button className="text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#0284C7] px-6 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 group-hover:border-[#0284C7]">
                  TRY IT
                </button>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseChangelog}></div>
          <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={handleCloseChangelog}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                AMINEJOURNEY
                <span className="ml-2 text-sm text-neutral-400">v1.0 alpha</span>
              </h2>
              <h3 className="text-base font-medium text-neutral-600 dark:text-neutral-300">changelog v 1.0</h3>
            </div>

            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">•</span>
                <div>
                  <span>new update includes style transfer so you can copy the style of an image</span>
                  <span className="ml-2 font-semibold text-neutral-800 dark:text-neutral-200">see Tutorial Part</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">•</span>
                <span>you can now choose between different categories</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">•</span>
                <span>We added a Tutorial Part to help you with every workflow</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">•</span>
                <span>New TWEAK IT workflow for precise image editing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">•</span>
                <span>New VIDEO IT workflow for image-to-video generation</span>
              </div>
            </div>

            <button
              onClick={handleCloseChangelog}
              className="w-full mt-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-3 px-4 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}