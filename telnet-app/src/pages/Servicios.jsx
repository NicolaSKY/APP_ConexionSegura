import { useNavigate } from 'react-router-dom'

const servicios = [
  {
    icon: '🌐',
    nombre: 'Internet Fibra Óptica',
    plan: 'Plan 150 Mbps',
    estado: 'Activo',
    precio: 'S/ 89.90/mes',
    vence: '30 Jun 2026',
    color: '#0052cc',
    bg: '#f0f4ff',
  },
  {
    icon: '📞',
    nombre: 'Telefonía Fija',
    plan: 'Plan Ilimitado Local',
    estado: 'Activo',
    precio: 'S/ 29.90/mes',
    vence: '30 Jun 2026',
    color: '#2e7d32',
    bg: '#e8f5e9',
  },
  {
    icon: '📺',
    nombre: 'Cable TV',
    plan: 'Plan Premium 120 canales',
    estado: 'Activo',
    precio: 'S/ 59.90/mes',
    vence: '30 Jun 2026',
    color: '#6a1b9a',
    bg: '#f3e5f5',
  },
  {
    icon: '📱',
    nombre: 'Telefonía Móvil',
    plan: 'Plan 20GB + Llamadas',
    estado: 'Suspendido',
    precio: 'S/ 49.90/mes',
    vence: '-',
    color: '#c62828',
    bg: '#ffebee',
  },
]

export default function Servicios() {
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
        <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '15px', fontWeight: '700' }}>Mis Servicios</h2>

        {/* Resumen */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0052cc' }}>3</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Activos</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#c62828' }}>1</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Suspendido</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>S/ 179.70</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Total/mes</p>
          </div>
        </div>

        {/* Lista de servicios */}
        {servicios.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ background: s.bg, borderRadius: '12px', padding: '12px', fontSize: '26px' }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{s.nombre}</p>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{s.plan}</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: s.color, marginTop: '4px' }}>{s.precio}</p>
                </div>
              </div>
              <span style={{ background: s.estado === 'Activo' ? '#e8f5e9' : '#ffebee', color: s.estado === 'Activo' ? '#2e7d32' : '#c62828', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                {s.estado}
              </span>
            </div>
            {s.vence !== '-' && (
              <div style={{ marginTop: '12px', padding: '8px 12px', background: '#f9f9f9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>Vence:</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{s.vence}</span>
              </div>
            )}
            {s.estado === 'Suspendido' && (
              <button style={{ marginTop: '10px', width: '100%', padding: '10px', background: s.color, color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                Reactivar Servicio
              </button>
            )}
          </div>
        ))}

        {/* Agregar servicio */}
        <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0052cc, #0099ff)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
          ➕ Agregar Nuevo Servicio
        </button>
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
            <span style={{ fontSize: '10px', color: i === 2 ? '#0052cc' : '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}