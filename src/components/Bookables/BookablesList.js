import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/all";
import getData from "../../utils/api";
import PageSpinner from "../UI/PageSpinner";

export default function BookablesList({ bookable, setBookable }) {
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [...new Set(bookables.map((bookable) => bookable.group))];

  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  const nextBookable = (stopPresenting = false) => {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  };

  const changeGroup = (event) => {
    const bookablesInSelectedGroup = bookables.filter(
      (bookable) => bookable.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  };

  const changeBookable = (selectedBookable) => {
    setBookable(selectedBookable);
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((group) => (
          <option value={group} key={group}>
            {group}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => (
          <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
            <button className="btn" onClick={() => changeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn next"
          onClick={() => nextBookable(true)}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
