import { users } from "../../data/users";
import { useState } from "react";

export default function UserPicker() {
  const currentUsers = users;
  const [userIndex, setUserIndex] = useState(2);

  function handleSelect(event) {
    const selectedIndex = parseInt(event.target.value);
    const selectedUser = users.findIndex((user) => user.id === selectedIndex);
    setUserIndex(selectedUser);
  }

  return (
    <select onChange={handleSelect} value={userIndex}>
      {currentUsers.map((user, index) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
