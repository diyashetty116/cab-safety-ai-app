
import React from 'react';
import { TripInfo } from '../types';

interface DriverViewProps {
  trip: TripInfo;
  onSOS: () => void;
}

const DriverView: React.FC<DriverViewProps> = ({ trip, onSOS }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500">
      {/* Route & Passenger Card */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-md p-8 border border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Ongoing Ride</h3>
              <p className="text-slate-500 flex items-center gap-2">
                <i className="fas fa-circle text-[8px] text-emerald-500"></i>
                Verified Passenger • 5.0 Star Rated
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-slate-900">$24.50</p>
              <p className="text-slate-400 text-sm">Estimated Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl mb-8">
            <img 
              src={`https://picsum.photos/seed/${trip.passengerName}/100/100`} 
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm" 
              alt="Passenger"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-900">{trip.passengerName}</h4>
              <p className="text-slate-500 mb-2">Member since 2021 • 142 trips</p>
              <div className="flex gap-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">ID VERIFIED</span>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">FREQUENT RIDER</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Route Safety Alert</p>
                <p className="text-slate-700 font-medium">Standard Route: Clear. No high-crime zones detected.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-virus"></i>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Safety Monitor</p>
                <p className="text-slate-700 font-medium">Auto-incident detection active. Audio recording triggered by stress levels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Controls Sidebar */}
      <div className="space-y-6">
        <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-100">
          <h4 className="text-red-700 font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-circle-exclamation"></i>
            Panic Controls
          </h4>
          <button 
            onClick={onSOS}
            className="w-full bg-red-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 mb-4"
          >
            <i className="fas fa-bullhorn text-xl"></i>
            PANIC ALARM
          </button>
          <button className="w-full bg-white text-red-600 border border-red-200 font-semibold py-4 rounded-xl hover:bg-red-100 transition-colors">
            Discreet Help Request
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">Live Activity</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
              <div>
                <p className="text-sm font-medium text-slate-700">Passenger entered vehicle</p>
                <p className="text-xs text-slate-400">12:42 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5"></div>
              <div>
                <p className="text-sm font-medium text-slate-700">Identity verification complete</p>
                <p className="text-xs text-slate-400">12:43 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
              <div>
                <p className="text-sm font-medium text-slate-700">Deviating from usual route (Traffic)</p>
                <p className="text-xs text-slate-400">12:51 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverView;
