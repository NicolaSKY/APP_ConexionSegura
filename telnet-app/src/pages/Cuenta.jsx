import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Cuenta() {
  const navigate = useNavigate()
  const [notif, setNotif] = useState(true)
  const [autoFactura, setAutoFactura] = useState(false)

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', paddingBottom: '70px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0052cc, #0099ff)', padding: '20px 20px 40px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>Mi Cuenta</h1>
          <span style={{ fontSize: '22px' }}>🔔</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👤</div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Carlos Mendoza</p>
            <p style={{ fontSize: '13px', opacity: 0.8 }}>carlos.mendoza@email.com</p>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>Cliente desde: Enero 2022</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '15px', marginTop: '-20px' }}>

        {/* Facturación */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>💳 Facturación</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p style={{ fontSize: '13px', color: '#666' }}>Próximo pago</p>
            <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>30 Jun 2026</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p style={{ fontSize: '13px', color: '#666' }}>Monto a pagar</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#0052cc' }}>S/ 179.70</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <p style={{ fontSize: '13px', color: '#666' }}>Estado</p>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Al día ✅</span>
          </div>
          <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #0052cc, #0099ff)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Ver historial de pagos
          </button>
        </div>

        {/* Plan actual */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>📦 Plan Actual</h2>
          <div style={{ background: '#f0f4ff', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#0052cc' }}>Pack TelNet Premium</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Internet 150 Mbps + Telefonía + Cable TV</p>
          </div>
          <button style={{ width: '100%', padding: '12px', background: 'white', border: '2px solid #0052cc', color: '#0052cc', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cambiar de Plan
          </button>
        </div>

        {/* Configuración */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>⚙️ Configuración</h2>
          {[
            { label: 'Notificaciones', value: notif, set: setNotif },
            { label: 'Factura automática', value: autoFactura, set: setAutoFactura },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i === 0 ? '1px solid #f0f0f0' : 'none' }}>
              <p style={{ fontSize: '14px', color: '#333' }}>{item.label}</p>
              <div
                onClick={() => item.set(!item.value)}
                style={{ width: '44px', height: '24px', background: item.value ? '#0052cc' : '#ccc', borderRadius: '12px', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: item.value ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'left 0.3s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Opciones */}
        {[
          { icon: '🔒', label: 'Cambiar contraseña' },
          { icon: '📄', label: 'Términos y condiciones' },
          { icon: '❓', label: 'Ayuda y preguntas frecuentes' },
        ].map((op, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '15px', marginBottom: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>{op.icon}</span>
              <p style={{ fontSize: '14px', color: '#333' }}>{op.label}</p>
            </div>
            <span style={{ color: '#ccc', fontSize: '18px' }}>›</span>
          </div>
        ))}

        {/* Cerrar sesión */}
        <button
          onClick={() => navigate('/login')}
          style={{ width: '100%', padding: '14px', background: '#ffebee', border: '1px solid #c62828', color: '#c62828', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          🚪 Cerrar Sesión
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
            <span style={{ fontSize: '10px', color: i === 3 ? '#0052cc' : '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}