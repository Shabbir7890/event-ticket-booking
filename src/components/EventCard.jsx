import { Link } from "react-router-dom";
import "../index.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>📍 {event.location}</p>
      <p>🕒 {event.time} | 📅 {event.date}</p>
      <p>💰 ${event.price}</p>
      <Link to={`/booking/${event.id}`} className="book-btn">
        Book Now
      </Link>
    </div>
  );
};

export default EventCard;
