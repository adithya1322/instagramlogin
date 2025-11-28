export interface LoginAttempt {
  id: string;
  email: string;
  timestamp: string;
  status: 'Attempt Recorded' | 'Success' | 'Failed';
}

export interface LoginFormProps {
  onLoginAttempt: (email: string, password: string) => void;
}

export interface ActivityLogProps {
  logs: LoginAttempt[];
}