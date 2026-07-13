import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Dashboard.css'

const notificaciones = [
  { id: 1, tipo: 'alerta', icon: '💳', titulo: '¡Paga antes del 2 de Agosto!', desc: 'Tu factura vence pronto. Evita cortes de servicio.', tiempo: 'Hace 5 min', leida: false },
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
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    speedCard: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    incidentBg: darkMode ? '#1a0a00' : '#fff3e0',
  }

  return (
    <div className="dashboard-container" style={{ background: c.bg }}>

      {/* Header */}
      <div className="dashboard-header" style={{ background: c.header }}>
        <div className="dashboard-header-top">
          <div className="dashboard-logo-row">
            <div className="dashboard-logo-box">📡</div>
            <div>
              <h1 className="dashboard-logo-title">TelNet</h1>
              <p className="dashboard-logo-sub">CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div className="dashboard-header-buttons">
            <button className="dashboard-header-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="dashboard-header-btn" onClick={() => setShowNotif(!showNotif)}>
              🔔
              {noLeidas > 0 && <span className="dashboard-notif-badge">{noLeidas}</span>}
            </button>
            <button className="dashboard-header-btn" onClick={() => navigate('/cuenta')}>
              👤
            </button>
          </div>
        </div>
        <div className="dashboard-greeting">
          <p className="dashboard-greeting-sub">Bienvenido de vuelta,</p>
          <p className="dashboard-greeting-name">Carlos Mendoza 👋</p>
        </div>
      </div>

      {/* Panel notificaciones */}
      {showNotif && (
        <div className="dashboard-notif-overlay" onClick={() => setShowNotif(false)}>
          <div className="dashboard-notif-panel" style={{ background: c.card }} onClick={e => e.stopPropagation()}>
            <div className="dashboard-notif-header" style={{ borderBottom: `1px solid ${c.border}` }}>
              <h3 className="dashboard-notif-title" style={{ color: c.text }}>
                Notificaciones
                {noLeidas > 0 && <span className="dashboard-notif-badge-count">{noLeidas}</span>}
              </h3>
              <button className="dashboard-notif-mark-all" onClick={marcarTodasLeidas}>
                Marcar todas leídas
              </button>
            </div>
            <div className="dashboard-notif-list">
              {notifs.map(n => (
                <div key={n.id}
                  className="dashboard-notif-item"
                  onClick={() => marcarLeida(n.id)}
                  style={{ borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff' }}>
                  <span className="dashboard-notif-item-icon">{n.icon}</span>
                  <div className="dashboard-notif-item-content">
                    <p className="dashboard-notif-item-title" style={{ fontWeight: n.leida ? '400' : '700', color: c.text }}>{n.titulo}</p>
                    <p className="dashboard-notif-item-desc" style={{ color: c.subtext }}>{n.desc}</p>
                    <p className="dashboard-notif-item-time">{n.tiempo}</p>
                  </div>
                  {!n.leida && <div className="dashboard-notif-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-content">

        {/* Card velocidad */}
        <div className="dashboard-speed-card" style={{ background: c.speedCard }}>
          <div className="dashboard-speed-top">
            <div>
              <p className="dashboard-speed-label">VELOCIDAD ACTUAL</p>
              <p className="dashboard-speed-value">
                {actualizando ? '...' : velocidad}
                <span className="dashboard-speed-unit"> Mbps</span>
              </p>
              <div className="dashboard-speed-stats">
                <div>
                  <p className="dashboard-speed-stat-label">⬇️ Bajada</p>
                  <p className="dashboard-speed-stat-value">{bajada} Mbps</p>
                </div>
                <div>
                  <p className="dashboard-speed-stat-label">⬆️ Subida</p>
                  <p className="dashboard-speed-stat-value">{subida} Mbps</p>
                </div>
              </div>
            </div>
            <button className="dashboard-speed-refresh" onClick={actualizarVelocidad}>
              {actualizando ? '⏳' : '🔄'} {actualizando ? 'Midiendo...' : 'Actualizar'}
            </button>
          </div>
          <div className="dashboard-speed-status">
            <span>✅</span>
            <p>Estado del servicio: CONECTADO</p>
          </div>
        </div>

        {/* Acceso rápido */}
        <div className="dashboard-quick-grid">
          {[
            { icon: '🛠️', label: 'Soporte Técnico', path: '/soporte', color: '#1565c0' },
            { icon: '💬', label: 'Contactar', path: '/contacto', color: '#0288d1' },
            { icon: '📋', label: 'Mis Servicios', path: '/servicios', color: '#6a1b9a' },
            { icon: '📡', label: 'Monitoreo', path: '/monitoreo', color: '#00838f' },
          ].map((item, i) => (
            <button key={i}
              className="dashboard-quick-btn"
              onClick={() => navigate(item.path)}
              style={{ background: c.card, borderColor: c.border }}>
              <div className="dashboard-quick-icon" style={{ background: item.color }}>
                {item.icon}
              </div>
              <p className="dashboard-quick-label" style={{ color: c.text }}>{item.label}</p>
            </button>
          ))}
        </div>

        {/* Incidencias activas */}
        <div className="dashboard-incidents-banner"
          style={{ background: c.incidentBg }}
          onClick={() => navigate('/incidencias')}>
          <div className="dashboard-incidents-left">
            <div className="dashboard-incidents-icon">⚠️</div>
            <div>
              <p className="dashboard-incidents-title">3 Incidencias activas</p>
              <p className="dashboard-incidents-sub" style={{ color: c.subtext }}>en tu zona · Toca para ver</p>
            </div>
          </div>
          <span className="dashboard-incidents-arrow">›</span>
        </div>

        {/* Tickets recientes */}
        <div className="dashboard-tickets-card" style={{ background: c.card }}>
          <div className="dashboard-tickets-header">
            <h2 className="dashboard-tickets-title" style={{ color: c.text }}>Incidencias Recientes</h2>
            <span className="dashboard-tickets-ver-todas" onClick={() => navigate('/incidencias')}>Ver todas</span>
          </div>
          {ticketsRecientes.map((ticket, i) => (
            <div key={i} className="dashboard-ticket-row"
              style={{ borderBottom: i < ticketsRecientes.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <div className="dashboard-ticket-left">
                <span className="dashboard-ticket-icon">{ticket.estado === 'Abierto' ? '⏳' : '✅'}</span>
                <div>
                  <p className="dashboard-ticket-id" style={{ color: c.text }}>Ticket {ticket.id}</p>
                  <p className="dashboard-ticket-info" style={{ color: c.subtext }}>{ticket.tipo} · {ticket.direccion}</p>
                </div>
              </div>
              <span className="dashboard-ticket-badge"
                style={{ color: ticket.estado === 'Abierto' ? '#ff9800' : '#4caf50', background: ticket.estado === 'Abierto' ? '#fff3e0' : '#e8f5e9' }}>
                {ticket.estado}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="dashboard-bottom-nav" style={{ background: c.card, borderColor: c.border }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} className="dashboard-nav-btn" onClick={() => navigate(item.path)}>
            <span className="dashboard-nav-icon">{item.icon}</span>
            <span className="dashboard-nav-label" style={{ color: i === 0 ? '#0288d1' : c.subtext, fontWeight: i === 0 ? '700' : '400' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}