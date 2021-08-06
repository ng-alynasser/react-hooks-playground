import { users } from "../../data/users";
import { useState } from "react";

export default function UsersList() {
  const currentUsers = users;
  const [userIndex, setUserIndex] = useState(1);

  return (
    <ul className="users items-list-nav">
      {currentUsers.map((user, index) => (
        <li key={user.id} className={index === userIndex ? "selected" : null}>
          <button className="btn" onClick={setUserIndex.bind(this, index)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
