import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import EventCard from "../components/EventCard";
import "../index.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-wrapper fade-in">
      <h2 className="events-title">🎉 Explore Our Latest Events</h2>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="no-events">No events available. Please add some from the dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
