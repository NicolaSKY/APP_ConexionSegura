import { useNavigate } from 'react-router-dom'
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

export default function Monitoreo() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', paddingBottom: '70px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0052cc, #0099ff)', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>TelNet</h1>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>Conexión Segura</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', fontSize: '22px' }}>
            <span>👤</span><span>🔔</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Gráfica */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>Monitoreo de Conexión en Tiempo Real</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="tiempo" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="velocidad" stroke="#0052cc" strokeWidth={2} dot={{ fill: '#0052cc', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Velocidades */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666' }}>Velocidad actual</p>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#0052cc' }}>150 Mbps</p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Velocidad de carga</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>15 Mbps</p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Velocidad de descarga</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>145 Mbps</p>
            </div>

            {/* Ping */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: '#f0f4ff', border: '1px solid #0052cc', borderRadius: '12px', padding: '12px 16px', marginBottom: '10px' }}>
                <p style={{ fontSize: '11px', color: '#666' }}>Ping (msec) ℹ️</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0052cc' }}>25 ms</p>
              </div>
              <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '12px', padding: '12px 16px' }}>
                <p style={{ fontSize: '11px', color: '#666' }}>Estabilidad de red</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32' }}>Excelente</p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', justifyContent: 'center' }}>
                  {['😊', '🙂', '😐', '😟'].map((emoji, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '18px', opacity: i === 0 ? 1 : 0.4 }}>{emoji}</span>
                      <p style={{ fontSize: '9px', color: '#666' }}>{['Excelente', 'Bueno', 'Regular', 'Malo'][i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispositivos */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', color: '#333', fontWeight: '600' }}>Dispositivos conectados</h2>
            <span onClick={() => navigate('/dispositivos')} style={{ fontSize: '12px', color: '#0052cc', cursor: 'pointer' }}>Ver todos</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {['📱', '💻', '🖥️', '⌚'].map((icon, i) => (
              <div key={i} style={{ background: '#f0f4ff', borderRadius: '10px', padding: '10px', fontSize: '22px' }}>{icon}</div>
            ))}
            <div style={{ background: '#0052cc', borderRadius: '10px', padding: '8px 12px' }}>
              <p style={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}>5 Dispositivos</p>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>Alertas de Interrupción del Servicio</h2>
          <div style={{ background: '#fff3e0', border: '1px solid #ff9800', borderRadius: '10px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <p style={{ fontSize: '13px', color: '#e65100' }}>Interrupción en zona 1</p>
            </div>
            <span style={{ fontSize: '11px', color: '#666' }}>(2 min)</span>
          </div>
          <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <p style={{ fontSize: '13px', color: '#2e7d32' }}>Servicio restaurado</p>
            </div>
            <span style={{ fontSize: '11px', color: '#666' }}>(3 min)</span>
          </div>
        </div>

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
            <span style={{ fontSize: '10px', color: i === 1 ? '#0052cc' : '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}