import { useReducer } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/all";

export default function WeekPicker({ date }) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);

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
      <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
        <FaChevronRight />
        Next
      </button>
      {week.start.toDateString()} - {week.end.toDateString()}
    </p>
  );
}
