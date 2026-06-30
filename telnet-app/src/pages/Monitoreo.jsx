import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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
  { icon: '⚠️', tipo: 'corte', titulo: 'Interrupción en Zona 1 - Miraflores', desc: 'Corte de fibra por obras en Av. Pardo. Técnicos en camino.', tiempo: 'Hace 2 min', color: '#ff9800', bg: '#fff3e0' },
  { icon: '✅', tipo: 'restaurado', titulo: 'Servicio restaurado - San Isidro', desc: 'La señal fue restablecida completamente en tu zona.', tiempo: 'Hace 15 min', color: '#4caf50', bg: '#e8f5e9' },
  { icon: '🔧', tipo: 'mantenimiento', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio de 2am a 4am habrá mantenimiento en Surco.', tiempo: 'Hace 1h', color: '#0288d1', bg: '#e3f2fd' },
]

const dispositivos = [
  { icon: '📱', nombre: 'iPhone 14 Pro', tipo: 'Móvil', velocidad: '45 Mbps', estado: 'Conectado', tiempo: '3h 20min', color: '#1565c0' },
  { icon: '💻', nombre: 'MacBook Pro', tipo: 'Laptop', velocidad: '95 Mbps', estado: 'Conectado', tiempo: '1h 45min', color: '#6a1b9a' },
  { icon: '🖥️', nombre: 'Smart TV Samsung', tipo: 'TV', velocidad: '25 Mbps', estado: 'Conectado', tiempo: '5h 10min', color: '#00838f' },
  { icon: '⌚', nombre: 'Apple Watch', tipo: 'Wearable', velocidad: '2 Mbps', estado: 'Conectado', tiempo: '8h 00min', color: '#2e7d32' },
  { icon: '🎮', nombre: 'PlayStation 5', tipo: 'Consola', velocidad: '0 Mbps', estado: 'Inactivo', tiempo: 'Hace 2h', color: '#666' },
]

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Julio!', desc: 'Tu factura de S/ 179.70 vence pronto.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona.', tiempo: 'Hace 1h', leida: false },
  { id: 3, icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
  { id: 4, icon: '📶', titulo: 'Señal inestable detectada', desc: 'Detectamos intermitencias en tu red.', tiempo: 'Hace 5h', leida: true },
  { id: 5, icon: '⭐', titulo: '¡Nuevo beneficio disponible!', desc: 'Tienes 500 puntos TelNet acumulados.', tiempo: 'Ayer', leida: true },
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
    accent: '#0288d1',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
  }

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '70px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
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
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Monitoreo en Tiempo Real</h2>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>Estado actual de tu conexión</p>
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

        {/* Gráfica */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '15px', marginBottom: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700' }}>Velocidad últimas 24h</h2>
              <p style={{ fontSize: '11px', color: c.subtext }}>Mbps en el tiempo</p>
            </div>
            <div style={{ background: '#e8f5e9', padding: '4px 10px', borderRadius: '20px' }}>
              <p style={{ fontSize: '11px', color: '#2e7d32', fontWeight: '700' }}>🟢 En línea</p>
            </div>
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

        {/* Velocidad actual — diseño llamativo */}
        <div style={{ background: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', borderRadius: '20px', padding: '20px', marginBottom: '15px', color: 'white', boxShadow: '0 8px 32px rgba(2,136,209,0.3)' }}>
          <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px', marginBottom: '5px' }}>VELOCIDAD ACTUAL</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '20px' }}>
            <p style={{ fontSize: '56px', fontWeight: '900', lineHeight: 1 }}>150</p>
            <p style={{ fontSize: '20px', opacity: 0.8, marginBottom: '8px' }}>Mbps</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: '⬇️ Bajada', value: '15 Mbps' },
              { label: '⬆️ Subida', value: '10 Mbps' },
              { label: '📶 Ping', value: '25 ms' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <p style={{ fontSize: '10px', opacity: 0.8, marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontSize: '14px', fontWeight: '800' }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Estabilidad */}
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '8px' }}>ESTABILIDAD DE RED</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: '800' }}>Excelente</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { emoji: '😊', label: 'Excelente', activo: true },
                  { emoji: '🙂', label: 'Bueno', activo: false },
                  { emoji: '😐', label: 'Regular', activo: false },
                  { emoji: '😟', label: 'Malo', activo: false },
                ].map((e, i) => (
                  <div key={i} style={{ textAlign: 'center', opacity: e.activo ? 1 : 0.4 }}>
                    <p style={{ fontSize: '20px' }}>{e.emoji}</p>
                    <p style={{ fontSize: '8px', opacity: 0.8 }}>{e.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dispositivos conectados */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '15px', marginBottom: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700' }}>Dispositivos conectados</h2>
              <p style={{ fontSize: '11px', color: c.subtext }}>5 dispositivos en tu red</p>
            </div>
            <button onClick={() => navigate('/dispositivos')}
              style={{ background: c.accent, border: 'none', borderRadius: '10px', padding: '6px 12px', color: 'white', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Ver todos
            </button>
          </div>
          {dispositivos.slice(0, 4).map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '8px', background: darkMode ? '#0d1b2e' : '#f8f9ff', borderRadius: '12px', border: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', background: d.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {d.icon}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{d.nombre}</p>
                  <p style={{ fontSize: '11px', color: c.subtext }}>{d.tipo} · {d.tiempo}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: '800', color: d.estado === 'Conectado' ? c.accent : '#999' }}>{d.velocidad}</p>
                <p style={{ fontSize: '10px', color: d.estado === 'Conectado' ? '#4caf50' : '#999', fontWeight: '600' }}>
                  {d.estado === 'Conectado' ? '🟢' : '⚫'} {d.estado}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Alertas de zona */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: '15px' }}>
            <h2 style={{ fontSize: '15px', color: c.text, fontWeight: '700' }}>Alertas de tu Zona</h2>
            <p style={{ fontSize: '11px', color: c.subtext }}>Eventos que afectan tu área de servicio</p>
          </div>
          {alertasZona.map((alerta, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', marginBottom: '8px', background: darkMode ? '#0d1b2e' : alerta.bg, borderRadius: '12px', border: `1px solid ${alerta.color}30` }}>
              <div style={{ width: '38px', height: '38px', background: alerta.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {alerta.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: c.text, marginBottom: '3px' }}>{alerta.titulo}</p>
                <p style={{ fontSize: '11px', color: c.subtext, marginBottom: '5px' }}>{alerta.desc}</p>
                <p style={{ fontSize: '10px', color: alerta.color, fontWeight: '700' }}>{alerta.tiempo}</p>
              </div>
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
            <span style={{ fontSize: '10px', color: i === 1 ? c.accent : c.subtext, fontWeight: i === 1 ? '700' : '400' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}