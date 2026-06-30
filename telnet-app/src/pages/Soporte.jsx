import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const oficinas = [
  { nombre: 'Sede Principal', dir: 'Av. Javier Prado 1234, San Isidro', horario: 'Lun-Vie 8am-7pm · Sab 9am-2pm', maps: '📍' },
  { nombre: 'Sucursal Miraflores', dir: 'Calle Schell 456, Miraflores', horario: 'Lun-Vie 8am-6pm · Sab 9am-1pm', maps: '📍' },
  { nombre: 'Sucursal Surco', dir: 'Av. Caminos del Inca 789, Surco', horario: 'Lun-Vie 9am-6pm', maps: '📍' },
]

const canales = [
  { icon: '📞', label: 'Línea gratuita', valor: '0800-TELNET (0800-835638)', color: '#1565c0', bg: '#e3f2fd' },
  { icon: '📱', label: 'WhatsApp', valor: '+51 999 123 456', color: '#2e7d32', bg: '#e8f5e9' },
  { icon: '✉️', label: 'Email', valor: 'soporte@telnet.pe', color: '#6a1b9a', bg: '#f3e5f5' },
  { icon: '🐦', label: 'Twitter / X', valor: '@TelNetPeru', color: '#0288d1', bg: '#e3f2fd' },
  { icon: '📘', label: 'Facebook', valor: 'TelNet Conexión Segura', color: '#1565c0', bg: '#e3f2fd' },
]

export default function Contacto() {
  const navigate = useNavigate()
  const { darkMode } = useApp()

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    accent: '#0288d1',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    rowBg: darkMode ? '#0d1b2e' : '#f8f9ff',
  }

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '30px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <button onClick={() => navigate('/dashboard')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📡</div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Contáctanos</h1>
              <p style={{ fontSize: '11px', opacity: 0.7 }}>TelNet — Conexión Segura</p>
            </div>
          </div>
        </div>

        {/* Horario general */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', backdropFilter: 'blur(10px)' }}>
          <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>🕐 HORARIO DE ATENCIÓN</p>
          <p style={{ fontSize: '14px', fontWeight: '700' }}>Lunes a Viernes: 8:00 AM — 8:00 PM</p>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>Sábados: 9:00 AM — 2:00 PM</p>
          <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>Emergencias 24/7: 0800-TELNET</p>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Canales de contacto */}
        <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700', marginBottom: '12px' }}>📲 Canales de Atención</h2>
        {canales.map((canal, i) => (
          <div key={i} style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${c.border}` }}>
            <div style={{ width: '46px', height: '46px', background: darkMode ? canal.color + '30' : canal.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
              {canal.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '12px', color: c.subtext, fontWeight: '600' }}>{canal.label}</p>
              <p style={{ fontSize: '14px', fontWeight: '800', color: c.text }}>{canal.valor}</p>
            </div>
            <div style={{ width: '34px', height: '34px', background: canal.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <span style={{ color: 'white', fontSize: '14px' }}>→</span>
            </div>
          </div>
        ))}

        {/* Botón soporte técnico */}
        <button onClick={() => navigate('/soporte')}
          style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 8px 24px rgba(2,136,209,0.4)', marginBottom: '20px', marginTop: '5px' }}>
          🤖 Ir al Chat de Soporte Técnico
        </button>

        {/* Oficinas */}
        <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700', marginBottom: '12px' }}>🏢 Nuestras Oficinas</h2>
        {oficinas.map((o, i) => (
          <div key={i} style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '800', color: c.text, marginBottom: '4px' }}>{o.maps} {o.nombre}</p>
                <p style={{ fontSize: '12px', color: c.subtext, marginBottom: '6px' }}>{o.dir}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px' }}>🕐</span>
                  <p style={{ fontSize: '11px', color: c.accent, fontWeight: '600' }}>{o.horario}</p>
                </div>
              </div>
              <button style={{ background: darkMode ? '#0d1b2e' : '#e3f2fd', border: 'none', borderRadius: '10px', padding: '8px 12px', color: c.accent, fontSize: '12px', fontWeight: '700', cursor: 'pointer', flexShrink: 0, marginLeft: '10px' }}>
                🗺️ Ver mapa
              </button>
            </div>
          </div>
        ))}

        {/* Redes sociales */}
        <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700', marginBottom: '12px', marginTop: '5px' }}>🌐 Síguenos</h2>
        <div style={{ background: c.card, borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: `1px solid ${c.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { icon: '📘', label: 'Facebook', color: '#1565c0' },
              { icon: '📸', label: 'Instagram', color: '#c62828' },
              { icon: '🐦', label: 'Twitter / X', color: '#0288d1' },
              { icon: '▶️', label: 'YouTube', color: '#c62828' },
            ].map((red, i) => (
              <button key={i}
                style={{ background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px' }}>{red.icon}</span>
                <p style={{ fontSize: '12px', fontWeight: '700', color: c.text }}>{red.label}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}