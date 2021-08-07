import { useState } from "react";
import { days } from "../../data/days";

export default function BookablesDetails({ bookable }) {
  const [hasDetails, setHasDetails] = useState(true);

  const toggleHasDetails = () => setHasDetails((prevState) => !prevState);

  return bookable ? (
    <div className="bookable-details">
      <div className="item">
        <div className="item-header">
          <h2>{bookable.title}</h2>
          <span className="controls">
            <label>
              <input
                type="checkbox"
                checked={hasDetails}
                onChange={toggleHasDetails}
              />
              Show Details
            </label>
          </span>
        </div>

        <p>{bookable.notes}</p>

        {hasDetails && (
          <div className="item-details">
            <h3>Availability</h3>
            <div className="bookable-availability">
              <ul>
                {bookable.days.sort().map((day) => (
                  <li key={day}>{days[day]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
