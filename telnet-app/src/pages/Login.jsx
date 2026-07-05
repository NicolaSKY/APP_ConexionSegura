import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Login() {
  const navigate = useNavigate()
  const { darkMode } = useApp()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!user || !pass) { setError('Por favor completa todos los campos'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1500)
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a237e 40%, #0288d1 100%)',
      }} />

      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(2,136,209,0.2)', border: '1px solid rgba(2,136,209,0.3)' }} />
      <div style={{ position: 'absolute', top: '40px', right: '20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', bottom: '100px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(2,136,209,0.15)', border: '1px solid rgba(2,136,209,0.2)' }} />

      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '4px', height: '4px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.4)',
          top: `${15 + i * 12}%`,
          left: `${10 + i * 8}%`,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0' }}>

        <div style={{ padding: '50px 30px 30px', textAlign: 'center' }}>
          <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.15)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '34px', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }}>
            📡
          </div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>TelNet</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', letterSpacing: '3px', marginTop: '4px' }}>CONEXIÓN SEGURA</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '32px 32px 0 0',
          padding: '35px 28px 40px',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.3)',
          flex: 1,
        }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a2e', marginBottom: '6px' }}>Bienvenido 👋</h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '30px', lineHeight: '1.5' }}>
            Inicia sesión para gestionar tu servicio TelNet y mantente siempre conectado.
          </p>

          {error && (
            <div style={{ background: '#ffebee', border: '1px solid #c62828', borderRadius: '12px', padding: '10px 14px', marginBottom: '15px' }}>
              <p style={{ color: '#c62828', fontSize: '13px', fontWeight: '600' }}>⚠️ {error}</p>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e', display: 'block', marginBottom: '8px' }}>Correo electrónico</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>✉️</span>
              <input
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="ejemplo@correo.com"
                style={{ width: '100%', padding: '14px 14px 14px 42px', border: '2px solid #e8e8e8', borderRadius: '14px', fontSize: '14px', outline: 'none', background: '#f8f9ff', color: '#1a1a2e', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0288d1'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e', display: 'block', marginBottom: '8px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔒</span>
              <input
                value={pass}
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                type="password"
                placeholder="Mínimo 8 caracteres"
                style={{ width: '100%', padding: '14px 14px 14px 42px', border: '2px solid #e8e8e8', borderRadius: '14px', fontSize: '14px', outline: 'none', background: '#f8f9ff', color: '#1a1a2e', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0288d1'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>
          </div>

          {/* Olvidaste contraseña */}
          <div style={{ textAlign: 'right', marginBottom: '25px' }}>
            <span style={{ fontSize: '13px', color: '#0288d1', fontWeight: '700', cursor: 'pointer' }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {/* Botón login */}
          <button
            onClick={handleLogin}
            style={{
              width: '100%', padding: '16px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #1a237e, #0288d1)',
              color: 'white', border: 'none', borderRadius: '14px',
              fontSize: '16px', fontWeight: '800', cursor: loading ? 'default' : 'pointer',
              boxShadow: '0 8px 24px rgba(2,136,209,0.4)',
              marginBottom: '20px',
              transition: 'all 0.3s',
            }}>
            {loading ? '⏳ Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {/* Divisor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
            <p style={{ fontSize: '12px', color: '#999', fontWeight: '600' }}>O continúa con</p>
            <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
          </div>

          {/* Botones sociales */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
            {[
              { icon: '🇬', label: 'Google', color: '#ea4335' },
              { icon: '📘', label: 'Facebook', color: '#1877f2' },
            ].map((btn, i) => (
              <button key={i} onClick={handleLogin}
                style={{ flex: 1, padding: '13px', background: 'white', border: '2px solid #e8e8e8', borderRadius: '14px', fontSize: '13px', fontWeight: '700', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Registro */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
            ¿No tienes cuenta?{' '}
            <span style={{ color: '#0288d1', fontWeight: '800', cursor: 'pointer' }}>Regístrate</span>
          </p>

          {/* Copyright */}
          <p style={{ textAlign: 'center', fontSize: '10px', color: '#aaa', marginTop: '20px', letterSpacing: '1px' }}>
            © 2026 TELNET — TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </div>
  )
}