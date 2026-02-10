
export type UserRole = 'passenger' | 'driver';

export interface Location {
  lat: number;
  lng: number;
}

export interface TripInfo {
  id: string;
  driverName: string;
  passengerName: string;
  vehiclePlate: string;
  startLocation: string;
  destination: string;
  status: 'pending' | 'active' | 'completed' | 'emergency';
}

export interface SafetyCheck {
  id: string;
  title: string;
  status: 'checked' | 'warning' | 'pending';
}

export interface AIResponse {
  advice: string;
  riskLevel: 'low' | 'medium' | 'high';
  actionItems: string[];
}
