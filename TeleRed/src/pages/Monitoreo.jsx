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

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Agosto!', desc: 'Tu factura vence pronto.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona.', tiempo: 'Hace 1h', leida: false },
  { id: 3, icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
]

export default function Monitoreo() {
  const navigate = useNavigate()
  const { darkMode, setDarkMode, usuarioActual, estadosSeñal, resolverSeñal } = useApp()
  const señalInfo = estadosSeñal?.[usuarioActual?.señal] ?? {
    icon: '📶',
    label: 'Sin datos',
    rango: 'Esperando información',
  }
  const dispositivosUsuario = (usuarioActual?.id ?? 0) === 1 ? [
    { icon: '📱', nombre: 'iPhone 14 Pro', tipo: 'Móvil', velocidad: '45 Mbps', estado: 'Conectado', tiempo: '3h 20min', color: '#1565c0' },
    { icon: '💻', nombre: 'MacBook Pro', tipo: 'Laptop', velocidad: '95 Mbps', estado: 'Conectado', tiempo: '1h 45min', color: '#6a1b9a' },
    { icon: '🖥️', nombre: 'Smart TV Samsung', tipo: 'TV', velocidad: '25 Mbps', estado: 'Conectado', tiempo: '5h 10min', color: '#00838f' },
    { icon: '⌚', nombre: 'Apple Watch', tipo: 'Wearable', velocidad: '2 Mbps', estado: 'Conectado', tiempo: '8h 00min', color: '#2e7d32' },
  ] : [
    { icon: '📱', nombre: 'Samsung Galaxy S23', tipo: 'Móvil', velocidad: '12 Mbps', estado: 'Conectado', tiempo: '1h 10min', color: '#1565c0' },
    { icon: '💻', nombre: 'Laptop HP Pavilion', tipo: 'Laptop', velocidad: '10 Mbps', estado: 'Conectado', tiempo: '2h 30min', color: '#6a1b9a' },
    { icon: '📺', nombre: 'Smart TV LG', tipo: 'TV', velocidad: '6 Mbps', estado: 'Conectado', tiempo: '4h 00min', color: '#00838f' },
  ]
  const [notifs, setNotifs] = useState(notificaciones)
  const [showNotif, setShowNotif] = useState(false)

  const noLeidas = notifs.filter(n => !n.leida).length
  const marcarLeida = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  const marcarTodasLeidas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))
  const velocidadActual = usuarioActual?.velocidad ?? 0
  const pingActual = usuarioActual?.ping ?? 0

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
            <p className="monitoreo-speed-number">{velocidadActual}</p>
            <p className="monitoreo-speed-unit">Mbps</p>
          </div>
          <div className="monitoreo-speed-stats-grid">
            {[
              { label: '⬇️ Bajada', value: `${Math.floor(velocidadActual * 0.1)} Mbps` },
              { label: '⬆️ Subida', value: `${Math.floor(velocidadActual * 0.07)} Mbps` },
              { label: '📶 Ping', value: `${pingActual} ms` },
            ].map((item, i) => (
              <div key={i} className="monitoreo-speed-stat">
                <p className="monitoreo-speed-stat-label">{item.label}</p>
                <p className="monitoreo-speed-stat-value">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Estado señal */}
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', marginTop: '10px' }}>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '8px', letterSpacing: '1px' }}>ESTADO DE SEÑAL</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>{señalInfo.icon}</span>
                <div>
                  <p style={{ fontSize: '18px', fontWeight: '800' }}>{señalInfo.label}</p>
                  <p style={{ fontSize: '11px', opacity: 0.8 }}>{señalInfo.rango}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {Object.entries(estadosSeñal).map(([key, e]) => (
                  <div key={key} style={{ textAlign: 'center', opacity: usuarioActual?.señal === key ? 1 : 0.3 }}>
                    <p style={{ fontSize: '20px' }}>{e.emoji}</p>
                    <p style={{ fontSize: '8px', opacity: 0.8 }}>{e.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerta dinámica señal baja */}
        {usuarioActual?.señal === 'baja' && (
  <div style={{ background: 'rgba(244,67,54,0.2)', border: '1px solid rgba(244,67,54,0.5)', borderRadius: '12px', padding: '12px', marginTop: '10px' }}>
    <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>⚠️ Señal baja detectada automáticamente</p>
    <p style={{ fontSize: '11px', opacity: 0.9, marginBottom: '10px' }}>
      Tu velocidad está en {velocidadActual} Mbps, por debajo del mínimo del plan contratado.
    </p>
    <button onClick={resolverSeñal}
      style={{ width: '100%', padding: '10px', background: 'white', color: '#f44336', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
      🔧 Aplicar solución automática
    </button>
  </div>
)}

          {usuarioActual?.señal === 'excelente' && (
            <div style={{ background: 'rgba(76,175,80,0.2)', border: '1px solid rgba(76,175,80,0.5)', borderRadius: '12px', padding: '10px 12px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <p style={{ fontSize: '12px', fontWeight: '600' }}>Estado del servicio: CONECTADO — Señal óptima</p>
            </div>
          )}
        </div>

        {/* Dispositivos */}
        <div className="monitoreo-devices-card" style={{ background: c.card }}>
          <div className="monitoreo-devices-header">
            <div>
              <h2 className="monitoreo-devices-title" style={{ color: c.text }}>Dispositivos conectados</h2>
              <p className="monitoreo-devices-sub" style={{ color: c.subtext }}>{dispositivosUsuario.length} dispositivos en tu red</p>
            </div>
            <button className="monitoreo-devices-ver-btn" onClick={() => navigate('/dispositivos')}>
              Ver todos
            </button>
          </div>
          {dispositivosUsuario.map((d, i) => (
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

        {/* Alertas dinámicas según señal */}
        {usuarioActual?.señal === 'baja' && (
  <div style={{ background: 'rgba(244,67,54,0.2)', border: '1px solid rgba(244,67,54,0.5)', borderRadius: '12px', padding: '12px', marginTop: '10px' }}>
    <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>⚠️ Señal baja detectada automáticamente</p>
    <p style={{ fontSize: '11px', opacity: 0.9, marginBottom: '10px' }}>
      Tu velocidad está en {usuarioActual.velocidad} Mbps, por debajo del mínimo del plan contratado.
    </p>
    <button onClick={resolverSeñal}
      style={{ width: '100%', padding: '10px', background: 'white', color: '#f44336', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
      🔧 Aplicar solución automática
    </button>
  </div>
)}
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