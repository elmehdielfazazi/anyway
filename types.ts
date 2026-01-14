
export interface Member {
  id: string;
  name: string;
  joinDate: string;
  status: 'active' | 'expired' | 'pending';
  plan: string;
  lastVisit: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: string[];
  duration: number;
}

export type View = 'dashboard' | 'members' | 'ai-coach' | 'settings';
