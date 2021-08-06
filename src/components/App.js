import "../App.css";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/all";
import BookingsPage from "./Bookings/BookingsPage";
import BookablesPage from "./Bookables/BookablesPage";
import UsersPage from "./Users/UsersPage";
import UserPicker from "./Users/UserPicker";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendarAlt />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker />
        </header>

        <Routes>
          <Route path="/bookings" element={<BookingsPage />}></Route>
          <Route path="/bookables" element={<BookablesPage />}></Route>
          <Route path="/users" element={<UsersPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
