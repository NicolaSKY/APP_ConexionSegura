import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0052cc, #0099ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '36px' }}>
          📡
        </div>
        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>TelNet</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Conexión Segura</p>
      </div>

      {/* Formulario */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '30px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#0052cc', marginBottom: '20px', fontSize: '20px' }}>Iniciar Sesión</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Usuario</label>
          <input
            value={user}
            onChange={e => setUser(e.target.value)}
            placeholder="tu@correo.com"
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Contraseña</label>
          <input
            value={pass}
            onChange={e => setPass(e.target.value)}
            type="password"
            placeholder="••••••••"
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0052cc, #0099ff)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Ingresar
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#0052cc', fontSize: '13px', cursor: 'pointer' }}>
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  )
}