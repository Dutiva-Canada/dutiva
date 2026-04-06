import { Outlet, Link } from 'react-router-dom';

export default function MarketingLayout() {
  return (
    <div style={{ background: '#0A0C11', color: 'white', minHeight: '100vh' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
        <div>Dutiva</div>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/app">App</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
