
import React from 'react';
import { TripInfo } from '../types';

interface PassengerViewProps {
  trip: TripInfo;
  onSOS: () => void;
}

const PassengerView: React.FC<PassengerViewProps> = ({ trip, onSOS }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500">
      {/* Main Trip Status */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100">
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Current Trip</p>
              <h3 className="text-xl font-bold">{trip.id}</h3>
            </div>
            <div className="flex items-center gap-2 bg-indigo-500/50 px-3 py-1 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Active Monitoring
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <div className="w-0.5 h-12 bg-slate-200"></div>
                <div className="w-3 h-3 border-2 border-indigo-600 rounded-full"></div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Pickup</p>
                  <p className="text-slate-800 font-medium">{trip.startLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Destination</p>
                  <p className="text-slate-800 font-medium">{trip.destination}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                <i className="fas fa-location-arrow"></i>
                Share Location
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                <i className="fas fa-video"></i>
                Start Record
              </button>
            </div>
          </div>
        </div>

        {/* Driver Details */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-address-card text-indigo-500"></i>
            Driver Information
          </h4>
          <div className="flex items-center gap-4">
            <img 
              src={`https://picsum.photos/seed/${trip.driverName}/100/100`} 
              className="w-16 h-16 rounded-2xl object-cover" 
              alt="Driver"
            />
            <div className="flex-1">
              <h5 className="font-bold text-slate-900 text-lg">{trip.driverName}</h5>
              <p className="text-slate-500 font-medium">{trip.vehiclePlate}</p>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <span className="text-slate-400 text-xs ml-1">(4.9 • 2.4k rides)</span>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full bg-slate-50 text-indigo-600 flex items-center justify-center border hover:bg-indigo-50 transition-colors">
              <i className="fas fa-phone"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Controls Sidebar */}
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-3xl shadow-xl p-6 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-4">Guardian SOS</h4>
            <p className="text-slate-400 text-sm mb-6">
              Press and hold for 2 seconds to trigger silent alarm and notify emergency contacts.
            </p>
            <button 
              onContextMenu={(e) => e.preventDefault()}
              onClick={onSOS}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-8 rounded-2xl shadow-lg active:scale-95 transition-all text-2xl safe-pulse flex flex-col items-center justify-center gap-2"
            >
              <i className="fas fa-fingerprint text-4xl"></i>
              SOS
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">Safety Checklist</h4>
          <ul className="space-y-4">
            {[
              { text: "Verify vehicle plate matches", icon: "fa-check-circle", checked: true },
              { text: "Child lock check", icon: "fa-lock", checked: false },
              { text: "Route monitoring enabled", icon: "fa-map", checked: true },
              { text: "AI Audio Guardian active", icon: "fa-microphone", checked: true },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <i className={`fas ${item.icon} ${item.checked ? 'text-emerald-500' : 'text-slate-300'}`}></i>
                  <span className={item.checked ? 'text-slate-800' : 'text-slate-400'}>{item.text}</span>
                </div>
                {item.checked && <i className="fas fa-check text-xs text-emerald-500"></i>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PassengerView;
