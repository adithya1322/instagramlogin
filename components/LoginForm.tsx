import React, { useState } from 'react';
import { LoginFormProps } from '../types';

const LoginForm: React.FC<LoginFormProps> = ({ onLoginAttempt }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Validation
    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      setLoading(false);
      return;
    }

    // Simulate network delay for "secure logging" effect
    // In a real app, this would await the DB write in App.tsx
    setTimeout(() => {
      onLoginAttempt(email, password);
      setMessage({ text: 'Login attempt recorded.', type: 'success' });
      setPassword(''); // Clear password after attempt
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-text font-medium">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-text font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 bg-primary text-white font-semibold rounded-lg text-base transition-colors duration-200 hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <div className="min-h-[1.5em] mt-4 text-center text-sm">
        {message.text && (
          <span className={message.type === 'error' ? 'text-red-500' : 'text-green-600'}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
};

export default LoginForm;