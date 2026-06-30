import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const notificaciones = [
  { id: 1, icon: '💳', titulo: '¡Paga antes del 2 de Julio!', desc: 'Tu factura de S/ 179.70 vence pronto.', tiempo: 'Hace 5 min', leida: false },
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
    accent: '#0288d1',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    rowBg: darkMode ? '#0d1b2e' : '#f8f9ff',
  }

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '70px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📡</div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px' }}>TelNet</h1>
              <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px' }}>CONEXIÓN SEGURA</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>{darkMode ? '☀️' : '🌙'}</button>
            <button onClick={() => setShowNotif(!showNotif)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              🔔
              {noLeidas > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ff1744', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{noLeidas}</span>}
            </button>
            <button onClick={() => navigate('/cuenta')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>👤</button>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Mis Servicios</h2>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>Gestiona tus servicios contratados</p>
        </div>
      </div>

      {/* Notificaciones */}
      {showNotif && (
        <div onClick={() => setShowNotif(false)} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.card, margin: '80px 15px 0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: c.text, fontSize: '16px', fontWeight: '700' }}>Notificaciones {noLeidas > 0 && <span style={{ background: '#ff1744', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', marginLeft: '6px' }}>{noLeidas}</span>}</h3>
              <button onClick={marcarTodasLeidas} style={{ background: 'none', border: 'none', color: c.accent, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Marcar todas leídas</button>
            </div>
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {notifs.map(n => (
                <div key={n.id} onClick={() => marcarLeida(n.id)} style={{ padding: '15px 20px', borderBottom: `1px solid ${c.border}`, background: n.leida ? 'transparent' : darkMode ? '#0d1b2e' : '#f0f7ff', cursor: 'pointer', display: 'flex', gap: '12px' }}>
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

      <div style={{ padding: '15px' }}>

        {/* Resumen */}
        <div style={{ background: darkMode ? 'linear-gradient(135deg, #0d1b2e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', borderRadius: '20px', padding: '20px', marginBottom: '15px', color: 'white', boxShadow: '0 8px 32px rgba(2,136,209,0.3)' }}>
          <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px', marginBottom: '5px' }}>RESUMEN MENSUAL</p>
          <p style={{ fontSize: '42px', fontWeight: '900', lineHeight: 1 }}>S/ {totalMes.toFixed(2)}<span style={{ fontSize: '14px', opacity: 0.8, fontWeight: '400' }}>/mes</span></p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '15px' }}>
            {[
              { label: 'Activos', value: activos, icon: '✅' },
              { label: 'Suspendidos', value: suspendidos, icon: '⏸️' },
              { label: 'Total', value: servicios.length, icon: '📋' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '18px' }}>{s.icon}</p>
                <p style={{ fontSize: '20px', fontWeight: '900' }}>{s.value}</p>
                <p style={{ fontSize: '10px', opacity: 0.8 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista servicios */}
        {servicios.map((s, i) => (
          <div key={i} style={{ background: c.card, borderRadius: '18px', padding: '15px', marginBottom: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
                <div style={{ width: '50px', height: '50px', background: darkMode ? s.color + '30' : s.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: c.text }}>{s.nombre}</p>
                  <p style={{ fontSize: '12px', color: c.subtext, marginTop: '2px' }}>{s.plan}</p>
                  <p style={{ fontSize: '16px', fontWeight: '900', color: s.color, marginTop: '4px' }}>S/ {s.precio.toFixed(2)}<span style={{ fontSize: '11px', fontWeight: '400', color: c.subtext }}>/mes</span></p>
                </div>
              </div>
              <span style={{ background: s.estado === 'Activo' ? '#e8f5e9' : '#ffebee', color: s.estado === 'Activo' ? '#2e7d32' : '#c62828', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>
                {s.estado === 'Activo' ? '✅' : '⏸️'} {s.estado}
              </span>
            </div>
            {s.estado === 'Activo' && (
              <div style={{ marginTop: '12px', padding: '10px 12px', background: c.rowBg, borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '12px', color: c.subtext }}>📅 Vence el</p>
                <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{s.vence}</p>
              </div>
            )}
            {s.estado === 'Suspendido' && (
              <button onClick={() => { setModalReactivar(s); setCodigo(''); setErrorCodigo('') }}
                style={{ marginTop: '12px', width: '100%', padding: '12px', background: `linear-gradient(135deg, ${s.color}, #0288d1)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                ⚡ Reactivar Servicio
              </button>
            )}
          </div>
        ))}

        {/* Botón agregar solo si faltan servicios */}
        {serviciosFaltantes.length > 0 && (
          <button onClick={() => setShowAgregar(true)}
            style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 8px 24px rgba(2,136,209,0.4)', marginTop: '5px' }}>
            ➕ Agregar Nuevo Servicio
          </button>
        )}
      </div>

      {/* Modal reactivar */}
      {modalReactivar && (
        <div onClick={() => setModalReactivar(null)} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: '24px', padding: '25px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            {exitoReactivar ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: '60px', marginBottom: '15px' }}>🎉</p>
                <h3 style={{ color: '#2e7d32', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>¡Servicio Reactivado!</h3>
                <p style={{ color: c.subtext, fontSize: '14px' }}>¡Gracias por tu pago! Tu servicio está activo.</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '50px', marginBottom: '10px' }}>{modalReactivar.icon}</div>
                  <h3 style={{ color: c.text, fontSize: '18px', fontWeight: '800' }}>Reactivar {modalReactivar.nombre}</h3>
                  <p style={{ color: c.subtext, fontSize: '13px', marginTop: '5px' }}>Ingresa el código que recibiste en tu correo</p>
                </div>
                <div style={{ background: darkMode ? '#0d47a130' : '#e3f2fd', borderRadius: '12px', padding: '12px', marginBottom: '15px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: c.accent, fontWeight: '600' }}>📧 Código enviado a: car***@email.com</p>
                </div>
                <input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ingresa tu código de activación"
                  style={{ width: '100%', padding: '14px', border: `2px solid ${errorCodigo ? '#c62828' : c.border}`, borderRadius: '12px', fontSize: '15px', background: c.card, color: c.text, outline: 'none', textAlign: 'center', letterSpacing: '3px', marginBottom: '8px' }} />
                {errorCodigo && <p style={{ color: '#c62828', fontSize: '12px', marginBottom: '10px' }}>{errorCodigo}</p>}
                <p style={{ fontSize: '11px', color: c.subtext, textAlign: 'center', marginBottom: '15px' }}>💡 Para esta demo cualquier código funciona</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setModalReactivar(null)} style={{ flex: 1, padding: '13px', background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancelar</button>
                  <button onClick={reactivar} style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>⚡ Activar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal agregar */}
      {showAgregar && (
        <div onClick={() => { setShowAgregar(false); setServicioSeleccionado(null) }} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 100, overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.bg, margin: '60px 15px 30px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ background: c.header, padding: '20px', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => { setShowAgregar(false); setServicioSeleccionado(null) }} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '6px 10px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>←</button>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Agregar Servicio</h2>
                  <p style={{ fontSize: '11px', opacity: 0.7 }}>Selecciona el servicio a contratar</p>
                </div>
              </div>
            </div>
            {exitoAgregar ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ fontSize: '60px', marginBottom: '15px' }}>🎉</p>
                <h3 style={{ color: '#2e7d32', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>¡Servicio Agregado!</h3>
                <p style={{ color: c.subtext, fontSize: '14px' }}>¡Bienvenido a TelNet Premium!</p>
              </div>
            ) : (
              <div style={{ padding: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #ff6f00, #ff8f00)', borderRadius: '15px', padding: '15px', marginBottom: '20px', color: 'white' }}>
                  <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>🔥 OFERTA ESPECIAL</p>
                  <p style={{ fontSize: '16px', fontWeight: '800' }}>¡Primer mes 50% OFF!</p>
                  <p style={{ fontSize: '12px', opacity: 0.9 }}>Al contratar antes del 31 de Julio</p>
                </div>
                {todoServicios.map((s, i) => {
                  const yaContratado = idsActivos.includes(s.id)
                  const esSeleccionado = servicioSeleccionado?.id === s.id
                  return (
                    <div key={i} onClick={() => !yaContratado && setServicioSeleccionado(s)}
                      style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '10px', border: `2px solid ${esSeleccionado ? c.accent : c.border}`, opacity: yaContratado ? 0.5 : 1, cursor: yaContratado ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: darkMode ? s.color + '30' : s.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{s.icon}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: '800', color: c.text }}>{s.nombre}</p>
                          <p style={{ fontSize: '12px', color: c.subtext }}>{s.desc}</p>
                          <p style={{ fontSize: '15px', fontWeight: '900', color: s.color, marginTop: '4px' }}>
                            S/ {(s.precio * 0.5).toFixed(2)}
                            <span style={{ fontSize: '11px', textDecoration: 'line-through', color: c.subtext, marginLeft: '6px' }}>S/ {s.precio.toFixed(2)}</span>
                            <span style={{ fontSize: '10px', color: c.subtext }}>/mes</span>
                          </p>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          {yaContratado ? (
                            <span style={{ fontSize: '11px', background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '10px', fontWeight: '700' }}>✅ Activo</span>
                          ) : (
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${esSeleccionado ? c.accent : c.border}`, background: esSeleccionado ? c.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {esSeleccionado && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <button onClick={() => setShowConfirmAgregar(true)} disabled={!servicioSeleccionado}
                  style={{ width: '100%', padding: '16px', background: servicioSeleccionado ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', color: 'white', border: 'none', borderRadius: '15px', fontSize: '15px', fontWeight: '800', cursor: servicioSeleccionado ? 'pointer' : 'not-allowed', marginTop: '10px' }}>
                  Contratar Servicio →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal confirmar */}
      {showConfirmAgregar && servicioSeleccionado && (
        <div onClick={() => setShowConfirmAgregar(false)} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: '24px', padding: '25px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '50px', marginBottom: '10px' }}>{servicioSeleccionado.icon}</p>
              <h3 style={{ color: c.text, fontSize: '18px', fontWeight: '800' }}>Confirmar contratación</h3>
            </div>
            <div style={{ background: c.rowBg, borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
              {[
                { label: 'Servicio', value: servicioSeleccionado.nombre },
                { label: 'Plan', value: servicioSeleccionado.plan },
                { label: 'Primer mes', value: `S/ ${(servicioSeleccionado.precio * 0.5).toFixed(2)}` },
                { label: 'Precio regular', value: `S/ ${servicioSeleccionado.precio.toFixed(2)}/mes` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
                  <p style={{ fontSize: '13px', color: c.subtext }}>{item.label}</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowConfirmAgregar(false)} style={{ flex: 1, padding: '13px', background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={confirmarAgregar} style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>✅ Confirmar</button>
            </div>
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
          <button key={i} onClick={() => navigate(item.path)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '5px 10px' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', color: i === 2 ? c.accent : c.subtext, fontWeight: i === 2 ? '700' : '400' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}