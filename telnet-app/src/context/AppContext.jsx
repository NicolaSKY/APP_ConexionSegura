import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

const ticketsIniciales = [
  { id: '#2026-0525', tipo: 'Sin internet', direccion: 'Casa Principal - Miraflores', fecha: '25 Mayo 2026', estado: 'Abierto', prioridad: 'Alta', descripcion: 'El servicio de internet presenta intermitencias desde las 8am.' },
  { id: '#2026-0524', tipo: 'Velocidad lenta', direccion: 'Oficina - San Isidro', fecha: '24 Mayo 2026', estado: 'Cerrado', prioridad: 'Media', descripcion: 'Velocidad por debajo del plan contratado durante la tarde.' },
  { id: '#2026-0523', tipo: 'Cable TV sin señal', direccion: 'Casa Principal - Miraflores', fecha: '23 Mayo 2026', estado: 'Cerrado', prioridad: 'Baja', descripcion: 'Canales premium sin señal por mantenimiento programado.' },
]

const serviciosIniciales = [
  { icon: '🌐', nombre: 'Internet Fibra Óptica', plan: 'Plan 150 Mbps', estado: 'Activo', precio: 89.90, vence: '31 Jul 2026', color: '#1565c0', bg: '#e3f2fd', id: 'internet' },
  { icon: '📺', nombre: 'Cable TV', plan: 'Plan Premium 120 canales', estado: 'Activo', precio: 59.90, vence: '31 Jul 2026', color: '#6a1b9a', bg: '#f3e5f5', id: 'cable' },
  { icon: '📱', nombre: 'Telefonía Móvil', plan: 'Plan 20GB + Llamadas', estado: 'Suspendido', precio: 49.90, vence: '31 Jul 2026', color: '#c62828', bg: '#ffebee', id: 'movil' },
]

const mensajesIniciales = [
  { de: 'bot', texto: '¡Hola Carlos! 👋 Soy el asistente virtual de TelNet. ¿En qué puedo ayudarte hoy?', hora: '10:25 AM' },
]

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [tickets, setTickets] = useState(ticketsIniciales)
  const [servicios, setServicios] = useState(serviciosIniciales)
  const [mensajesChat, setMensajesChat] = useState(mensajesIniciales)
  const [agenteActivo, setAgenteActivo] = useState(false)

  const agregarTicket = (nuevoTicket) => {
    const id = `#2026-0${526 + tickets.length}`
    const ticket = {
      ...nuevoTicket,
      id,
      fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
      estado: 'Abierto',
    }
    setTickets(prev => [ticket, ...prev])
  }

  const agregarServicio = (servicio) => {
    setServicios(prev => [...prev, { ...servicio, estado: 'Activo', vence: '31 Ago 2026' }])
  }

  const reactivarServicio = (id) => {
    setServicios(prev => prev.map(s => s.id === id ? { ...s, estado: 'Activo' } : s))
  }

  const agregarMensaje = (mensaje) => {
    setMensajesChat(prev => [...prev, mensaje])
  }

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      tickets, agregarTicket,
      servicios, agregarServicio, reactivarServicio,
      mensajesChat, agregarMensaje,
      agenteActivo, setAgenteActivo,
    }}>
      {children}
    </AppContext.Provider>
  )
}