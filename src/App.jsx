import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Templates from './pages/Templates.jsx';
import Advisor from './pages/Advisor.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/templates" element={<Templates />} />
        <Route path="/app/advisor" element={<Advisor />} />
      </Routes>
    </BrowserRouter>
  );
}
