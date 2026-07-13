import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function SelectorUsuario() {
  const navigate = useNavigate()
  const { usuarios, cambiarUsuario, estadosSeñal, darkMode } = useApp()

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
  }

  const seleccionar = (usuario) => {
    cambiarUsuario(usuario.id)
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: c.header, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '50px 30px 30px', textAlign: 'center', color: 'white' }}>
        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.15)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '34px', border: '1px solid rgba(255,255,255,0.25)' }}>
          📡
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>TelNet</h1>
        <p style={{ fontSize: '12px', opacity: 0.7, letterSpacing: '3px', marginTop: '4px' }}>CONEXIÓN SEGURA</p>
        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '20px' }}>Selecciona un usuario de prueba</p>
      </div>

      {/* Usuarios */}
      <div style={{ flex: 1, background: c.bg, borderRadius: '32px 32px 0 0', padding: '30px 20px' }}>

        <div style={{ background: darkMode ? '#0d1b2e' : '#e3f2fd', borderRadius: '15px', padding: '12px 15px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px' }}>🧪</span>
          <p style={{ fontSize: '13px', color: darkMode ? '#8892b0' : '#1565c0', fontWeight: '600' }}>
            Modo demo — Cada usuario tiene condiciones distintas de red
          </p>
        </div>

        {usuarios.map((u, i) => {
          const señal = estadosSeñal[u.señal]
          return (
            <div key={i} onClick={() => seleccionar(u)}
              style={{ background: c.card, borderRadius: '20px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `2px solid ${señal.color}30`, cursor: 'pointer', transition: 'all 0.2s' }}>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ width: '55px', height: '55px', background: señal.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', border: `2px solid ${señal.color}` }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '16px', fontWeight: '800', color: c.text }}>{u.nombre}</p>
                  <p style={{ fontSize: '12px', color: c.subtext }}>{u.email}</p>
                  <p style={{ fontSize: '11px', color: c.subtext, marginTop: '2px' }}>{u.nivel}</p>
                </div>
                <div style={{ background: señal.bg, border: `1px solid ${señal.color}`, borderRadius: '12px', padding: '8px 12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px' }}>{señal.icon}</p>
                  <p style={{ fontSize: '10px', color: señal.color, fontWeight: '800' }}>{señal.label}</p>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {[
                  { label: 'Velocidad', value: `${u.velocidad} Mbps` },
                  { label: 'Ping', value: `${u.ping} ms` },
                  { label: 'Estado', value: señal.label },
                ].map((stat, j) => (
                  <div key={j} style={{ background: darkMode ? '#0d1b2e' : '#f8f9ff', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '12px', fontWeight: '800', color: j === 2 ? señal.color : c.text }}>{stat.value}</p>
                    <p style={{ fontSize: '10px', color: c.subtext }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Alerta */}
              {u.señal === 'baja' && (
                <div style={{ background: '#ffebee', border: '1px solid #f44336', borderRadius: '10px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>⚠️</span>
                  <p style={{ fontSize: '12px', color: '#c62828', fontWeight: '600' }}>
                    Señal baja detectada. El sistema generará una alerta automática.
                  </p>
                </div>
              )}

              {u.señal === 'excelente' && (
                <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '10px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>✅</span>
                  <p style={{ fontSize: '12px', color: '#2e7d32', fontWeight: '600' }}>
                    Conexión estable y en óptimas condiciones.
                  </p>
                </div>
              )}

              <button style={{ width: '100%', padding: '12px', background: `linear-gradient(135deg, #1a237e, ${señal.color})`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                Ingresar como {u.nombre.split(' ')[0]} →
              </button>
            </div>
          )
        })}

        <p style={{ textAlign: 'center', fontSize: '11px', color: c.subtext, marginTop: '10px' }}>
          © 2026 TelNet — Demo MVP · Todos los derechos reservados
        </p>
      </div>
    </div>
  )
}