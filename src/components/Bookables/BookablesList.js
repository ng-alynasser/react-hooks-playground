import { days } from "../../data/days";
import { Fragment, useEffect, useReducer, useRef } from "react";
import { FaArrowRight } from "react-icons/all";
import reducer from "./reducer";
import getData from "../../utils/api";
import PageSpinner from "../UI/PageSpinner";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
  isPresenting: false,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => initialState
  );

  const timerRef = useRef(null);

  const {
    group,
    bookableIndex,
    hasDetails,
    bookables,
    isLoading,
    error,
    isPresenting,
  } = state;

  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [...new Set(bookables.map((bookable) => bookable.group))];
  const bookable = bookablesInGroup[bookableIndex];

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

    getData("http://localhost:3001/bookables")
      .then((bookables) =>
        dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookables })
      )
      .catch((error) =>
        dispatch({ type: "FETCH_BOOKABLES_ERROR", payload: error })
      );
  }, []);

  useEffect(() => {
    if (isPresenting) {
      scheduleNext();
    } else {
      clearNextTimeout();
    }
  });

  const nextBookable = () => {
    dispatch({ type: "NEXT_BOOKABLE", payload: false });
  };

  const changeGroup = (event) => {
    dispatch({
      type: "SET_GROUP",
      payload: event.target.value,
    });

    if (isPresenting) {
      clearNextTimeout();
      scheduleNext();
    }
  };

  const changeBookable = (selectedIndex) => {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex,
    });
  };

  const toggleHasDetails = () => {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  };

  const scheduleNext = () => {
    if (timerRef.current === null) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        dispatch({ type: "NEXT_BOOKABLE", payload: true });
      }, 3000);
    }
  };

  const clearNextTimeout = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <PageSpinner />;
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
