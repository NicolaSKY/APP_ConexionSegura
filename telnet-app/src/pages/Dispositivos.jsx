import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const dispositivos = [
  { icon: '📱', nombre: 'iPhone 14 Pro', tipo: 'Móvil', ip: '192.168.1.2', mac: 'A1:B2:C3:D4:E5:F6', velocidad: 45, estado: 'Conectado', tiempo: '3h 20min', color: '#1565c0', uso: 30 },
  { icon: '💻', nombre: 'MacBook Pro', tipo: 'Laptop', ip: '192.168.1.3', mac: 'B2:C3:D4:E5:F6:A1', velocidad: 95, estado: 'Conectado', tiempo: '1h 45min', color: '#6a1b9a', uso: 63 },
  { icon: '🖥️', nombre: 'Smart TV Samsung', tipo: 'TV', ip: '192.168.1.4', mac: 'C3:D4:E5:F6:A1:B2', velocidad: 25, estado: 'Conectado', tiempo: '5h 10min', color: '#00838f', uso: 17 },
  { icon: '⌚', nombre: 'Apple Watch', tipo: 'Wearable', ip: '192.168.1.5', mac: 'D4:E5:F6:A1:B2:C3', velocidad: 2, estado: 'Conectado', tiempo: '8h 00min', color: '#2e7d32', uso: 1 },
  { icon: '🎮', nombre: 'PlayStation 5', tipo: 'Consola', ip: '192.168.1.6', mac: 'E5:F6:A1:B2:C3:D4', velocidad: 0, estado: 'Inactivo', tiempo: 'Hace 2h', color: '#555', uso: 0 },
]

export default function Dispositivos() {
  const navigate = useNavigate()
  const { darkMode } = useApp()
  const [seleccionado, setSeleccionado] = useState(null)
  const [bloqueados, setBloqueados] = useState([])

  const totalUso = dispositivos.reduce((acc, d) => acc + d.velocidad, 0)
  const activos = dispositivos.filter(d => d.estado === 'Conectado').length

  const toggleBloqueo = (nombre) => {
    setBloqueados(prev =>
      prev.includes(nombre) ? prev.filter(n => n !== nombre) : [...prev, nombre]
    )
  }

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
          <button onClick={() => navigate('/monitoreo')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Dispositivos Conectados</h1>
            <p style={{ fontSize: '11px', opacity: 0.7 }}>Red TelNet — Router Principal</p>
          </div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
            📡
          </div>
        </div>

        {/* Stats en header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Activos', value: activos, icon: '🟢' },
            { label: 'Inactivos', value: dispositivos.length - activos, icon: '⚫' },
            { label: 'Uso total', value: `${totalUso} Mbps`, icon: '📊' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '18px', marginBottom: '2px' }}>{stat.icon}</p>
              <p style={{ fontSize: '16px', fontWeight: '900' }}>{stat.value}</p>
              <p style={{ fontSize: '10px', opacity: 0.8 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Lista dispositivos */}
        {dispositivos.map((d, i) => {
          const bloqueado = bloqueados.includes(d.nombre)
          const expandido = seleccionado === i

          return (
            <div key={i} style={{ background: c.card, borderRadius: '18px', marginBottom: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: `1px solid ${expandido ? c.accent : c.border}`, transition: 'all 0.3s', opacity: bloqueado ? 0.6 : 1 }}>

              {/* Fila principal */}
              <div onClick={() => setSeleccionado(expandido ? null : i)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', cursor: 'pointer' }}>

                {/* Icono */}
                <div style={{ width: '48px', height: '48px', background: bloqueado ? '#555' : d.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, boxShadow: `0 4px 12px ${d.color}40` }}>
                  {d.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: bloqueado ? c.subtext : c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.nombre}</p>
                    {bloqueado && <span style={{ fontSize: '10px', background: '#ffebee', color: '#c62828', padding: '1px 6px', borderRadius: '6px', fontWeight: '700', flexShrink: 0 }}>BLOQUEADO</span>}
                  </div>
                  <p style={{ fontSize: '11px', color: c.subtext }}>{d.tipo} · {d.ip}</p>

                  {/* Barra de uso */}
                  {d.estado === 'Conectado' && !bloqueado && (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ background: c.border, borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${(d.velocidad / 150) * 100}%`, background: `linear-gradient(90deg, ${d.color}, ${c.accent})`, height: '4px', borderRadius: '4px', transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Velocidad y estado */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: '800', color: d.estado === 'Conectado' && !bloqueado ? c.accent : '#999' }}>
                    {bloqueado ? '—' : `${d.velocidad} Mbps`}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '3px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: bloqueado ? '#c62828' : d.estado === 'Conectado' ? '#4caf50' : '#999' }} />
                    <p style={{ fontSize: '10px', color: bloqueado ? '#c62828' : d.estado === 'Conectado' ? '#4caf50' : '#999', fontWeight: '600' }}>
                      {bloqueado ? 'Bloqueado' : d.estado}
                    </p>
                  </div>
                  <p style={{ fontSize: '10px', color: c.subtext, marginTop: '2px' }}>{d.tiempo}</p>
                </div>
              </div>

              {/* Panel expandido */}
              {expandido && (
                <div style={{ padding: '0 15px 15px' }}>
                  <div style={{ background: c.rowBg, borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {[
                        { label: 'Dirección IP', value: d.ip },
                        { label: 'Tipo', value: d.tipo },
                        { label: 'Tiempo conectado', value: d.tiempo },
                        { label: 'Uso de red', value: `${d.velocidad} Mbps` },
                      ].map((item, j) => (
                        <div key={j}>
                          <p style={{ fontSize: '10px', color: c.subtext, marginBottom: '2px' }}>{item.label}</p>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: `1px solid ${c.border}` }}>
                      <p style={{ fontSize: '10px', color: c.subtext, marginBottom: '2px' }}>Dirección MAC</p>
                      <p style={{ fontSize: '12px', fontWeight: '700', color: c.text, fontFamily: 'monospace' }}>{d.mac}</p>
                    </div>
                  </div>

                  {/* Botones acción */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleBloqueo(d.nombre)}
                      style={{ flex: 1, padding: '11px', background: bloqueado ? '#e8f5e9' : '#ffebee', color: bloqueado ? '#2e7d32' : '#c62828', border: `1px solid ${bloqueado ? '#4caf50' : '#c62828'}`, borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                      {bloqueado ? '✅ Desbloquear' : '🚫 Bloquear'}
                    </button>
                    <button
                      style={{ flex: 1, padding: '11px', background: darkMode ? '#0d1b2e' : '#e3f2fd', color: c.accent, border: `1px solid ${c.accent}`, borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                      📊 Ver historial
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Info red */}
        <div style={{ background: c.card, borderRadius: '18px', padding: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: `1px solid ${c.border}` }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: c.text, marginBottom: '12px' }}>📡 Info de tu Red</h3>
          {[
            { label: 'Router', value: 'TelNet RT-2600' },
            { label: 'IP pública', value: '190.236.45.123' },
            { label: 'DNS', value: '8.8.8.8 / 8.8.4.4' },
            { label: 'Seguridad', value: 'WPA3 🔒' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
              <p style={{ fontSize: '12px', color: c.subtext }}>{item.label}</p>
              <p style={{ fontSize: '12px', fontWeight: '700', color: c.text }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}