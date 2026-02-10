
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole | null;
  onReset: () => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({ role, onReset }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
          <i className="fas fa-shield-halved"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-none">GuardianRide</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">
            {role ? `${role} safety portal` : 'AI-Powered Safety'}
          </p>
        </div>
      </div>

      {role && (
        <button 
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          title="Switch Role"
        >
          <i className="fas fa-user-gear"></i>
        </button>
      )}
    </header>
  );
};

export default DashboardHeader;
