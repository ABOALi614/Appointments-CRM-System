import { Link, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { BookingPage } from './pages/BookingPage.jsx';

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <h1 className="mr-auto text-xl font-bold">Appointments & CRM</h1>
          <Link to="/" className="rounded bg-slate-900 px-3 py-1 text-white">Dashboard</Link>
          <Link to="/book" className="rounded border px-3 py-1">Book Appointment</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/book" element={<BookingPage />} />
        </Routes>
      </main>
    </div>
  );
};
