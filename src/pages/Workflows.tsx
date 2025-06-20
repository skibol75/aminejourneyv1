import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Palette, Settings } from 'lucide-react';

export default function Workflows() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">Workflows</h1>
        <p className="text-neutral-400">Create and manage your AI image generation workflows</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Link to="/prompt-image" className="group">
          <div className="relative p-6 rounded-3xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#E0F7FF]/80 group-hover:via-[#E8F7FF]/50 group-hover:to-[#F2FCFF]/30 hover:shadow-2xl hover:scale-[1.02]">
            <Brain className="w-20 h-20 text-neutral-400 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-6" />
            <h3 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#0EA5E9] mb-2">PROMPT & IMAGE IT</h3>
            <button className="text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#0EA5E9]">TRY IT</button>
          </div>
        </Link>

        <Link to="/stylize-it" className="group relative">
          <div className="relative p-6 rounded-3xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#F3E8FF]/80 group-hover:via-[#F5EEFF]/50 group-hover:to-[#F8F2FF]/30 hover:shadow-2xl hover:scale-[1.02]">
            <div className="absolute top-6 right-6 px-3 py-1 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-[#A855F7]/20 rounded-full transition-colors duration-300">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-[#A855F7]">BETA</span>
            </div>
            <Palette className="w-20 h-20 text-neutral-400 transition-colors duration-300 group-hover:text-[#A855F7] mb-6" />
            <h3 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#A855F7] mb-2">STYLIZE IT</h3>
            <button className="text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#A855F7]">TRY IT</button>
          </div>
        </Link>

        <Link to="/tweak-it" className="group">
          <div className="relative p-6 rounded-3xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#FFF7ED]/80 group-hover:via-[#FFFBF5]/50 group-hover:to-[#FFFEF9]/30 hover:shadow-2xl hover:scale-[1.02]">
            <div className="absolute top-6 right-6 px-3 py-1 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-[#F97316]/20 rounded-full transition-colors duration-300">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-[#F97316]">NEW</span>
            </div>
            <Settings className="w-20 h-20 text-neutral-400 transition-colors duration-300 group-hover:text-[#F97316] mb-6" />
            <h3 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:text-[#F97316] mb-2">TWEAK IT</h3>
            <button className="text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-[#F97316]">TRY IT</button>
          </div>
        </Link>
      </div>
    </div>
  );
}