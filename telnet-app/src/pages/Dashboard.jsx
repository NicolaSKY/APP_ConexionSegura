import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
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
            <span>👤</span>
            <span>🔔</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Resumen del Estado */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '15px', fontWeight: '600' }}>Resumen del Estado</h2>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <p style={{ fontSize: '12px', color: '#666' }}>Velocidad actual</p>
            <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#0052cc' }}>150 Mbps</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '5px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: '#666' }}>Bajada</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>15 Mbps</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: '#666' }}>Subida</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>10 Mbps</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#e8f5e9', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
            <span style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>✅ Estado del servicio: CONECTADO</span>
          </div>
        </div>

        {/* Botón Reiniciar Router */}
        <button
          style={{ width: '100%', padding: '14px', background: 'white', border: '2px solid #0052cc', borderRadius: '12px', color: '#0052cc', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}
        >
          🔄 REINICIAR ROUTER
        </button>

        {/* Acceso Rápido */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>Acceso Rápido</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/soporte')}
              style={{ flex: 1, padding: '12px', background: '#f0f4ff', border: '1px solid #0052cc', borderRadius: '10px', color: '#0052cc', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🛠️ SOPORTE TÉCNICO
            </button>
            <button
              onClick={() => navigate('/soporte')}
              style={{ flex: 1, padding: '12px', background: '#0052cc', border: 'none', borderRadius: '10px', color: 'white', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              💬 CONTACTAR
            </button>
          </div>
        </div>

        {/* Incidencias activas */}
        <div
          onClick={() => navigate('/incidencias')}
          style={{ background: '#fff3e0', border: '1px solid #ff9800', borderRadius: '15px', padding: '15px', marginBottom: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 'bold', color: '#e65100', fontSize: '16px' }}>3 Incidencias activas</p>
              <p style={{ fontSize: '12px', color: '#666' }}>en tu zona</p>
            </div>
          </div>
          <span style={{ color: '#ff9800', fontSize: '20px' }}>›</span>
        </div>

        {/* Incidencias Recientes */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>Resumen de Incidencias Recientes</h2>
          
          {[
            { id: '#2026-0525', fecha: '25 Mayo', estado: 'Abierto', color: '#ff9800', icon: '⏳' },
            { id: '#2026-0524', fecha: '24 Mayo', estado: 'Cerrado', color: '#4caf50', icon: '✅' },
            { id: '#2026-0523', fecha: '23 Mayo', estado: 'Cerrado', color: '#4caf50', icon: '✅' },
          ].map((ticket, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{ticket.icon}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Ticket {ticket.id}</p>
                  <p style={{ fontSize: '11px', color: '#666' }}>{ticket.fecha} - {ticket.estado}</p>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: ticket.color, fontWeight: 'bold' }}>{ticket.estado}</span>
            </div>
          ))}
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
            <span style={{ fontSize: '10px', color: i === 0 ? '#0052cc' : '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}