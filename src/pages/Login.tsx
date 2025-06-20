import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/';
  };

  if (localStorage.getItem('isLoggedIn')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[320px] space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            AMINEJOURNEY
          </h1>
          <p className="text-sm text-neutral-400">v1.0 alpha</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
              placeholder="Email"
              required
            />
          </div>
          
          <div className="space-y-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-3 px-4 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm font-medium"
          >
            Start !
          </button>
        </form>
      </div>
    </div>
  );
}