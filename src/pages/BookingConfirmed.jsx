import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../createClient";
import QRCodeGenerator from "../components/QRCodeGenerator";
import "../index.css";

const BookingConfirmed = () => {
  const location = useLocation();
  const { id, userName, userEmail, eventTitle } = location.state || {};
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    if (id && userName && userEmail) {
      const ticketInfo = `Event: ${eventTitle}, Name: ${userName}, Email: ${userEmail}`;
      setQrData(ticketInfo);

      const bookTicket = async () => {
        const { error } = await supabase.from("tickets").insert([
          {
            event_id: id,
            user_name: userName,
            user_email: userEmail,
            qr_code: ticketInfo,
          },
        ]);

        if (error) {
          console.error("Error booking ticket:", error);
        }
      };

      bookTicket();
    }
  }, [id, userName, userEmail, eventTitle]);

  return (
    <div className="confirmation-wrapper fade-in">
      <div className="confirmation-box">
        <h2 className="confirmation-title">🎉 Booking Confirmed!</h2>
        <p className="confirmation-text">
          Thank you <strong>{userName}</strong>! Your ticket for <strong>{eventTitle}</strong> has been successfully booked.
        </p>
        <p className="confirmation-subtext">Show this QR code at the event entrance:</p>
        <div className="qr-display">
          <QRCodeGenerator data={qrData} />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;