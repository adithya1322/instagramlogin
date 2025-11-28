import React from 'react';
import LoginForm from './LoginForm';

interface LoginCardProps {
  onLoginAttempt: (email: string, password: string) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLoginAttempt }) => {
  return (
    <div className="w-full max-w-[400px] bg-surface rounded-lg shadow-lg p-10">
      <div className="text-center mb-8">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
          alt="App Logo" 
          className="w-[60px] h-auto mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-text m-0">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-2">Please enter your details to sign in.</p>
      </div>

      <LoginForm onLoginAttempt={onLoginAttempt} />

      <div className="text-center mt-6 text-sm">
        <a href="#" className="text-primary hover:underline decoration-primary">Forgot password?</a>
        <span className="mx-2 text-gray-300">|</span>
        <a href="#" className="text-primary hover:underline decoration-primary">Create account</a>
      </div>
    </div>
  );
};

export default LoginCard;