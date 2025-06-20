import React, { useState, useEffect } from 'react';
import { Brain, Palette, Settings, X, Wand2 } from 'lucide-react';
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
      <div className={`flex flex-col items-center justify-center min-h-full ${showChangelog ? 'blur-sm' : ''}`}>
        {/* Main Content - Centered */}
        <div className="w-full max-w-5xl px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-light tracking-wide mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-fast-gradient">
              Hello Amine,
            </h1>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl font-light tracking-wide bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-fast-gradient">
                Choose your creative journey
              </h2>
              <Wand2 className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link to="/prompt-image" className="group">
              <div className="relative p-12 rounded-3xl bg-white dark:bg-neutral-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center border border-gray-100 dark:border-neutral-700">
                <Brain className="w-20 h-20 text-gray-400 dark:text-neutral-500 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-8" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-6 tracking-wide">
                  PROMPT & IMAGE IT
                </h3>
                <button className="text-sm text-gray-500 dark:text-neutral-500 font-medium transition-colors duration-300 group-hover:text-[#0EA5E9] px-8 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 group-hover:border-[#0EA5E9] tracking-wide">
                  TRY IT
                </button>
              </div>
            </Link>

            <Link to="/stylize-it" className="group relative">
              <div className="relative p-12 rounded-3xl bg-white dark:bg-neutral-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center border border-gray-100 dark:border-neutral-700">
                <div className="absolute top-6 right-6 px-3 py-1 bg-gray-100 dark:bg-neutral-700 group-hover:bg-[#A855F7]/20 rounded-full transition-colors duration-300">
                  <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 group-hover:text-[#A855F7] tracking-wide">BETA</span>
                </div>
                <Palette className="w-20 h-20 text-gray-400 dark:text-neutral-500 transition-colors duration-300 group-hover:text-[#A855F7] mb-8" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#A855F7] mb-6 tracking-wide">
                  STYLIZE IT
                </h3>
                <button className="text-sm text-gray-500 dark:text-neutral-500 font-medium transition-colors duration-300 group-hover:text-[#A855F7] px-8 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 group-hover:border-[#A855F7] tracking-wide">
                  TRY IT
                </button>
              </div>
            </Link>

            <Link to="/tweak-it" className="group">
              <div className="relative p-12 rounded-3xl bg-white dark:bg-neutral-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] aspect-square flex flex-col items-center justify-center text-center border border-gray-100 dark:border-neutral-700">
                <div className="absolute top-6 right-6 px-3 py-1 bg-gray-100 dark:bg-neutral-700 group-hover:bg-[#F97316]/20 rounded-full transition-colors duration-300">
                  <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 group-hover:text-[#F97316] tracking-wide">NEW</span>
                </div>
                <Settings className="w-20 h-20 text-gray-400 dark:text-neutral-500 transition-colors duration-300 group-hover:text-[#F97316] mb-8" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#F97316] mb-6 tracking-wide">
                  TWEAK IT
                </h3>
                <button className="text-sm text-gray-500 dark:text-neutral-500 font-medium transition-colors duration-300 group-hover:text-[#F97316] px-8 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 group-hover:border-[#F97316] tracking-wide">
                  TRY IT
                </button>
              </div>
            </Link>
          </div>
        </div>
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