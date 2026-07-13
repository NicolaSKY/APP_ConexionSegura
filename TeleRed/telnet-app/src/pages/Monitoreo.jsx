import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './Monitoreo.css'

const datos = [
  { tiempo: '0h', velocidad: 80 },
  { tiempo: '4h', velocidad: 95 },
  { tiempo: '8h', velocidad: 110 },
  { tiempo: '12h', velocidad: 90 },
  { tiempo: '16h', velocidad: 130 },
  { tiempo: '20h', velocidad: 120 },
  { tiempo: '24h', velocidad: 150 },
]

const alertasZona = [
  { icon: '⚠️', titulo: 'Interrupción en Zona 1 - Miraflores', desc: 'Corte de fibra por obras en Av. Pardo. Técnicos en camino.', tiempo: 'Hace 2 min', color: '#ff9800', bg: '#fff3e0' },
  { icon: '✅', titulo: 'Servicio restaurado - San Isidro', desc: 'La señal fue restablecida completamente en tu zona.', tiempo: 'Hace 15 min', color: '#4caf50', bg: '#e8f5e9' },
  { icon: '🔧', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio de 2am a 4am habrá mantenimiento en Surco.', tiempo: 'Hace 1h', color: '#0288d1', bg: '#e3f2fd' },
]

const dispositivos = [
  { icon: '📱', nombre: 'iPhone 14 Pro', tipo: 'Móvil', velocidad: '45 Mbps', estado: 'Conectado', tiempo: '3h 20min', color: '#1565c0' },
  { icon: '💻', nombre: 'MacBook Pro', tipo: 'Laptop', velocidad: '95 Mbps', estado: 'Conectado', tiempo: '1h 45min', color: '#6a1b9a' },
  { icon: '🖥️', nombre: 'Smart TV Samsung', tipo: 'TV', velocidad: '25 Mbps', estado: 'Conectado', tiempo: '5h 10min', color: '#00838f' },
  { icon: '⌚', nombre: 'Apple Watch', tipo: 'Wearable', velocidad: '2 Mbps', estado: 'Conectado', tiempo: '8h 00min', color: '#2e7d32' },
]

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Agosto!', desc: 'Tu factura vence pronto.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona.', tiempo: 'Hace 1h', leida: false },
  { id: 3, icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
]

export default function Monitoreo() {
  const navigate = useNavigate()
  const { darkMode, setDarkMode } = useApp()
  const [showNotif, setShowNotif] = useState(false)
  const [notifs, setNotifs] = useState(notificaciones)

  const noLeidas = notifs.filter(n => !n.leida).length
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
    rowBg: darkMode ? '#0d1b2e' : '#f8f9ff',
  }

  return (
    <div className="monitoreo-container" style={{ background: c.bg }}>

      {/* Header */}
      <div className="monitoreo-header" style={{ background: c.header }}>
        <div className="monitoreo-header-top">
          <div className="monitoreo-logo-row">
            <div className="monitoreo-logo-box">📡</div>
            <div>
              <h1 className="monitoreo-logo-title">TelNet</h1>
              <p className="monitoreo-logo-sub">CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div className="monitoreo-header-buttons">
            <button className="monitoreo-header-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="monitoreo-header-btn" onClick={() => setShowNotif(!showNotif)}>
              🔔
              {noLeidas > 0 && <span className="monitoreo-notif-badge">{noLeidas}</span>}
            </button>
            <button className="monitoreo-header-btn" onClick={() => navigate('/cuenta')}>
              👤
            </button>
          </div>
        </div>
        <div className="monitoreo-header-bottom">
          <h2 className="monitoreo-header-title">Monitoreo en Tiempo Real</h2>
          <p className="monitoreo-header-sub">Estado actual de tu conexión</p>
        </div>
      </div>

      {/* Panel notificaciones */}
      {showNotif && (
        <div className="monitoreo-notif-overlay" onClick={() => setShowNotif(false)}>
          <div className="monitoreo-notif-panel" style={{ background: c.card }} onClick={e => e.stopPropagation()}>
            <div className="monitoreo-notif-header" style={{ borderBottom: `1px solid ${c.border}` }}>
              <h3 className="monitoreo-notif-title" style={{ color: c.text }}>
                Notificaciones
                {noLeidas > 0 && <span className="monitoreo-notif-badge-count">{noLeidas}</span>}
              </h3>
              <button className="monitoreo-notif-mark-all" onClick={marcarTodasLeidas}>Marcar todas leídas</button>
            </div>
            <div className="monitoreo-notif-list">
              {notifs.map(n => (
                <div key={n.id} className="monitoreo-notif-item"
                  onClick={() => marcarLeida(n.id)}
                  style={{ borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: n.leida ? '400' : '700', color: c.text }}>{n.titulo}</p>
                    <p style={{ fontSize: '12px', color: c.subtext, marginTop: '3px' }}>{n.desc}</p>
                    <p style={{ fontSize: '11px', color: '#0288d1', marginTop: '5px' }}>{n.tiempo}</p>
                  </div>
                  {!n.leida && <div className="monitoreo-notif-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="monitoreo-content">

        {/* Gráfica */}
        <div className="monitoreo-chart-card" style={{ background: c.card }}>
          <div className="monitoreo-chart-header">
            <div>
              <h2 className="monitoreo-chart-title" style={{ color: c.text }}>Velocidad últimas 24h</h2>
              <p className="monitoreo-chart-sub" style={{ color: c.subtext }}>Mbps en el tiempo</p>
            </div>
            <span className="monitoreo-chart-status">🟢 En línea</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e2d4a' : '#f0f0f0'} />
              <XAxis dataKey="tiempo" tick={{ fontSize: 10, fill: c.subtext }} />
              <YAxis tick={{ fontSize: 10, fill: c.subtext }} />
              <Tooltip contentStyle={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '10px', color: c.text }} />
              <Line type="monotone" dataKey="velocidad" stroke="#0288d1" strokeWidth={3} dot={{ fill: '#0288d1', r: 4, strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Velocidad actual */}
        <div className="monitoreo-speed-card" style={{ background: c.speedCard }}>
          <p className="monitoreo-speed-label">VELOCIDAD ACTUAL</p>
          <div className="monitoreo-speed-value-row">
            <p className="monitoreo-speed-number">150</p>
            <p className="monitoreo-speed-unit">Mbps</p>
          </div>
          <div className="monitoreo-speed-stats-grid">
            {[
              { label: '⬇️ Bajada', value: '15 Mbps' },
              { label: '⬆️ Subida', value: '10 Mbps' },
              { label: '📶 Ping', value: '25 ms' },
            ].map((item, i) => (
              <div key={i} className="monitoreo-speed-stat">
                <p className="monitoreo-speed-stat-label">{item.label}</p>
                <p className="monitoreo-speed-stat-value">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="monitoreo-stability">
            <p className="monitoreo-stability-label">ESTABILIDAD DE RED</p>
            <div className="monitoreo-stability-row">
              <p className="monitoreo-stability-value">Excelente</p>
              <div className="monitoreo-stability-emojis">
                {[
                  { emoji: '😊', label: 'Excelente', activo: true },
                  { emoji: '🙂', label: 'Bueno', activo: false },
                  { emoji: '😐', label: 'Regular', activo: false },
                  { emoji: '😟', label: 'Malo', activo: false },
                ].map((e, i) => (
                  <div key={i} className="monitoreo-stability-emoji" style={{ opacity: e.activo ? 1 : 0.4 }}>
                    <p>{e.emoji}</p>
                    <p>{e.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dispositivos */}
        <div className="monitoreo-devices-card" style={{ background: c.card }}>
          <div className="monitoreo-devices-header">
            <div>
              <h2 className="monitoreo-devices-title" style={{ color: c.text }}>Dispositivos conectados</h2>
              <p className="monitoreo-devices-sub" style={{ color: c.subtext }}>5 dispositivos en tu red</p>
            </div>
            <button className="monitoreo-devices-ver-btn" onClick={() => navigate('/dispositivos')}>
              Ver todos
            </button>
          </div>
          {dispositivos.map((d, i) => (
            <div key={i} className="monitoreo-device-row" style={{ background: c.rowBg, borderColor: c.border }}>
              <div className="monitoreo-device-left">
                <div className="monitoreo-device-icon" style={{ background: d.color }}>{d.icon}</div>
                <div>
                  <p className="monitoreo-device-name" style={{ color: c.text }}>{d.nombre}</p>
                  <p className="monitoreo-device-info" style={{ color: c.subtext }}>{d.tipo} · {d.tiempo}</p>
                </div>
              </div>
              <div className="monitoreo-device-right">
                <p className="monitoreo-device-speed" style={{ color: '#0288d1' }}>{d.velocidad}</p>
                <p className="monitoreo-device-status" style={{ color: '#4caf50' }}>🟢 {d.estado}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alertas zona */}
        <div className="monitoreo-alerts-card" style={{ background: c.card }}>
          <h2 className="monitoreo-alerts-title" style={{ color: c.text }}>Alertas de tu Zona</h2>
          <p className="monitoreo-alerts-sub" style={{ color: c.subtext }}>Eventos que afectan tu área de servicio</p>
          {alertasZona.map((alerta, i) => (
            <div key={i} className="monitoreo-alert-item"
              style={{ background: darkMode ? '#0d1b2e' : alerta.bg, border: `1px solid ${alerta.color}30` }}>
              <div className="monitoreo-alert-icon" style={{ background: alerta.color }}>{alerta.icon}</div>
              <div style={{ flex: 1 }}>
                <p className="monitoreo-alert-title" style={{ color: c.text }}>{alerta.titulo}</p>
                <p className="monitoreo-alert-desc" style={{ color: c.subtext }}>{alerta.desc}</p>
                <p className="monitoreo-alert-time" style={{ color: alerta.color }}>{alerta.tiempo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="monitoreo-bottom-nav" style={{ background: c.card, borderTop: `1px solid ${c.border}` }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} className="monitoreo-nav-btn" onClick={() => navigate(item.path)}>
            <span className="monitoreo-nav-icon">{item.icon}</span>
            <span className="monitoreo-nav-label" style={{ color: i === 1 ? '#0288d1' : c.subtext, fontWeight: i === 1 ? '700' : '400' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}