import { useReports } from '../features/useReports.js';

export const DashboardPage = () => {
  const { data, isLoading, isError } = useReports();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Failed to load report (login as admin first).</p>;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded bg-white p-4 shadow">
        <h2 className="text-sm text-slate-500">Total Appointments</h2>
        <p className="text-2xl font-bold">{data.totalAppointments}</p>
      </article>
      <article className="rounded bg-white p-4 shadow">
        <h2 className="text-sm text-slate-500">Total Revenue</h2>
        <p className="text-2xl font-bold">${data.totalRevenue}</p>
      </article>
      <article className="rounded bg-white p-4 shadow">
        <h2 className="text-sm text-slate-500">Status</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {data.statusBreakdown.map((s) => (
            <li key={s.status}>{s.status}: {s.count}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};
