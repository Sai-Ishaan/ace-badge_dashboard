"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './utils/firebaseConfig';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { User } from 'firebase/auth';

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'home' ? 'dashboard' : 'home'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar userId={user?.uid} onLogout={handleLogout} toggleView={toggleView} currentView={currentView} />
      {user ? (
        currentView === 'dashboard' ? <Dashboard user={user} /> : <Home />
      ) : (
        <Login />
      )}
      {user && (
        <button onClick={toggleView} style={{ marginTop: '20px' }}>
          Go to {currentView === 'home' ? 'Dashboard' : 'Home'}
        </button>
      )}
    </div>
  );
};

export default Page;
