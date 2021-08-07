export default function BookingsPage() {
  return <div>Bookings Page</div>;
}

let count = 0;

function reducer(state, action) {
  if (action.type === "inc") {
    return state + 1;
  }

  if (action.type === "dec") {
    return state - 1;
  }

  if (action.type === "add") {
    return state + action.payload;
  }

  if (action.type === "sub") {
    return state - action.payload;
  }

  if (action.type === "set") {
    return action.payload;
  }

  return state;
}

count = reducer(count, { type: "add", payload: 3 });
count = reducer(count, { type: "sub", payload: 10 });
count = reducer(count, { type: "set", payload: 41 });
count = reducer(count, { type: "inc" });

console.log(count);
