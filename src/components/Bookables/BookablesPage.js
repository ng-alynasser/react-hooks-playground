import { bookables } from "../../data/bookables";

export default function BookablesPage() {
  const CURRENT_GROUP = "Rooms";
  const bookableRooms = bookables.filter(
    (bookable) => bookable.group === CURRENT_GROUP
  );
  const bookableIndex = 1;

  return <ul className="bookables"></ul>;
}
