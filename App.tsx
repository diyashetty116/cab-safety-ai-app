
import React, { useState, useEffect } from 'react';
import { UserRole, TripInfo } from './types';
import DashboardHeader from './components/DashboardHeader';
import RoleSelector from './components/RoleSelector';
import PassengerView from './components/PassengerView';
import DriverView from './components/DriverView';
import GeminiSafetyAssistant from './components/GeminiSafetyAssistant';

const MOCK_TRIP: TripInfo = {
  id: "TRP-8821",
  driverName: "Sarah Connor",
  passengerName: "John Doe",
  vehiclePlate: "ABC-1234 (Silver Tesla)",
  startLocation: "Downtown Central Mall",
  destination: "Northside Residence 212",
  status: 'active'
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [trip, setTrip] = useState<TripInfo>(MOCK_TRIP);
  const [isSOS, setIsSOS] = useState(false);

  const handleSOS = () => {
    setIsSOS(true);
    setTrip(prev => ({ ...prev, status: 'emergency' }));
    // In a real app, this would trigger emergency services and contact alerts
  };

  const handleReset = () => {
    setIsSOS(false);
    setRole(null);
    setTrip(MOCK_TRIP);
  };

  if (isSOS) {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="text-9xl mb-8 animate-pulse">
          <i className="fas fa-triangle-exclamation"></i>
        </div>
        <h1 className="text-4xl font-bold mb-4">EMERGENCY MODE ACTIVATED</h1>
        <p className="text-xl mb-8 opacity-90">
          Emergency services have been notified. Your location is being shared with police and trusted contacts.
          Recording audio and video...
        </p>
        <div className="space-y-4 w-full max-w-md">
          <button 
            className="w-full bg-white text-red-600 font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
            onClick={() => window.open('tel:911')}
          >
            CALL 911 NOW
          </button>
          <button 
            className="w-full border-2 border-white bg-transparent font-semibold py-4 rounded-xl hover:bg-white/10"
            onClick={handleReset}
          >
            CANCEL (I AM SAFE)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-24 lg:pb-0">
      <DashboardHeader role={role} onReset={handleReset} />
      
      <main className="flex-1 container mx-auto p-4 max-w-6xl">
        {!role ? (
          <RoleSelector onSelect={setRole} />
        ) : role === 'passenger' ? (
          <PassengerView trip={trip} onSOS={handleSOS} />
        ) : (
          <DriverView trip={trip} onSOS={handleSOS} />
        )}
      </main>

      {role && <GeminiSafetyAssistant role={role} trip={trip} />}
    </div>
  );
};

export default App;
