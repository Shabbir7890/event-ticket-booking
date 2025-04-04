import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { supabase } from "../createClient";
import "../index.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching event details:", error);
      } else {
        setEventDetails(data);
      }
    };
    fetchEvent();
  }, [id]);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        id,
        userName,
        userEmail,
        eventTitle: eventDetails?.title
      }
    });
  };

  return (
    <div className="booking-wrapper fade-in">
      <div className="booking-card">
        <h2 className="booking-title">🎟 Book Your Ticket</h2>

        {eventDetails ? (
          <div className="event-info">
            <h3>{eventDetails.title}</h3>
            <p>📅 {eventDetails.date}</p>
            <p>🕒 {eventDetails.time}</p>
            <p>📍 {eventDetails.location}</p>
            <p>💲 {eventDetails.price}</p>
          </div>
        ) : (
          <p>Loading event details...</p>
        )}

        <form onSubmit={handleProceedToPayment} className="booking-form">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button type="submit" className="proceed-btn">💳 Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
