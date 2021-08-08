export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  return (
    <div className="bookingsGrid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toString()}</p>
    </div>
  );
}
