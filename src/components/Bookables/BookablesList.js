import { bookables } from "../../data/bookables";
import { useState } from "react";
import { FaArrowRight } from "react-icons/all";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");
  const [bookableIndex, setBookableIndex] = useState(0);

  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [...new Set(bookables.map((bookable) => bookable.group))];

  function nextBookable() {
    setBookableIndex((prevState) => (prevState + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {groups.map((group, index) => (
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
  );
}
