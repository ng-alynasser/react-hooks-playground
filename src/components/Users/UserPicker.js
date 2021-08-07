import { useEffect, useState } from "react";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UserPicker() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getData("http://localhost:3001/users").then((users) => setUsers(users));
  }, []);

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}
