import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const tickets = [
  { id: '#2026-0525', tipo: 'Sin internet', zona: 'Zona 1 - Miraflores', fecha: '25 Mayo 2026', estado: 'Abierto', prioridad: 'Alta', descripcion: 'El servicio de internet presenta intermitencias desde las 8am.' },
  { id: '#2026-0524', tipo: 'Velocidad lenta', zona: 'Zona 2 - San Isidro', fecha: '24 Mayo 2026', estado: 'Cerrado', prioridad: 'Media', descripcion: 'Velocidad por debajo del plan contratado durante la tarde.' },
  { id: '#2026-0523', tipo: 'Cable TV sin señal', zona: 'Zona 1 - Miraflores', fecha: '23 Mayo 2026', estado: 'Cerrado', prioridad: 'Baja', descripcion: 'Canales premium sin señal por mantenimiento programado.' },
  { id: '#2026-0522', tipo: 'Telefonía sin tono', zona: 'Zona 3 - Surco', fecha: '20 Mayo 2026', estado: 'Cerrado', prioridad: 'Media', descripcion: 'Línea fija sin tono de marcado por 2 horas.' },
]

export default function Incidencias() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('Todos')
  const [ticketAbierto, setTicketAbierto] = useState(null)

  const filtrados = filtro === 'Todos' ? tickets : tickets.filter(t => t.estado === filtro)

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
        <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '15px', fontWeight: '700' }}>Mis Incidencias</h2>

        {/* Resumen */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff9800' }}>1</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Abiertos</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4caf50' }}>3</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Cerrados</p>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0052cc' }}>4</p>
            <p style={{ fontSize: '11px', color: '#666' }}>Total</p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          {['Todos', 'Abierto', 'Cerrado'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', background: filtro === f ? '#0052cc' : 'white', color: filtro === f ? 'white' : '#666', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lista de tickets */}
        {filtrados.map((ticket, i) => (
          <div
            key={i}
            onClick={() => setTicketAbierto(ticketAbierto === i ? null : i)}
            style={{ background: 'white', borderRadius: '15px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', cursor: 'pointer', borderLeft: `4px solid ${ticket.estado === 'Abierto' ? '#ff9800' : '#4caf50'}` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Ticket {ticket.id}</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#0052cc', marginTop: '3px' }}>{ticket.tipo}</p>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>📍 {ticket.zona}</p>
                <p style={{ fontSize: '11px', color: '#666' }}>📅 {ticket.fecha}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: ticket.estado === 'Abierto' ? '#fff3e0' : '#e8f5e9', color: ticket.estado === 'Abierto' ? '#e65100' : '#2e7d32', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                  {ticket.estado === 'Abierto' ? '⏳' : '✅'} {ticket.estado}
                </span>
                <p style={{ fontSize: '11px', marginTop: '6px', color: ticket.prioridad === 'Alta' ? '#c62828' : ticket.prioridad === 'Media' ? '#ff9800' : '#4caf50' }}>
                  Prioridad {ticket.prioridad}
                </p>
              </div>
            </div>

            {/* Detalle expandible */}
            {ticketAbierto === i && (
              <div style={{ marginTop: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '10px' }}>
                <p style={{ fontSize: '13px', color: '#444' }}>📝 {ticket.descripcion}</p>
                {ticket.estado === 'Abierto' && (
                  <button style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#0052cc', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Ver seguimiento
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Nuevo ticket */}
        <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0052cc, #0099ff)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
          ➕ Reportar Nueva Incidencia
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
            <span style={{ fontSize: '10px', color: '#666' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}