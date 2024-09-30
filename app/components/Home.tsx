// app/components/Home.tsx

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../utils/firebaseConfig'; // Ensure you import auth
import { useRouter } from 'next/navigation'; // Use Next.js router
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import 'react-calendar/dist/Calendar.css';
import '../globals.css';

interface Event {
  id: string;
  title: string;
  date: Timestamp;
  description: string;
}

const Home: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Event[];
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const handleDateChange = (value: Date | null) => {
    setDate(value);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/login'); // Use router to navigate to login page after logout
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} className="calendar" />
      </div>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <p>{event.title} - {new Date(event.date.toDate()).toDateString()}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
