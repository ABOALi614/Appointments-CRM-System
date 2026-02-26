export const BookingPage = () => {
  return (
    <section className="rounded bg-white p-6 shadow">
      <h2 className="mb-3 text-lg font-semibold">Book a new appointment</h2>
      <p className="text-sm text-slate-600">
        Connect this page to `/api/services` and `/api/appointments` to show calendar slots,
        choose a service, and submit booking requests.
      </p>
    </section>
  );
};
