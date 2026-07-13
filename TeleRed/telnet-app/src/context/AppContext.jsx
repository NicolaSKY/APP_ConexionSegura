import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

const usuariosData = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    avatar: '👤',
    cliente: 'Desde 2022',
    nivel: '⭐ Cliente Premium',
    direcciones: [
      { icon: '🏠', label: 'Casa Principal', dir: 'Av. Pardo 234, Miraflores', zona: 'Zona 1' },
      { icon: '🏢', label: 'Oficina', dir: 'Calle Los Olivos 567, San Isidro', zona: 'Zona 2' },
    ],
    señal: 'excelente',
    velocidad: 150,
    ping: 25,
    plan: 'Pack TelNet Premium',
  },
  {
    id: 2,
    nombre: 'María Torres',
    email: 'maria.torres@email.com',
    avatar: '👩',
    cliente: 'Desde 2023',
    nivel: '🔵 Cliente Básico',
    direcciones: [
      { icon: '🏠', label: 'Casa', dir: 'Av. Benavides 890, Surco', zona: 'Zona 3' },
    ],
    señal: 'baja',
    velocidad: 28,
    ping: 180,
    plan: 'Pack TelNet Básico',
  },
]

const estadosSeñalData = {
  excelente: { label: 'Excelente', color: '#4caf50', bg: '#e8f5e9', icon: '🟢', emoji: '😊', rango: '100-300 Mbps' },
  regular: { label: 'Regular', color: '#ff9800', bg: '#fff3e0', icon: '🟡', emoji: '😐', rango: '50-99 Mbps' },
  baja: { label: 'Baja', color: '#f44336', bg: '#ffebee', icon: '🔴', emoji: '😟', rango: '0-49 Mbps' },
}

const ticketsIniciales = [
  { id: '#2026-0525', tipo: 'Sin internet', direccion: 'Casa Principal - Miraflores', fecha: '25 Mayo 2026', estado: 'Abierto', prioridad: 'Alta', descripcion: 'El servicio de internet presenta intermitencias desde las 8am.', usuarioId: 1 },
  { id: '#2026-0524', tipo: 'Velocidad lenta', direccion: 'Oficina - San Isidro', fecha: '24 Mayo 2026', estado: 'Cerrado', prioridad: 'Media', descripcion: 'Velocidad por debajo del plan contratado durante la tarde.', usuarioId: 1 },
  { id: '#2026-0523', tipo: 'Cable TV sin señal', direccion: 'Casa Principal - Miraflores', fecha: '23 Mayo 2026', estado: 'Cerrado', prioridad: 'Baja', descripcion: 'Canales premium sin señal por mantenimiento programado.', usuarioId: 1 },
  { id: '#2026-0520', tipo: 'Señal muy baja', direccion: 'Casa - Surco', fecha: '20 Mayo 2026', estado: 'Abierto', prioridad: 'Alta', descripcion: 'La velocidad bajó a 28 Mbps cuando debería ser 150 Mbps.', usuarioId: 2 },
]

const serviciosIniciales = [
  // Carlos (usuarioId: 1)
  { icon: '🌐', nombre: 'Internet Fibra Óptica', plan: 'Plan 150 Mbps', estado: 'Activo', precio: 89.90, vence: '31 Jul 2026', color: '#1565c0', bg: '#e3f2fd', id: 'internet', usuarioId: 1 },
  { icon: '📺', nombre: 'Cable TV', plan: 'Plan Premium 120 canales', estado: 'Activo', precio: 59.90, vence: '31 Jul 2026', color: '#6a1b9a', bg: '#f3e5f5', id: 'cable', usuarioId: 1 },
  { icon: '📱', nombre: 'Telefonía Móvil', plan: 'Plan 20GB + Llamadas', estado: 'Suspendido', precio: 49.90, vence: '31 Jul 2026', color: '#c62828', bg: '#ffebee', id: 'movil', usuarioId: 1 },
  // María (usuarioId: 2)
  { icon: '🌐', nombre: 'Internet Fibra Óptica', plan: 'Plan 100 Mbps', estado: 'Activo', precio: 69.90, vence: '31 Jul 2026', color: '#1565c0', bg: '#e3f2fd', id: 'internet', usuarioId: 2 },
  { icon: '📞', nombre: 'Telefonía Fija', plan: 'Plan Ilimitado Local', estado: 'Activo', precio: 29.90, vence: '31 Jul 2026', color: '#2e7d32', bg: '#e8f5e9', id: 'fija', usuarioId: 2 },
]

const mensajesIniciales = [
  { de: 'bot', texto: '¡Hola! 👋 Soy el asistente virtual de TelNet. ¿En qué puedo ayudarte hoy?', hora: '10:25 AM' },
]

