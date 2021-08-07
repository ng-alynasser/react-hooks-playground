import { useEffect, useRef, useState } from "react";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UsersList() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [isPresenting, setIsPresenting] = useState(false);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        setUser(data[0]);
        setUsers(data);
        setIsLoading(false);
        setIsPresenting(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isPresenting) {
      scheduleNext();
    } else {
      clearNextTimeout();
    }
  });

  const timerRef = useRef(null);

  const scheduleNext = () => {
    if (timerRef.current === null) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setIsPresenting(true);
        const selectedUserIndex = users.findIndex((u) => u.id === user.id);
        const nextSelectedUser = users[(selectedUserIndex + 1) % users.length];
        setUser(nextSelectedUser);
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
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user.id ? "selected" : null}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
