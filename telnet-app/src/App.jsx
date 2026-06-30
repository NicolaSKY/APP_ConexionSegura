import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Monitoreo from './pages/Monitoreo'
import Servicios from './pages/Servicios'
import Incidencias from './pages/Incidencias'
import Soporte from './pages/Soporte'
import Dispositivos from './pages/Dispositivos'
import Cuenta from './pages/Cuenta'
import ReportarIncidencia from './pages/ReportarIncidencia'
import Contacto from './pages/Contacto'

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '390px', margin: '0 auto', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoreo" element={<Monitoreo />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/reportar" element={<ReportarIncidencia />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App