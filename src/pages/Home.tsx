import React, { useState, useEffect } from 'react';
import { X, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showChangelog, setShowChangelog] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const workflows = [
    { id: 'prompt-image', name: 'prompt & image it', path: '/prompt-image', badge: null },
    { id: 'stylize-it', name: 'stylize it', path: '/stylize-it', badge: 'BETA' },
    { id: 'tweak-it', name: 'tweak it', path: '/tweak-it', badge: 'NEW' },
    { id: 'video-it', name: 'video it', path: '/video-it', badge: 'NEW' }
  ];

  return (
    <>
      <div className={`min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 ${showChangelog ? 'blur-sm' : ''}`}>
        {/* Header */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <h1 className="text-xl font-medium">aminejourney</h1>
          <span className="text-sm text-neutral-400">v1.0 alpha</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-16 max-w-4xl mx-auto px-8">
          {/* Welcome Message */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Hello Amine,<br />
                Choose your creative journey
              </h2>
              <Wand2 className="w-8 h-8 text-emerald-500 mt-4" />
            </div>
          </div>

          {/* Workflows List */}
          <div className="space-y-8 w-full max-w-2xl">
            {workflows.map((workflow) => (
              <Link
                key={workflow.id}
                to={workflow.path}
                className="block group"
                onMouseEnter={() => setHoveredItem(workflow.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative flex items-center justify-between py-6 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <h3 
                      className={`font-light tracking-wide transition-all duration-500 ease-out ${
                        hoveredItem === workflow.id 
                          ? 'text-6xl md:text-7xl text-neutral-900 dark:text-white' 
                          : 'text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {workflow.name}
                    </h3>
                    {workflow.badge && (
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                          hoveredItem === workflow.id
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {workflow.badge}
                      </span>
                    )}
                  </div>
                  
                  <div 
                    className={`transition-all duration-300 ${
                      hoveredItem === workflow.id 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <span className="text-sm font-medium">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Gallery Link */}
          <div className="mt-16">
            <Link 
              to="/gallery"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors text-sm tracking-wide"
            >
              view gallery →
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