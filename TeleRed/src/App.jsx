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
import PuntosCanjeables from './pages/PuntosCanjeables'
import Terminos from './pages/Terminos'
import SelectorUsuario from './pages/SelectorUsuario'

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '390px', margin: '0 auto', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/selector" />} />
          <Route path="/selector" element={<SelectorUsuario />} />
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
          <Route path="/puntos" element={<PuntosCanjeables />} />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

//git add .
//git commit -m "Describe aquí los cambios"
//git push origin main