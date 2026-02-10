
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Welcome to GuardianRide</h2>
        <p className="text-slate-600 text-lg">Select your role to activate personalized safety monitoring.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button 
          onClick={() => onSelect('passenger')}
          className="group flex flex-col items-center bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-4xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i className="fas fa-street-view"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am a Passenger</h3>
          <p className="text-slate-500 text-center">
            Monitor your ride, share status with loved ones, and access AI safety check-ins.
          </p>
        </button>

        <button 
          onClick={() => onSelect('driver')}
          className="group flex flex-col items-center bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-4xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <i className="fas fa-car"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am a Driver</h3>
          <p className="text-slate-500 text-center">
            Verify passenger identities, receive route safety alerts, and manage emergency signals.
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
