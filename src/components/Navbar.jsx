import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🎟 Event Ticketing</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;