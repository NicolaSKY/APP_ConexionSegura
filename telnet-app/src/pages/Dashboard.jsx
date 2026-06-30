import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const notificaciones = [
  { id: 1, tipo: 'alerta', icon: '💳', titulo: '¡Paga antes del 2 de Julio!', desc: 'Tu factura de S/ 179.70 vence pronto. Evita cortes de servicio.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, tipo: 'preventiva', icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona de 2am a 4am.', tiempo: 'Hace 1h', leida: false },
  { id: 3, tipo: 'beneficio', icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
  { id: 4, tipo: 'preventiva', icon: '📶', titulo: 'Señal inestable detectada', desc: 'Detectamos intermitencias en tu red. Revisa tu router.', tiempo: 'Hace 5h', leida: true },
  { id: 5, tipo: 'beneficio', icon: '⭐', titulo: '¡Nuevo beneficio disponible!', desc: 'Tienes 500 puntos TelNet acumulados. Canjéalos ahora.', tiempo: 'Ayer', leida: true },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { darkMode, setDarkMode, tickets } = useApp()
  const [showNotif, setShowNotif] = useState(false)
  const [notifs, setNotifs] = useState(notificaciones)
  const [velocidad, setVelocidad] = useState(150)
  const [actualizando, setActualizando] = useState(false)
  const [bajada, setBajada] = useState(15)
  const [subida, setSubida] = useState(10)

  const noLeidas = notifs.filter(n => !n.leida).length
  const ticketsRecientes = tickets.slice(0, 3)

  const actualizarVelocidad = () => {
    setActualizando(true)
    setTimeout(() => {
      const nueva = Math.floor(Math.random() * (300 - 150 + 1)) + 150
      setVelocidad(nueva)
      setBajada(Math.floor(nueva * 0.1))
      setSubida(Math.floor(nueva * 0.07))
      setActualizando(false)
    }, 1500)
  }

  const marcarLeida = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  const marcarTodasLeidas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    accent: '#0288d1',
  }

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '70px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📡</div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px' }}>TelNet</h1>
              <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px' }}>CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setDarkMode(!darkMode)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setShowNotif(!showNotif)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              🔔
              {noLeidas > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ff1744', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{noLeidas}</span>
              )}
            </button>
            <button onClick={() => navigate('/cuenta')}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              👤
            </button>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <p style={{ fontSize: '13px', opacity: 0.7 }}>Bienvenido de vuelta,</p>
          <p style={{ fontSize: '18px', fontWeight: '700' }}>Carlos Mendoza 👋</p>
        </div>
      </div>

      {/* Panel notificaciones */}
      {showNotif && (
        <div onClick={() => setShowNotif(false)}
          style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: c.card, margin: '80px 15px 0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: c.text, fontSize: '16px', fontWeight: '700' }}>
                Notificaciones
                {noLeidas > 0 && <span style={{ background: '#ff1744', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', marginLeft: '6px' }}>{noLeidas}</span>}
              </h3>
              <button onClick={marcarTodasLeidas} style={{ background: 'none', border: 'none', color: c.accent, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Marcar todas leídas</button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifs.map(n => (
                <div key={n.id} onClick={() => marcarLeida(n.id)}
                  style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff', cursor: 'pointer', display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: n.leida ? '400' : '700', color: c.text }}>{n.titulo}</p>
                    <p style={{ fontSize: '12px', color: c.subtext, marginTop: '3px' }}>{n.desc}</p>
                    <p style={{ fontSize: '11px', color: c.accent, marginTop: '5px' }}>{n.tiempo}</p>
                  </div>
                  {!n.leida && <div style={{ width: '8px', height: '8px', background: c.accent, borderRadius: '50%', flexShrink: 0, marginTop: '4px' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '15px' }}>

        {/* Card velocidad */}
        <div style={{ background: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', borderRadius: '20px', padding: '20px', marginBottom: '15px', color: 'white', boxShadow: '0 8px 32px rgba(2,136,209,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', opacity: 0.8, letterSpacing: '1px' }}>VELOCIDAD ACTUAL</p>
              <p style={{ fontSize: '48px', fontWeight: '900', lineHeight: 1.1 }}>
                {actualizando ? '...' : velocidad}
                <span style={{ fontSize: '18px', fontWeight: '400', opacity: 0.8 }}> Mbps</span>
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <div>
                  <p style={{ fontSize: '11px', opacity: 0.7 }}>⬇️ Bajada</p>
                  <p style={{ fontSize: '16px', fontWeight: '700' }}>{bajada} Mbps</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', opacity: 0.7 }}>⬆️ Subida</p>
                  <p style={{ fontSize: '16px', fontWeight: '700' }}>{subida} Mbps</p>
                </div>
              </div>
            </div>
            <button onClick={actualizarVelocidad}
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '10px 14px', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
              {actualizando ? '⏳' : '🔄'} {actualizando ? 'Midiendo...' : 'Actualizar'}
            </button>
          </div>
          <div style={{ marginTop: '15px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span>
            <p style={{ fontSize: '13px', fontWeight: '600' }}>Estado del servicio: CONECTADO</p>
          </div>
        </div>

        {/* Acceso rápido */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          {[
            { icon: '🛠️', label: 'Soporte Técnico', path: '/soporte', color: '#1565c0' },
            { icon: '💬', label: 'Contactar', path: '/contacto', color: '#0288d1' },
            { icon: '📋', label: 'Mis Servicios', path: '/servicios', color: '#6a1b9a' },
            { icon: '📡', label: 'Monitoreo', path: '/monitoreo', color: '#00838f' },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)}
              style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '15px', padding: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ width: '40px', height: '40px', background: item.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {item.icon}
              </div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: c.text, textAlign: 'left' }}>{item.label}</p>
            </button>
          ))}
        </div>

        {/* Incidencias activas */}
        <div onClick={() => navigate('/incidencias')}
          style={{ background: darkMode ? '#1a0a00' : '#fff3e0', border: '1px solid #ff9800', borderRadius: '15px', padding: '15px', marginBottom: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#ff9800', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>⚠️</div>
            <div>
              <p style={{ fontWeight: '700', color: '#e65100', fontSize: '15px' }}>3 Incidencias activas</p>
              <p style={{ fontSize: '12px', color: c.subtext }}>en tu zona · Toca para ver</p>
            </div>
          </div>
          <span style={{ color: '#ff9800', fontSize: '22px' }}>›</span>
        </div>

        {/* Tickets recientes — conectados al contexto */}
        <div style={{ background: c.card, borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700' }}>Incidencias Recientes</h2>
            <span onClick={() => navigate('/incidencias')} style={{ fontSize: '12px', color: c.accent, cursor: 'pointer', fontWeight: '600' }}>Ver todas</span>
          </div>
          {ticketsRecientes.map((ticket, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < ticketsRecientes.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{ticket.estado === 'Abierto' ? '⏳' : '✅'}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: c.text }}>Ticket {ticket.id}</p>
                  <p style={{ fontSize: '11px', color: c.subtext }}>{ticket.tipo} · {ticket.direccion}</p>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: ticket.estado === 'Abierto' ? '#ff9800' : '#4caf50', fontWeight: '700', background: ticket.estado === 'Abierto' ? '#fff3e0' : '#e8f5e9', padding: '3px 10px', borderRadius: '20px' }}>
                {ticket.estado}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', background: c.card, borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '5px 10px' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', color: i === 0 ? c.accent : c.subtext, fontWeight: i === 0 ? '700' : '400' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}