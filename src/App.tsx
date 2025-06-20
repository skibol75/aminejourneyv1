import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home as HomeIcon, LayoutGrid, Bell, Clock, LogOut, Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import Workflows from './pages/Workflows';
import Gallery from './pages/Gallery';
import PromptImage from './pages/PromptImage';
import StylizeIt from './pages/StylizeIt';
import TweakIt from './pages/TweakIt';
import VideoIt from './pages/VideoIt';
import Login from './pages/Login';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  if (isLoginPage) {
    return <Login />;
  }

  return (
    <div className="flex h-screen">
      {/* Collapsible Sidebar */}
      <aside 
        className={`${isSidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col 
        bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-300 border-r border-gray-100 dark:border-neutral-800`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* User Profile */}
        <div className={`p-6 flex items-center gap-3 mb-8 ${isSidebarExpanded ? '' : 'justify-center'}`}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src="/src/pages/illustration-du-logo-crocodile_987671-11.avif" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isSidebarExpanded && (
            <div>
              <h2 className="text-sm font-medium">LUXE</h2>
              <p className="text-xs text-gray-500 dark:text-neutral-400">amine@publicis.com</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/">
            <button className={`w-full p-3 flex items-center gap-3 bg-gray-100 dark:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}>
              <HomeIcon className="w-5 h-5" />
              {isSidebarExpanded && 'Home'}
            </button>
          </Link>
          <Link to="/workflows">
            <button className={`w-full p-3 flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}>
              <LayoutGrid className="w-5 h-5" />
              {isSidebarExpanded && 'Workflows'}
            </button>
          </Link>
          <button className={`w-full p-3 flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}>
            <Bell className="w-5 h-5" />
            {isSidebarExpanded && 'Notifications'}
          </button>
          <Link to="/gallery">
            <button className={`w-full p-3 flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}>
              <Clock className="w-5 h-5" />
              {isSidebarExpanded && 'Gallery'}
            </button>
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2">
          <button 
            onClick={handleLogout}
            className={`w-full p-3 flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarExpanded && 'Logout'}
          </button>
          <button 
            className={`w-full p-3 flex items-center gap-3 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg text-sm ${isSidebarExpanded ? '' : 'justify-center'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? 
              <Moon className="w-5 h-5" /> : 
              <Sun className="w-5 h-5" />
            }
            {isSidebarExpanded && (
              <>
                {isDarkMode ? 'Dark' : 'Light'} mode
                <div className={`ml-auto w-8 h-4 ${isDarkMode ? 'bg-neutral-700' : 'bg-gray-200'} rounded-full relative`}>
                  <div className={`absolute w-4 h-4 ${isDarkMode ? 'bg-neutral-500' : 'bg-white'} rounded-full shadow transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className={`flex-1 p-8 overflow-y-auto bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-300`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/prompt-image" element={<PromptImage />} />
            <Route path="/stylize-it" element={<StylizeIt />} />
            <Route path="/tweak-it" element={<TweakIt />} />
            <Route path="/video-it" element={<VideoIt />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;