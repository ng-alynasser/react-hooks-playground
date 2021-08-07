import { bookables } from "../../data/bookables";
import { days } from "../../data/days";
import { Fragment, useState } from "react";
import { FaArrowRight } from "react-icons/all";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");
  const [bookableIndex, setBookableIndex] = useState(0);
  const [hasDetails, setHasDetails] = useState(false);

  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [...new Set(bookables.map((bookable) => bookable.group))];
  const bookable = bookablesInGroup[bookableIndex];

  function nextBookable() {
    setBookableIndex((prevState) => (prevState + 1) % bookablesInGroup.length);
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((group) => (
            <option value={group} key={group}>
              {group}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((bookable, index) => (
            <li
              key={bookable.title}
              className={index === bookableIndex ? "selected" : null}
            >
              <button
                className="btn"
                onClick={setBookableIndex.bind(this, index)}
              >
                {bookable.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={() => setHasDetails((prevState) => !prevState)}
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
      )}
    </Fragment>
  );
}
