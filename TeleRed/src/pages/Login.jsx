import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Login.css'

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
    <div className="login-container">

      {/* Fondo */}
      <div className="login-bg" />

      {/* Círculos decorativos */}
      <div className="login-circle-1" />
      <div className="login-circle-2" />
      <div className="login-circle-3" />

      {/* Puntos decorativos */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="login-dot" style={{ top: `${15 + i * 12}%`, left: `${10 + i * 8}%` }} />
      ))}

      {/* Contenido */}
      <div className="login-content">

        {/* Logo */}
        <div className="login-top">
          <div className="login-logo-box">📡</div>
          <h1 className="login-title">TeleRed</h1>
          <p className="login-subtitle">CONEXIÓN SEGURA</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <h2 className="login-card-title">Bienvenido 👋</h2>
          <p className="login-card-desc">
            Inicia sesión para gestionar tu servicio TelNet y mantente siempre conectado.
          </p>

          {/* Error */}
          {error && (
            <div className="login-error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Email */}
          <label className="login-label">Correo electrónico</label>
          <div className="login-input-wrapper">
            <span className="login-input-icon">✉️</span>
            <input
              className="login-input"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* Password */}
          <label className="login-label">Contraseña</label>
          <div className="login-input-wrapper">
            <span className="login-input-icon">🔒</span>
            <input
              className="login-input"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              type="password"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          {/* Olvidaste contraseña */}
          <div className="login-forgot">
            <span>¿Olvidaste tu contraseña?</span>
          </div>

          {/* Botón */}
          <button
            className={`login-btn ${loading ? 'login-btn-loading' : 'login-btn-active'}`}
            onClick={handleLogin}
          >
            {loading ? '⏳ Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {/* Divisor */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <p>O continúa con</p>
            <div className="login-divider-line" />
          </div>

          {/* Botones sociales */}
          <div className="login-social-buttons">
            {[
              { icon: '🇬', label: 'Google' },
              { icon: '📘', label: 'Facebook' },
            ].map((btn, i) => (
              <button key={i} className="login-social-btn" onClick={handleLogin}>
                <span>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Registro */}
          <p className="login-register" style={{ cursor: 'pointer' }}>
            ¿No tienes cuenta? <span onClick={() => navigate('/selector')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Regístrate</span>
          </p>

          {/* Copyright */}
          <p className="login-copyright">
            © 2026 TELNET — TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </div>
  )
}