import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Servicios.css'

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Agosto!', desc: 'Tu factura vence pronto.', tiempo: 'Hace 5 min', leida: false },
  { id: 2, icon: '⚠️', titulo: 'Mantenimiento programado', desc: 'El 5 de Julio habrá mantenimiento en tu zona.', tiempo: 'Hace 1h', leida: false },
  { id: 3, icon: '🎁', titulo: '¡Duplica tu velocidad gratis!', desc: 'Por ser cliente fiel, disfruta 2x velocidad este fin de semana.', tiempo: 'Hace 3h', leida: true },
]

const todoServicios = [
  { icon: '🌐', nombre: 'Internet Fibra Óptica', plan: 'Plan 150 Mbps', precio: 89.90, color: '#1565c0', bg: '#e3f2fd', id: 'internet', desc: 'Fibra óptica de alta velocidad hasta 150 Mbps simétricos.' },
  { icon: '📞', nombre: 'Telefonía Fija', plan: 'Plan Ilimitado Local', precio: 29.90, color: '#2e7d32', bg: '#e8f5e9', id: 'fija', desc: 'Llamadas ilimitadas a fijos locales y minutos a móviles.' },
  { icon: '📺', nombre: 'Cable TV', plan: 'Plan Premium 120 canales', precio: 59.90, color: '#6a1b9a', bg: '#f3e5f5', id: 'cable', desc: '120 canales HD incluyendo deportes, cine y series.' },
  { icon: '📱', nombre: 'Telefonía Móvil', plan: 'Plan 20GB + Llamadas', precio: 49.90, color: '#c62828', bg: '#ffebee', id: 'movil', desc: '20GB de datos 4G LTE + llamadas ilimitadas a nivel nacional.' },
]

