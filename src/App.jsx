import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import MockPayment from "./pages/MockPayment";
import BookingConfirmed from "./pages/BookingConfirmed";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment" element={<MockPayment />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
