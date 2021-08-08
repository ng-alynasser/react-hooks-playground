import { useState } from "react";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/all";

export default function WeekPicker({ dispatch }) {
  const [dateText, setDateText] = useState("");

  const goToDate = () => {
    dispatch({
      type: "SET_DATE",
      payload: dateText,
    });
  };

  return (
    <p className="date-picker">
      <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
        <FaChevronLeft />
        Previous
      </button>
      <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
        <FaCalendarDay />
        Today
      </button>
      <span>
        <input
          type="text"
          value={dateText}
          placeholder="e.g. 2021-8-8"
          onChange={(e) => setDateText(e.target.value)}
        />
        <button onClick={goToDate} className="go btn">
          <FaCalendarCheck />
          <span>Go</span>
        </button>
      </span>
      <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
        <FaChevronRight />
        Next
      </button>
    </p>
  );
}
