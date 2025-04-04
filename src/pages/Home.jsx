import "../index.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100); // trigger fade-in animation
  }, []);

  return (
    <div className={`home-hero ${fadeIn ? "fade-in" : ""}`}>
      <div className="home-content">
        <h1 className="home-title">🎫 Welcome to the Event Ticketing System</h1>
        <p className="home-subtitle">
          Find and book tickets for amazing events with ease. Discover concerts, workshops, shows, and more!
        </p>
        <a href="/events" className="explore-btn">Explore Events</a>
      </div>
    </div>
  );
};

export default Home;