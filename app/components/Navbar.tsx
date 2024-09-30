import React from 'react';
import Link from 'next/link';
import './Navbar.css'; // Import the CSS file for styles

interface NavbarProps {
  userId?: string; // Optional, in case it's not passed for guests
  onLogout: () => void; // Logout function
  toggleView: () => void; // Function to toggle between Home and Dashboard
  currentView: 'home' | 'dashboard'; // Current view state
}

const Navbar: React.FC<NavbarProps> = ({ userId, onLogout, toggleView, currentView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ACE Dashboard</div>
      <div className="navbar-links">
        <Link href="/" className="nav-link">Home</Link>
        {userId && ( // Only show Dashboard, Badges, and Events links if the user is logged in
          <>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/badges" className="nav-link">Badges</Link>
            <Link href="/events" className="nav-link">Events</Link>
          </>
        )}
        {userId && (
          <button onClick={toggleView} className="toggle-view-button">
            Go to {currentView === 'home' ? 'Dashboard' : 'Home'}
          </button>
        )}
        {userId ? (
          <button onClick={onLogout} className="logout-button">Logout</button>
        ) : (
          <Link href="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
