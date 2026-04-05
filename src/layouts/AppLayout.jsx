import { Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0C11', color: 'white' }}>
      <aside style={{ width: '220px', padding: '20px', borderRight: '1px solid #222' }}>
        <h2>Dutiva</h2>
        <nav style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/app">Dashboard</Link>
          <Link to="/app/templates">Templates</Link>
          <Link to="/app/advisor">Advisor</Link>
          <Link to="/app/settings">Settings</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
