import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const dispositivos = [
  { icon: '📱', nombre: 'iPhone 14 Pro', tipo: 'Móvil', ip: '192.168.1.2', mac: 'A1:B2:C3:D4:E5:F6', velocidad: '45 Mbps', estado: 'Conectado', tiempo: '3h 20min' },
  { icon: '💻', nombre: 'MacBook Pro', tipo: 'Laptop', ip: '192.168.1.3', mac: 'B2:C3:D4:E5:F6:A1', velocidad: '95 Mbps', estado: 'Conectado', tiempo: '1h 45min' },
  { icon: '🖥️', nombre: 'Smart TV Samsung', tipo: 'TV', ip: '192.168.1.4', mac: 'C3:D4:E5:F6:A1:B2', velocidad: '25 Mbps', estado: 'Conectado', tiempo: '5h 10min' },
  { icon: '⌚', nombre: 'Apple Watch', tipo: 'Wearable', ip: '192.168.1.5', mac: 'D4:E5:F6:A1:B2:C3', velocidad: '2 Mbps', estado: 'Conectado', tiempo: '8h 00min' },
  { icon: '🎮', nombre: 'PlayStation 5', tipo: 'Consola', ip: '192.168.1.6', mac: 'E5:F6:A1:B2:C3:D4', velocidad: '0 Mbps', estado: 'Inactivo', tiempo: 'Hace 2h' },
]

export default function Dispositivos() {
  const navigate = useNavigate()
  const [seleccionado, setSeleccionado] = useState(null)

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', paddingBottom: '70px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0052cc, #0099ff)', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate('/monitoreo')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>←</button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Dispositivos Conectados</h1>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>Red TelNet - Router Principal</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Resumen */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4caf50' }}>4</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Activos</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#666' }}>1</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Inactivos</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0052cc' }}>167 Mbps</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Uso total</p>
          </div>
        </div>

        {/* Lista */}
        {dispositivos.map((d, i) => (
          <div
            key={i}
            onClick={() => setSeleccionado(seleccionado === i ? null : i)}
            style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', cursor: 'pointer', borderLeft: `4px solid ${d.estado === 'Conectado' ? '#4caf50' : '#ccc'}` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ background: '#f0f4ff', borderRadius: '12px', padding: '10px', fontSize: '24px' }}>{d.icon}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{d.nombre}</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>{d.tipo} · {d.ip}</p>
                  <p style={{ fontSize: '12px', color: d.estado === 'Conectado' ? '#4caf50' : '#999', fontWeight: 'bold' }}>
                    {d.estado === 'Conectado' ? '🟢' : '⚫'} {d.estado}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#0052cc' }}>{d.velocidad}</p>
                <p style={{ fontSize: '11px', color: '#666' }}>{d.tiempo}</p>
              </div>
            </div>

            {seleccionado === i && (
              <div style={{ marginTop: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '10px' }}>
                <p style={{ fontSize: '12px', color: '#666' }}>MAC: <strong>{d.mac}</strong></p>
                <button style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#ffebee', color: '#c62828', border: '1px solid #c62828', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  🚫 Bloquear dispositivo
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', background: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', color: '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}