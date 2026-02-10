
import React, { useState, useEffect, useRef } from 'react';
import { UserRole, TripInfo, AIResponse } from '../types';
import { getSafetyAssessment } from '../services/gemini';

interface Props {
  role: UserRole;
  trip: TripInfo;
}

const GeminiSafetyAssistant: React.FC<Props> = ({ role, trip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<AIResponse | null>(null);
  const [chatLog, setChatLog] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);

  const handleAskAI = async (query?: string) => {
    setLoading(true);
    setIsOpen(true);
    
    const context = `I am a ${role} on trip ${trip.id} from ${trip.startLocation} to ${trip.destination}. ${query || 'Please perform a routine safety assessment.'}`;
    
    if (query) {
      setChatLog(prev => [...prev, { role: 'user', text: query }]);
    }

    const res = await getSafetyAssessment(context);
    setAssessment(res);
    setChatLog(prev => [...prev, { role: 'ai', text: res.advice }]);
    setLoading(false);
  };

  useEffect(() => {
    if (role === 'passenger') {
      // Auto-greet passenger
      setChatLog([{ role: 'ai', text: `Hi ${trip.passengerName}, I'm your Gemini Safety Guardian. I'm monitoring your route to ${trip.destination}. How are you feeling?` }]);
    } else {
      setChatLog([{ role: 'ai', text: `Guardian Driver Active. Route monitoring and incident detection is live. Stay safe, ${trip.driverName}.` }]);
    }
  }, [role, trip]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform active:scale-90 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-indigo-600 hover:scale-110'}`}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-wand-magic-sparkles'} text-2xl`}></i>
          {!isOpen && <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>}
        </button>

        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[90vw] md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[70vh] animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-slate-900 p-4 text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-xs"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">Guardian AI Assistant</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Proactive Safety Engine</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatLog.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${chat.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                    {chat.text}
                  </div>
                </div>
              ))}

              {assessment && (
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-indigo-500 uppercase">Assessment Report</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      assessment.riskLevel === 'low' ? 'bg-emerald-100 text-emerald-700' : 
                      assessment.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {assessment.riskLevel} Risk
                    </span>
                  </div>
                  <div className="space-y-2">
                    {assessment.actionItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <i className="fas fa-check-circle text-indigo-400"></i>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-slate-50">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAskAI('Check route safety')}
                  className="bg-white border text-[10px] font-bold px-3 py-2 rounded-full hover:bg-slate-100 transition-colors uppercase"
                >
                  Analyze Route
                </button>
                <button 
                  onClick={() => handleAskAI('Help me talk to driver')}
                  className="bg-white border text-[10px] font-bold px-3 py-2 rounded-full hover:bg-slate-100 transition-colors uppercase"
                >
                  Safety Check-in
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask safety assistant..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAskAI(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                  <i className="fas fa-microphone"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeminiSafetyAssistant;