const historialPagosInicial = [
  { mes: 'Junio 2026', monto: 149.80, estado: 'Pagado', fecha: '02 Jun 2026' },
  { mes: 'Mayo 2026', monto: 149.80, estado: 'Pagado', fecha: '02 May 2026' },
  { mes: 'Abril 2026', monto: 149.80, estado: 'Pagado', fecha: '02 Abr 2026' },
]

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [usuarioActual, setUsuarioActual] = useState(usuariosData[0])
  const [tickets, setTickets] = useState(ticketsIniciales)
  const [servicios, setServicios] = useState(serviciosIniciales)
  const [mensajesChat, setMensajesChat] = useState(mensajesIniciales)
  const [agenteActivo, setAgenteActivo] = useState(false)
  const [puntos, setPuntos] = useState(500)
  const [historialPagos, setHistorialPagos] = useState(historialPagosInicial)
  const [historialCanjes, setHistorialCanjes] = useState([])
  const [señalResuelta, setSeñalResuelta] = useState(false)
  const [notificacionesSeñal, setNotificacionesSeñal] = useState([])
  const [notificacionesGlobales, setNotificacionesGlobales] = useState([])

  const agregarNotificacion = (notif) => {
    setNotificacionesGlobales(prev => [{
      id: Date.now(),
      leida: false,
      tiempo: 'Ahora mismo',
      ...notif,
    }, ...prev])
  }

  const marcarNotificacionLeida = (id) => {
    setNotificacionesGlobales(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  }

  const marcarTodasNotificacionesLeidas = () => {
    setNotificacionesGlobales(prev => prev.map(n => ({ ...n, leida: true })))
  }

  useEffect(() => {
    if (usuarioActual.señal === 'baja' && !señalResuelta) {
      const notif = {
        id: Date.now(),
        icon: '📶',
        titulo: '⚠️ Señal baja detectada',
        desc: `Tu velocidad cayó a ${usuarioActual.velocidad} Mbps. Estamos investigando el problema.`,
        tiempo: 'Ahora mismo',
        leida: false,
        tipo: 'señal_baja',
      }
      setNotificacionesSeñal([notif])
      agregarNotificacion(notif)
    }
  }, [usuarioActual.id, señalResuelta])

  const totalMensual = servicios
  .filter(s => s.estado === 'Activo' && s.usuarioId === usuarioActual.id)
  .reduce((acc, s) => acc + s.precio, 0)

  const fechaVencimiento = '31 Jul 2026'
  const fechaPago = '02 Ago 2026'

  const cambiarUsuario = (id) => {
    const user = usuariosData.find(u => u.id === id)
    if (user) {
      setUsuarioActual(user)
      setSeñalResuelta(false)
      setNotificacionesSeñal([])
    }
  }

  const resolverSeñal = () => {
    setUsuarioActual(prev => ({ ...prev, señal: 'excelente', velocidad: 150, ping: 25 }))
    setSeñalResuelta(true)
    const notif = {
      icon: '✅',
      titulo: '¡Señal restaurada!',
      desc: 'Tu velocidad volvió a 150 Mbps. El problema fue resuelto exitosamente.',
      leida: false,
      tipo: 'señal_ok',
    }
    setNotificacionesSeñal([notif])
    agregarNotificacion(notif)
    setTickets(prev => prev.map(t =>
      t.tipo === 'Señal muy baja' && t.usuarioId === usuarioActual.id
        ? { ...t, estado: 'Cerrado' }
        : t
    ))
  }

  const agregarTicket = (nuevoTicket) => {
    const id = `#2026-0${526 + tickets.length}`
    setTickets(prev => [{
      ...nuevoTicket,
      id,
      fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
      estado: 'Abierto',
      usuarioId: usuarioActual.id,
    }, ...prev])
  }

  const agregarServicio = (servicio) => {
    setServicios(prev => [...prev, { 
      ...servicio, 
      estado: 'Activo', 
      vence: fechaVencimiento,
      usuarioId: usuarioActual.id
    }])
    setHistorialPagos(prev => [{
      mes: `Julio 2026 (nuevo servicio)`,
      monto: servicio.precio * 0.5,
      estado: 'Pagado',
      fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
      nuevo: true,
    }, ...prev])
  }

  const reactivarServicio = (id) => {
    const servicio = servicios.find(s => s.id === id && s.usuarioId === usuarioActual.id)
    setServicios(prev => prev.map(s => 
      s.id === id && s.usuarioId === usuarioActual.id 
        ? { ...s, estado: 'Activo' } 
        : s
    ))
    if (servicio) {
      setHistorialPagos(prev => [{
        mes: 'Julio 2026 (reactivación)',
        monto: servicio.precio,
        estado: 'Pagado',
        fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
        reactivacion: true,
      }, ...prev])
    }
  }

  const agregarMensaje = (mensaje) => {
    setMensajesChat(prev => [...prev, mensaje])
  }

  const canjearPuntos = (premio) => {
    setPuntos(prev => prev - premio.puntos)
    setHistorialCanjes(prev => [{
      nombre: premio.nombre,
      puntos: premio.puntos,
      fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long' }),
      icon: premio.icon,
    }, ...prev])
  }

  const valor = {
    darkMode,
    setDarkMode,
    usuarios: usuariosData,
    usuarioActual,
    cambiarUsuario,
    estadosSeñal: estadosSeñalData,
    tickets,
    agregarTicket,
    servicios,
    agregarServicio,
    reactivarServicio,
    mensajesChat,
    agregarMensaje,
    agenteActivo,
    setAgenteActivo,
    puntos,
    canjearPuntos,
    historialCanjes,
    historialPagos,
    totalMensual,
    fechaVencimiento,
    fechaPago,
    señalResuelta,
    resolverSeñal,
    notificacionesSeñal,
    setNotificacionesSeñal,
    serviciosUsuario: servicios.filter(s => s.usuarioId === usuarioActual.id),
    ticketsUsuario: tickets.filter(t => t.usuarioId === usuarioActual.id),
    notificacionesGlobales,
    agregarNotificacion,
    marcarNotificacionLeida,
    marcarTodasNotificacionesLeidas,
  }

  return (
    <AppContext.Provider value={valor}>
      {children}
    </AppContext.Provider>
  )
}