export default function Servicios() {
  const navigate = useNavigate()
  const { darkMode, setDarkMode, servicios, agregarServicio, reactivarServicio } = useApp()
  const [notifs, setNotifs] = useState(notificaciones)
  const [showNotif, setShowNotif] = useState(false)
  const [modalReactivar, setModalReactivar] = useState(null)
  const [codigo, setCodigo] = useState('')
  const [errorCodigo, setErrorCodigo] = useState('')
  const [exitoReactivar, setExitoReactivar] = useState(false)
  const [showAgregar, setShowAgregar] = useState(false)
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [showConfirmAgregar, setShowConfirmAgregar] = useState(false)
  const [exitoAgregar, setExitoAgregar] = useState(false)

  const noLeidas = notifs.filter(n => !n.leida).length
  const marcarLeida = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  const marcarTodasLeidas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))

  const idsActivos = servicios.map(s => s.id)
  const serviciosFaltantes = todoServicios.filter(s => !idsActivos.includes(s.id))
  const totalMes = servicios.filter(s => s.estado === 'Activo').reduce((acc, s) => acc + s.precio, 0)
  const activos = servicios.filter(s => s.estado === 'Activo').length
  const suspendidos = servicios.filter(s => s.estado === 'Suspendido').length

  const reactivar = () => {
    if (!codigo.trim()) { setErrorCodigo('Ingresa el código de activación'); return }
    setErrorCodigo('')
    reactivarServicio(modalReactivar.id)
    setExitoReactivar(true)
    setTimeout(() => { setExitoReactivar(false); setModalReactivar(null); setCodigo('') }, 2500)
  }

  const confirmarAgregar = () => {
    agregarServicio(servicioSeleccionado)
    setShowConfirmAgregar(false)
    setExitoAgregar(true)
    setTimeout(() => { setExitoAgregar(false); setShowAgregar(false); setServicioSeleccionado(null) }, 2500)
  }

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    speedCard: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    rowBg: darkMode ? '#0d1b2e' : '#f8f9ff',
  }

  return (
    <div className="servicios-container" style={{ background: c.bg }}>

      {/* Header */}
      <div className="servicios-header" style={{ background: c.header }}>
        <div className="servicios-header-top">
          <div className="servicios-logo-row">
            <div className="servicios-logo-box">📡</div>
            <div>
              <h1 className="servicios-logo-title">TelNet</h1>
              <p className="servicios-logo-sub">CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div className="servicios-header-buttons">
            <button className="servicios-header-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
            <button className="servicios-header-btn" onClick={() => setShowNotif(!showNotif)}>
              🔔
              {noLeidas > 0 && <span className="servicios-notif-badge">{noLeidas}</span>}
            </button>
            <button className="servicios-header-btn" onClick={() => navigate('/cuenta')}>👤</button>
          </div>
        </div>
        <div className="servicios-header-bottom">
          <h2 className="servicios-header-title">Mis Servicios</h2>
          <p className="servicios-header-sub">Gestiona tus servicios contratados</p>
        </div>
      </div>

      {/* Notificaciones */}
      {showNotif && (
        <div className="servicios-notif-overlay" onClick={() => setShowNotif(false)}>
          <div className="servicios-notif-panel" style={{ background: c.card }} onClick={e => e.stopPropagation()}>
            <div className="servicios-notif-header" style={{ borderBottom: `1px solid ${c.border}` }}>
              <h3 className="servicios-notif-title" style={{ color: c.text }}>
                Notificaciones
                {noLeidas > 0 && <span className="servicios-notif-badge-count">{noLeidas}</span>}
              </h3>
              <button className="servicios-notif-mark-all" onClick={marcarTodasLeidas}>Marcar todas leídas</button>
            </div>
            <div className="servicios-notif-list">
              {notifs.map(n => (
                <div key={n.id} className="servicios-notif-item"
                  onClick={() => marcarLeida(n.id)}
                  style={{ borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: n.leida ? '400' : '700', color: c.text }}>{n.titulo}</p>
                    <p style={{ fontSize: '12px', color: c.subtext, marginTop: '3px' }}>{n.desc}</p>
                    <p style={{ fontSize: '11px', color: '#0288d1', marginTop: '5px' }}>{n.tiempo}</p>
                  </div>
                  {!n.leida && <div className="servicios-notif-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="servicios-content">

        {/* Resumen */}
        <div className="servicios-resumen-card" style={{ background: c.speedCard }}>
          <p className="servicios-resumen-label">RESUMEN MENSUAL</p>
          <p className="servicios-resumen-total">S/ {totalMes.toFixed(2)}<span>/mes</span></p>
          <div className="servicios-resumen-grid">
            {[
              { label: 'Activos', value: activos, icon: '✅' },
              { label: 'Suspendidos', value: suspendidos, icon: '⏸️' },
              { label: 'Total', value: servicios.length, icon: '📋' },
            ].map((s, i) => (
              <div key={i} className="servicios-resumen-stat">
                <p className="servicios-resumen-stat-icon">{s.icon}</p>
                <p className="servicios-resumen-stat-value">{s.value}</p>
                <p className="servicios-resumen-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista servicios */}
        {servicios.map((s, i) => (
          <div key={i} className="servicios-card" style={{ background: c.card, borderLeftColor: s.color }}>
            <div className="servicios-card-top">
              <div className="servicios-card-left">
                <div className="servicios-card-icon" style={{ background: darkMode ? s.color + '30' : s.bg }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <p className="servicios-card-nombre" style={{ color: c.text }}>{s.nombre}</p>
                  <p className="servicios-card-plan" style={{ color: c.subtext }}>{s.plan}</p>
                  <p className="servicios-card-precio" style={{ color: s.color }}>
                    S/ {s.precio.toFixed(2)}<span style={{ color: c.subtext }}>/mes</span>
                  </p>
                </div>
              </div>
              <span className="servicios-card-badge"
                style={{ background: s.estado === 'Activo' ? '#e8f5e9' : '#ffebee', color: s.estado === 'Activo' ? '#2e7d32' : '#c62828' }}>
                {s.estado === 'Activo' ? '✅' : '⏸️'} {s.estado}
              </span>
            </div>
            {s.estado === 'Activo' && (
              <div className="servicios-card-vence" style={{ background: c.rowBg }}>
                <span className="servicios-card-vence-label" style={{ color: c.subtext }}>📅 Vence el</span>
                <span className="servicios-card-vence-value" style={{ color: c.text }}>{s.vence}</span>
              </div>
            )}
            {s.estado === 'Suspendido' && (
              <button className="servicios-card-reactivar-btn"
                style={{ background: `linear-gradient(135deg, ${s.color}, #0288d1)` }}
                onClick={() => { setModalReactivar(s); setCodigo(''); setErrorCodigo('') }}>
                ⚡ Reactivar Servicio
              </button>
            )}
          </div>
        ))}

        {serviciosFaltantes.length > 0 && (
          <button className="servicios-agregar-btn" onClick={() => setShowAgregar(true)}>
            ➕ Agregar Nuevo Servicio
          </button>
        )}
      </div>

      {/* Modal reactivar */}
      {modalReactivar && (
        <div className="servicios-modal-overlay" onClick={() => setModalReactivar(null)}>
          <div className="servicios-modal" style={{ background: c.card }} onClick={e => e.stopPropagation()}>
            {exitoReactivar ? (
              <div className="servicios-modal-exito">
                <p className="servicios-modal-exito-icon">🎉</p>
                <h3 className="servicios-modal-exito-title">¡Servicio Reactivado!</h3>
                <p className="servicios-modal-exito-desc" style={{ color: c.subtext }}>¡Gracias por tu pago! Tu servicio está activo.</p>
              </div>
            ) : (
              <>
                <div className="servicios-modal-header">
                  <p className="servicios-modal-icon">{modalReactivar.icon}</p>
                  <h3 className="servicios-modal-title" style={{ color: c.text }}>Reactivar {modalReactivar.nombre}</h3>
                  <p className="servicios-modal-desc" style={{ color: c.subtext }}>Ingresa el código que recibiste en tu correo</p>
                </div>
                <div className="servicios-modal-info-box" style={{ background: darkMode ? '#0d47a130' : '#e3f2fd' }}>
                  <p className="servicios-modal-info-text">📧 Código enviado a: car***@email.com</p>
                </div>
                <input className="servicios-modal-input"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  placeholder="Ingresa tu código"
                  style={{ border: `2px solid ${errorCodigo ? '#c62828' : c.border}`, background: c.card, color: c.text }} />
                {errorCodigo && <p className="servicios-modal-error">{errorCodigo}</p>}
                <p className="servicios-modal-hint" style={{ color: c.subtext }}>💡 Para esta demo cualquier código funciona</p>
                <div className="servicios-modal-buttons">
                  <button className="servicios-modal-cancel-btn"
                    style={{ background: c.rowBg, borderColor: c.border, color: c.text }}
                    onClick={() => setModalReactivar(null)}>Cancelar</button>
                  <button className="servicios-modal-confirm-btn" onClick={reactivar}>⚡ Activar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal agregar */}
      {showAgregar && (
        <div className="servicios-agregar-overlay" onClick={() => { setShowAgregar(false); setServicioSeleccionado(null) }}>
          <div className="servicios-agregar-panel" style={{ background: c.bg }} onClick={e => e.stopPropagation()}>
            <div className="servicios-agregar-header" style={{ background: c.header }}>
              <div className="servicios-agregar-header-row">
                <button className="servicios-agregar-back-btn" onClick={() => { setShowAgregar(false); setServicioSeleccionado(null) }}>←</button>
                <div>
                  <h2 className="servicios-agregar-title">Agregar Servicio</h2>
                  <p className="servicios-agregar-sub">Selecciona el servicio a contratar</p>
                </div>
              </div>
            </div>
            {exitoAgregar ? (
              <div className="servicios-modal-exito" style={{ padding: '40px 20px' }}>
                <p className="servicios-modal-exito-icon">🎉</p>
                <h3 className="servicios-modal-exito-title">¡Servicio Agregado!</h3>
                <p className="servicios-modal-exito-desc" style={{ color: c.subtext }}>¡Bienvenido a TelNet Premium!</p>
              </div>
            ) : (
              <div className="servicios-agregar-content">
                <div className="servicios-promo-banner">
                  <p className="servicios-promo-label">🔥 OFERTA ESPECIAL</p>
                  <p className="servicios-promo-title">¡Primer mes 50% OFF!</p>
                  <p className="servicios-promo-desc">Al contratar antes del 31 de Julio</p>
                </div>
                {todoServicios.map((s, i) => {
                  const yaContratado = idsActivos.includes(s.id)
                  const esSeleccionado = servicioSeleccionado?.id === s.id
                  return (
                    <div key={i} className="servicios-servicio-option"
                      style={{ background: c.card, borderColor: esSeleccionado ? '#0288d1' : c.border, opacity: yaContratado ? 0.5 : 1, cursor: yaContratado ? 'not-allowed' : 'pointer' }}
                      onClick={() => !yaContratado && setServicioSeleccionado(s)}>
                      <div className="servicios-servicio-option-inner">
                        <div className="servicios-servicio-option-icon" style={{ background: darkMode ? s.color + '30' : s.bg }}>{s.icon}</div>
                        <div style={{ flex: 1 }}>
                          <p className="servicios-servicio-option-nombre" style={{ color: c.text }}>{s.nombre}</p>
                          <p className="servicios-servicio-option-desc" style={{ color: c.subtext }}>{s.desc}</p>
                          <p className="servicios-servicio-option-precio" style={{ color: s.color }}>
                            S/ {(s.precio * 0.5).toFixed(2)}
                            <span className="servicios-servicio-option-precio-old" style={{ color: c.subtext }}>S/ {s.precio.toFixed(2)}</span>
                            <span style={{ fontSize: '10px', color: c.subtext }}>/mes</span>
                          </p>
                        </div>
                        <div className="servicios-servicio-option-check"
                          style={{ borderColor: esSeleccionado ? '#0288d1' : c.border, background: esSeleccionado ? '#0288d1' : 'transparent' }}>
                          {yaContratado ? <span style={{ fontSize: '11px', color: '#2e7d32' }}>✓</span> :
                            esSeleccionado ? <span style={{ color: 'white', fontSize: '12px' }}>✓</span> : null}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <button className="servicios-contratar-btn"
                  style={{ background: servicioSeleccionado ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', cursor: servicioSeleccionado ? 'pointer' : 'not-allowed' }}
                  onClick={() => servicioSeleccionado && setShowConfirmAgregar(true)}>
                  Contratar Servicio →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal confirmar */}
      {showConfirmAgregar && servicioSeleccionado && (
        <div className="servicios-confirmar-overlay" onClick={() => setShowConfirmAgregar(false)}>
          <div className="servicios-modal" style={{ background: c.card }} onClick={e => e.stopPropagation()}>
            <div className="servicios-modal-header">
              <p className="servicios-modal-icon">{servicioSeleccionado.icon}</p>
              <h3 className="servicios-modal-title" style={{ color: c.text }}>Confirmar contratación</h3>
            </div>
            <div style={{ background: c.rowBg, borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
              {[
                { label: 'Servicio', value: servicioSeleccionado.nombre },
                { label: 'Plan', value: servicioSeleccionado.plan },
                { label: 'Primer mes', value: `S/ ${(servicioSeleccionado.precio * 0.5).toFixed(2)}` },
                { label: 'Precio regular', value: `S/ ${servicioSeleccionado.precio.toFixed(2)}/mes` },
              ].map((item, i) => (
                <div key={i} className="servicios-resumen-row" style={{ borderColor: c.border }}>
                  <p className="servicios-resumen-label-text" style={{ color: c.subtext }}>{item.label}</p>
                  <p className="servicios-resumen-value-text" style={{ color: c.text }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="servicios-modal-buttons">
              <button className="servicios-modal-cancel-btn"
                style={{ background: c.rowBg, borderColor: c.border, color: c.text }}
                onClick={() => setShowConfirmAgregar(false)}>Cancelar</button>
              <button className="servicios-modal-confirm-btn" onClick={confirmarAgregar}>✅ Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="servicios-bottom-nav" style={{ background: c.card, borderTop: `1px solid ${c.border}` }}>
        {[
          { icon: '🏠', label: 'Inicio', path: '/dashboard' },
          { icon: '📡', label: 'Monitoreo', path: '/monitoreo' },
          { icon: '📋', label: 'Servicios', path: '/servicios' },
          { icon: '👤', label: 'Cuenta', path: '/cuenta' },
        ].map((item, i) => (
          <button key={i} className="servicios-nav-btn" onClick={() => navigate(item.path)}>
            <span className="servicios-nav-icon">{item.icon}</span>
            <span className="servicios-nav-label" style={{ color: i === 2 ? '#0288d1' : c.subtext, fontWeight: i === 2 ? '700' : '400' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}