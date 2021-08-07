import { bookables } from "../../data/bookables";
import { days } from "../../data/days";
import { Fragment, useReducer, useState } from "react";
import { FaArrowRight } from "react-icons/all";
import reducer from "./reducer";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, hasDetails, bookables } = state;

  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [...new Set(bookables.map((bookable) => bookable.group))];
  const bookable = bookablesInGroup[bookableIndex];

  function nextBookable() {
    dispatch({ type: "NEXT_BOOKABLE" });
  }

  function changeGroup(event) {
    dispatch({
      type: "SET_GROUP",
      payload: event.target.value,
    });
  }

  function changeBookable(selectedIndex) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex,
    });
  }

  function toggleHasDetails() {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={(e) => changeGroup(e)}>
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
              <button className="btn" onClick={() => changeBookable(index)}>
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
      )}
    </Fragment>
  );
}
