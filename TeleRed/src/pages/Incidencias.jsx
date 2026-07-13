import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Incidencias() {
  const navigate = useNavigate()
  const { darkMode, ticketsUsuario } = useApp()
  const [filtro, setFiltro] = useState('Todos')
  const [ticketAbierto, setTicketAbierto] = useState(null)

  const filtrados = filtro === 'Todos' ? ticketsUsuario : ticketsUsuario.filter(t => t.estado === filtro)
  const abiertos = ticketsUsuario.filter(t => t.estado === 'Abierto').length
  const cerrados = ticketsUsuario.filter(t => t.estado === 'Cerrado').length

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    accent: '#0288d1',
  }

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '70px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📡</div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px' }}>TeleRed</h1>
            <p style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '2px' }}>CONEXIÓN SEGURA</p>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Mis Incidencias</h2>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>Gestiona tus tickets de soporte</p>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Resumen */}
        <div style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#ff9800' }}>{abiertos}</p>
            <p style={{ fontSize: '11px', color: c.subtext, fontWeight: '600' }}>Abiertos</p>
          </div>
          <div style={{ width: '1px', background: c.border }} />
          <div>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#4caf50' }}>{cerrados}</p>
            <p style={{ fontSize: '11px', color: c.subtext, fontWeight: '600' }}>Cerrados</p>
          </div>
          <div style={{ width: '1px', background: c.border }} />
          <div>
            <p style={{ fontSize: '32px', fontWeight: '900', color: c.accent }}>{tickets.length}</p>
            <p style={{ fontSize: '11px', color: c.subtext, fontWeight: '600' }}>Total</p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          {['Todos', 'Abierto', 'Cerrado'].map(f => (
            <button key={f} onClick={() => setFiltro(f)}
              style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '12px', background: filtro === f ? c.accent : c.card, color: filtro === f ? 'white' : c.subtext, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Lista tickets */}
        {filtrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: c.subtext }}>
            <p style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</p>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>No hay tickets {filtro === 'Abierto' ? 'abiertos' : 'cerrados'}</p>
          </div>
        ) : (
          filtrados.map((ticket, i) => (
            <div key={i} onClick={() => setTicketAbierto(ticketAbierto === i ? null : i)}
              style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', cursor: 'pointer', borderLeft: `4px solid ${ticket.estado === 'Abierto' ? '#ff9800' : '#4caf50'}`, transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: c.accent }}>Ticket {ticket.id}</p>
                    <span style={{ fontSize: '11px', color: ticket.prioridad === 'Alta' ? '#ff1744' : ticket.prioridad === 'Media' ? '#ff9800' : '#4caf50', background: ticket.prioridad === 'Alta' ? '#ffebee' : ticket.prioridad === 'Media' ? '#fff3e0' : '#e8f5e9', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                      {ticket.prioridad}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: c.text, marginBottom: '4px' }}>{ticket.tipo}</p>
                  <p style={{ fontSize: '12px', color: c.subtext }}>📍 {ticket.direccion}</p>
                  <p style={{ fontSize: '12px', color: c.subtext }}>📅 {ticket.fecha}</p>
                </div>
                <span style={{ background: ticket.estado === 'Abierto' ? '#fff3e0' : '#e8f5e9', color: ticket.estado === 'Abierto' ? '#e65100' : '#2e7d32', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>
                  {ticket.estado === 'Abierto' ? '⏳' : '✅'} {ticket.estado}
                </span>
              </div>

              {/* Detalle expandible */}
              {ticketAbierto === i && (
                <div style={{ marginTop: '12px', padding: '12px', background: darkMode ? '#0d1b2e' : '#f9f9f9', borderRadius: '10px' }}>
                  <p style={{ fontSize: '13px', color: c.text, marginBottom: '10px' }}>📝 {ticket.descripcion}</p>
                  {ticket.estado === 'Abierto' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ flex: 1, padding: '10px', background: c.accent, color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                        Ver seguimiento
                      </button>
                      <button style={{ flex: 1, padding: '10px', background: '#ffebee', color: '#c62828', border: '1px solid #c62828', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                        Cancelar ticket
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {/* Botón reportar */}
        <button onClick={() => navigate('/reportar')}
          style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', marginTop: '5px', boxShadow: '0 8px 24px rgba(2,136,209,0.4)' }}>
          ➕ Reportar Nueva Incidencia
        </button>
      </div>

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
            <span style={{ fontSize: '10px', color: c.subtext, fontWeight: '400' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}