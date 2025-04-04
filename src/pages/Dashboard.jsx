import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import "../index.css";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState("");

  useEffect(() => {
    fetchTickets();
    fetchEvents();
  }, []);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from("tickets").select("*");
    if (error) console.error("Error fetching tickets:", error);
    else setTickets(data);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) console.error("Error fetching events:", error);
    else setEvents(data);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDescription || !eventDate || !eventTime || !eventLocation || !eventPrice) {
      alert("Please fill in all fields!");
      return;
    }

    const { error } = await supabase.from("events").insert([{
      title: eventTitle,
      description: eventDescription,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      price: eventPrice
    }]);

    if (error) {
      console.error("Error adding event:", error);
      alert("Error adding event!");
    } else {
      alert("Event added successfully!");
      setEventTitle("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
      setEventPrice("");
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event!");
    } else {
      alert("Event deleted successfully!");
      fetchEvents();
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    const { error } = await supabase.from("tickets").delete().eq("id", ticketId);
    if (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket!");
    } else {
      alert("Ticket deleted successfully!");
      fetchTickets();
    }
  };

  return (
    <div className="dashboard-container fade-in">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      <div className="dashboard-sections">
        {/* Add Event */}
        <div className="dashboard-card event-form">
          <h3>Create New Event</h3>
          <form onSubmit={handleAddEvent}>
            <input type="text" placeholder="Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
            <textarea placeholder="Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
            <input type="text" placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
            <input type="number" placeholder="Price ($)" value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} />
            <button className="add-btn">➕ Add Event</button>
          </form>
        </div>

        {/* Events */}
        <div className="dashboard-card">
          <h3>🎉 Upcoming Events</h3>
          <ul className="dashboard-list">
            {events.length > 0 ? (
              events.map(event => (
                <li key={event.id} className="dashboard-list-item">
                  <strong>{event.title}</strong>
                  <p>📅 {event.date} | ⏰ {event.time}</p>
                  <p>📍 {event.location} | 💲{event.price}</p>
                  <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">🗑 Delete</button>
                </li>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </ul>
        </div>

        {/* Tickets */}
        <div className="dashboard-card">
          <h3>🎫 Booked Tickets</h3>
          <ul className="dashboard-list">
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <li key={ticket.id} className="dashboard-list-item">
                  <strong>{ticket.user_name}</strong> ({ticket.user_email})<br />
                  Event ID: {ticket.event_id}
                  <button onClick={() => handleDeleteTicket(ticket.id)} className="delete-btn">🗑 Delete</button>
                </li>
              ))
            ) : (
              <p>No tickets booked yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
