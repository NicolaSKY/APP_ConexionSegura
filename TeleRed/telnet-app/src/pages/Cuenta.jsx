import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Agosto!', desc: 'Tu factura vence pronto. Evita cortes de servicio.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona.', tiempo: 'Hace 1h', leida: false },
  { id: 3, icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
]

export default function Cuenta() {
  const navigate = useNavigate()
  const { darkMode, setDarkMode, servicios, puntos, historialPagos, totalMensual, fechaVencimiento, fechaPago } = useApp()
  const [notifs, setNotifs] = useState(notificaciones)
  const [showNotif, setShowNotif] = useState(false)
  const [notifOn, setNotifOn] = useState(true)
  const [autoFactura, setAutoFactura] = useState(false)
  const [showHistorial, setShowHistorial] = useState(false)
  const [showCambiarPass, setShowCambiarPass] = useState(false)
  const [passActual, setPassActual] = useState('')
  const [passNueva, setPassNueva] = useState('')
  const [passExito, setPassExito] = useState(false)

  const noLeidas = notifs.filter(n => !n.leida).length
  const marcarLeida = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  const marcarTodasLeidas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))

  const cambiarPass = () => {
    if (!passActual || !passNueva) return
    setPassExito(true)
    setTimeout(() => { setPassExito(false); setShowCambiarPass(false); setPassActual(''); setPassNueva('') }, 2000)
  }

  // Servicios activos para mostrar en plan actual
  const serviciosActivos = servicios.filter(s => s.estado === 'Activo')

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
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '70px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '20px 20px 40px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📡</div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px' }}>TeleRed</h1>
              <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px' }}>CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setDarkMode(!darkMode)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setShowNotif(!showNotif)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              🔔
              {noLeidas > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ff1744', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{noLeidas}</span>}
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '65px', height: '65px', background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', border: '3px solid rgba(255,255,255,0.4)' }}>👤</div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '800' }}>Carlos Mendoza</p>
            <p style={{ fontSize: '13px', opacity: 0.8 }}>carlos.mendoza@email.com</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>⭐ Cliente Premium</span>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>Desde 2022</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel notificaciones */}
      {showNotif && (
        <div onClick={() => setShowNotif(false)}
          style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: c.card, margin: '80px 15px 0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: c.text, fontSize: '16px', fontWeight: '700' }}>
                Notificaciones
                {noLeidas > 0 && <span style={{ background: '#ff1744', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', marginLeft: '6px' }}>{noLeidas}</span>}
              </h3>
              <button onClick={marcarTodasLeidas} style={{ background: 'none', border: 'none', color: c.accent, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Marcar todas leídas</button>
            </div>
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {notifs.map(n => (
                <div key={n.id} onClick={() => marcarLeida(n.id)}
                  style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff', cursor: 'pointer', display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: n.leida ? '400' : '700', color: c.text }}>{n.titulo}</p>
                    <p style={{ fontSize: '12px', color: c.subtext, marginTop: '3px' }}>{n.desc}</p>
                    <p style={{ fontSize: '11px', color: c.accent, marginTop: '5px' }}>{n.tiempo}</p>
                  </div>
                  {!n.leida && <div style={{ width: '8px', height: '8px', background: c.accent, borderRadius: '50%', flexShrink: 0, marginTop: '4px' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '15px', marginTop: '-20px' }}>

        {/* Facturación — sincronizada con servicios */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '18px', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: c.text, marginBottom: '15px', fontWeight: '700' }}>💳 Facturación</h2>
          <div style={{ background: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', borderRadius: '15px', padding: '15px', color: 'white', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px', letterSpacing: '1px' }}>PRÓXIMO PAGO</p>
            <p style={{ fontSize: '36px', fontWeight: '900' }}>S/ {totalMensual.toFixed(2)}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div>
                <p style={{ fontSize: '11px', opacity: 0.7 }}>Fecha límite de pago</p>
                <p style={{ fontSize: '13px', fontWeight: '700' }}>{fechaPago}</p>
              </div>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>Al día ✅</span>
            </div>
          </div>

          {/* Desglose por servicio */}
          <div style={{ background: c.rowBg, borderRadius: '12px', padding: '12px', marginBottom: '12px', border: `1px solid ${c.border}` }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: c.text, marginBottom: '10px' }}>📊 Desglose mensual</p>
            {servicios.filter(s => s.estado === 'Activo').map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < serviciosActivos.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px' }}>{s.icon}</span>
                  <p style={{ fontSize: '12px', color: c.subtext }}>{s.nombre}</p>
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>S/ {s.precio.toFixed(2)}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px', borderTop: `2px solid ${c.border}` }}>
              <p style={{ fontSize: '13px', fontWeight: '800', color: c.text }}>Total</p>
              <p style={{ fontSize: '16px', fontWeight: '900', color: c.accent }}>S/ {totalMensual.toFixed(2)}</p>
            </div>
          </div>

          <button onClick={() => setShowHistorial(!showHistorial)}
            style={{ width: '100%', padding: '12px', background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            {showHistorial ? '▲ Ocultar historial' : '▼ Ver historial de pagos'}
          </button>

          {showHistorial && (
            <div style={{ marginTop: '12px' }}>
              {historialPagos.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < historialPagos.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{p.mes}</p>
                    <p style={{ fontSize: '11px', color: c.subtext }}>{p.fecha}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', fontWeight: '800', color: c.text }}>S/ {p.monto.toFixed(2)}</p>
                    <span style={{ background: p.nuevo ? '#e3f2fd' : p.reactivacion ? '#fff3e0' : '#e8f5e9', color: p.nuevo ? '#1565c0' : p.reactivacion ? '#e65100' : '#2e7d32', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '700' }}>
                      {p.nuevo ? '🆕 Nuevo' : p.reactivacion ? '⚡ Reactivación' : '✅ Pagado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plan actual — sincronizado con servicios */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '18px', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: c.text, marginBottom: '15px', fontWeight: '700' }}>📦 Plan Actual</h2>
          <div style={{ background: c.rowBg, borderRadius: '12px', padding: '15px', marginBottom: '12px', border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <p style={{ fontSize: '15px', fontWeight: '800', color: c.accent }}>Pack TeleRed</p>
              <span style={{ background: '#e3f2fd', color: '#1565c0', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                {serviciosActivos.length === 4 ? '👑 Ultra' : serviciosActivos.length >= 3 ? '⭐ Premium' : '🔵 Básico'}
              </span>
            </div>

            {/* Servicios activos dinámicos */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {serviciosActivos.map((s, i) => (
                <span key={i} style={{ background: darkMode ? s.color + '30' : s.bg, color: s.color, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', border: `1px solid ${s.color}30` }}>
                  {s.icon} {s.nombre.split(' ')[0]}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: `1px solid ${c.border}` }}>
              <p style={{ fontSize: '12px', color: c.subtext }}>📅 Vence el</p>
              <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{fechaVencimiento}</p>
            </div>
          </div>
          <button onClick={() => navigate('/servicios')}
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            Gestionar Servicios
          </button>
        </div>

        {/* Mis direcciones */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '18px', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: c.text, marginBottom: '15px', fontWeight: '700' }}>📍 Mis Direcciones</h2>
          {[
            { icon: '🏠', label: 'Casa Principal', dir: 'Av. Pardo 234, Miraflores', zona: 'Zona 1' },
            { icon: '🏢', label: 'Oficina', dir: 'Calle Los Olivos 567, San Isidro', zona: 'Zona 2' },
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: c.rowBg, borderRadius: '12px', marginBottom: '8px', border: `1px solid ${c.border}` }}>
              <span style={{ fontSize: '24px' }}>{d.icon}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{d.label}</p>
                <p style={{ fontSize: '12px', color: c.subtext }}>{d.dir}</p>
                <p style={{ fontSize: '11px', color: c.accent, fontWeight: '600' }}>{d.zona}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Puntos  — sincronizados */}
        <div onClick={() => navigate('/puntos')}
          style={{ background: 'linear-gradient(135deg, #ff6f00, #ff8f00)', borderRadius: '20px', padding: '18px', marginBottom: '15px', color: 'white', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>⭐ PUNTOS TeleRed</p>
              <p style={{ fontSize: '36px', fontWeight: '900' }}>{puntos} pts</p>
              <p style={{ fontSize: '12px', opacity: 0.9 }}>Toca para canjear premios</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '12px', padding: '12px 16px', marginBottom: '6px' }}>
                <p style={{ fontSize: '13px', fontWeight: '800' }}>Canjear →</p>
              </div>
              <p style={{ fontSize: '10px', opacity: 0.8 }}>
                {puntos >= 250 ? '🥇 Gold' : puntos >= 100 ? '🥈 Silver' : '🥉 Bronze'}
              </p>
            </div>
          </div>
        </div>

        {/* Configuración */}
        <div style={{ background: c.card, borderRadius: '20px', padding: '18px', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '15px', color: c.text, marginBottom: '15px', fontWeight: '700' }}>⚙️ Configuración</h2>
          {[
            { label: '🔔 Notificaciones', value: notifOn, set: setNotifOn },
            { label: '🌙 Modo Oscuro', value: darkMode, set: setDarkMode },
            { label: '📄 Factura automática', value: autoFactura, set: setAutoFactura },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? `1px solid ${c.border}` : 'none' }}>
              <p style={{ fontSize: '14px', color: c.text, fontWeight: '600' }}>{item.label}</p>
              <div onClick={() => item.set(!item.value)}
                style={{ width: '46px', height: '26px', background: item.value ? c.accent : darkMode ? '#2a2a3a' : '#ccc', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: '3px', left: item.value ? '23px' : '3px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Opciones */}
        <div style={{ background: c.card, borderRadius: '20px', overflow: 'hidden', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          {[
            { icon: '🔒', label: 'Cambiar contraseña', action: () => setShowCambiarPass(true) },
            { icon: '❓', label: 'Ayuda y preguntas frecuentes', action: () => navigate('/soporte') },
            { icon: '📄', label: 'Términos y condiciones', action: () => navigate('/terminos') },
          ].map((op, i) => (
            <div key={i} onClick={op.action}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', borderBottom: i < 2 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>{op.icon}</span>
                <p style={{ fontSize: '14px', color: c.text, fontWeight: '600' }}>{op.label}</p>
              </div>
              <span style={{ color: c.subtext, fontSize: '18px' }}>›</span>
            </div>
          ))}
        </div>

        {/* Cerrar sesión */}
        <button onClick={() => navigate('/login')}
          style={{ width: '100%', padding: '15px', background: '#ffebee', border: '2px solid #c62828', color: '#c62828', borderRadius: '15px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
          🚪 Cerrar Sesión
        </button>
      </div>

      {/* Modal cambiar contraseña */}
      {showCambiarPass && (
        <div onClick={() => setShowCambiarPass(false)}
          style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: c.card, borderRadius: '24px', padding: '25px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            {passExito ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: '60px', marginBottom: '15px' }}>🔐</p>
                <h3 style={{ color: '#2e7d32', fontSize: '20px', fontWeight: '800' }}>¡Contraseña actualizada!</h3>
              </div>
            ) : (
              <>
                <h3 style={{ color: c.text, fontSize: '18px', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>🔒 Cambiar Contraseña</h3>
                {[
                  { label: 'Contraseña actual', value: passActual, set: setPassActual },
                  { label: 'Nueva contraseña', value: passNueva, set: setPassNueva },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '13px', color: c.subtext, marginBottom: '6px' }}>{field.label}</p>
                    <input type="password" value={field.value} onChange={e => field.set(e.target.value)}
                      placeholder="••••••••"
                      style={{ width: '100%', padding: '13px', border: `2px solid ${c.border}`, borderRadius: '12px', fontSize: '14px', background: c.card, color: c.text, outline: 'none' }} />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                  <button onClick={() => setShowCambiarPass(false)}
                    style={{ flex: 1, padding: '13px', background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                  <button onClick={cambiarPass}
                    style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                    Guardar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', background: c.card, borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '5px 10px' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', color: i === 3 ? c.accent : c.subtext, fontWeight: i === 3 ? '700' : '400' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}