import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const respuestasBot = {
  'internet': '🌐 Entiendo que tienes problemas con tu internet. ¿Puedes decirme si el router tiene luces encendidas? Revisa que la luz de fibra esté en verde.',
  'velocidad': '🐌 Para problemas de velocidad te recomiendo:\n1. Reiniciar el router\n2. Verificar que no haya muchos dispositivos conectados\n3. Acercarte al router\n¿Ya intentaste reiniciarlo?',
  'cable': '📺 Para problemas con Cable TV verifica:\n1. Que el cable coaxial esté bien conectado\n2. Que el decodificador esté encendido\n3. Cambiar de canal para verificar si es general\n¿Cuántos canales no tienen señal?',
  'telefono': '📞 Para problemas con telefonía:\n1. Verifica que el cable esté conectado al puerto correcto\n2. Reinicia el router\n3. Prueba con otro teléfono\n¿Tienes tono al marcar?',
  'pago': '💳 Para consultas de pago puedes:\n1. Ver tu historial en Mi Cuenta\n2. Pagar desde la app\n3. Ir a cualquier agente TelNet\n¿Necesitas el número de cuenta para depósito?',
  'router': '🔄 Para reiniciar el router:\n1. Desconecta el cable de alimentación\n2. Espera 30 segundos\n3. Vuelve a conectar\n4. Espera 2 minutos\n¿El problema persiste después de reiniciar?',
  'plan': '📋 Tu plan actual es Pack TelNet Premium con 150 Mbps. Si deseas cambiar tu plan puedes hacerlo desde la sección Servicios. ¿Te gustaría conocer los planes disponibles?',
  'factura': '📄 Tu próxima factura es de S/ 179.70 con vencimiento el 2 de Julio 2026. ¿Necesitas ayuda para realizar el pago?',
  'contraseña': '🔒 Para cambiar tu contraseña ve a Mi Cuenta → Cambiar contraseña. Si olvidaste tu contraseña actual contáctanos para restablecerla.',
  'gracias': '😊 ¡Con gusto! Estoy aquí para ayudarte. ¿Hay algo más en que pueda asistirte?',
  'hola': '👋 ¡Hola de nuevo! ¿En qué puedo ayudarte hoy?',
  'default': '🤖 Entiendo tu consulta. Un agente especializado te contactará en menos de 5 minutos. También puedes llamarnos al 📞 0800-TELNET (gratuito).',
}

const opcionesRapidas = [
  { label: '🌐 Sin internet', texto: 'No tengo internet' },
  { label: '🐌 Velocidad lenta', texto: 'Mi velocidad está lenta' },
  { label: '📺 Sin señal TV', texto: 'No tengo señal en cable TV' },
  { label: '💳 Pago', texto: 'Tengo una consulta sobre mi pago' },
  { label: '🔄 Router', texto: 'Cómo reinicio el router' },
  { label: '📋 Mi plan', texto: 'Información sobre mi plan' },
]

export default function Soporte() {
  const navigate = useNavigate()
  const { darkMode, mensajesChat, agregarMensaje, agenteActivo, setAgenteActivo } = useApp()
  const [input, setInput] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)
  const bottomRef = useRef(null)

  const hora = () => new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajesChat, escribiendo])

  const obtenerRespuesta = (texto) => {
    const lower = texto.toLowerCase()
    for (const clave of Object.keys(respuestasBot)) {
      if (lower.includes(clave)) return respuestasBot[clave]
    }
    return respuestasBot.default
  }

  const enviar = (textoDirecto) => {
    const texto = textoDirecto || input
    if (!texto.trim()) return
    const horaActual = hora()

    agregarMensaje({ de: 'user', texto, hora: horaActual })
    setInput('')
    setEscribiendo(true)

    setTimeout(() => {
      setEscribiendo(false)
      const lower = texto.toLowerCase()

      if (lower.includes('agente') || lower.includes('humano') || lower.includes('persona')) {
        setAgenteActivo(true)
        agregarMensaje({ de: 'bot', texto: '🔄 Transfiriendo con un agente humano...', hora: hora() })
        setTimeout(() => {
          agregarMensaje({ de: 'sistema', texto: 'Carlos Quispe se ha unido al chat', hora: hora() })
          agregarMensaje({ de: 'agente', texto: '¡Hola Carlos! Soy Carlos Quispe, agente de soporte TelNet. Vi tu conversación, ¿en qué puedo ayudarte?', hora: hora() })
        }, 800)
      } else {
        agregarMensaje({ de: 'bot', texto: obtenerRespuesta(texto), hora: hora() })
      }
    }, 1200)
  }

  const limpiarChat = () => {
    setAgenteActivo(false)
  }

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    accent: '#0288d1',
    header: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)',
    chatBg: darkMode ? '#0d1525' : '#f0f4ff',
    botBubble: darkMode ? '#131929' : '#ffffff',
  }

  return (
    <div style={{ background: c.bg, height: '100vh', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '15px 20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate('/dashboard')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
            {agenteActivo ? '👨‍💼' : '🤖'}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '15px', fontWeight: '800' }}>{agenteActivo ? 'Carlos Quispe' : 'Asistente TelNet'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '7px', height: '7px', background: '#4caf50', borderRadius: '50%' }} />
              <p style={{ fontSize: '11px', opacity: 0.8 }}>{agenteActivo ? 'Agente en línea' : 'Bot activo · Respuesta inmediata'}</p>
            </div>
          </div>
          <button onClick={limpiarChat}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 10px', color: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
            🗑️ Limpiar
          </button>
        </div>
      </div>

      {/* Opciones rápidas */}
      <div style={{ background: c.card, padding: '10px 15px', borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
        <p style={{ fontSize: '10px', color: c.subtext, marginBottom: '7px', fontWeight: '600', letterSpacing: '1px' }}>CONSULTAS FRECUENTES</p>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {opcionesRapidas.map((op, i) => (
            <button key={i} onClick={() => enviar(op.texto)}
              style={{ background: darkMode ? '#0d1b2e' : '#f0f4ff', border: `1px solid ${c.accent}`, borderRadius: '20px', padding: '5px 12px', color: c.accent, fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', background: c.chatBg }}>

        {/* Fecha */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <span style={{ background: c.card, color: c.subtext, fontSize: '11px', padding: '4px 14px', borderRadius: '20px', border: `1px solid ${c.border}` }}>
            Hoy — {new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long' })}
          </span>
        </div>

        {mensajesChat.map((msg, i) => {

          if (msg.de === 'sistema') return (
            <div key={i} style={{ textAlign: 'center', marginBottom: '15px' }}>
              <span style={{ background: '#e3f2fd', color: '#1565c0', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', fontWeight: '600' }}>
                {msg.texto}
              </span>
            </div>
          )

          const esUser = msg.de === 'user'
          const esAgente = msg.de === 'agente'

          return (
            <div key={i} style={{ display: 'flex', justifyContent: esUser ? 'flex-end' : 'flex-start', marginBottom: '12px', alignItems: 'flex-end', gap: '8px' }}>
              {!esUser && (
                <div style={{ width: '32px', height: '32px', background: esAgente ? '#1565c0' : c.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>
                  {esAgente ? '👨‍💼' : '🤖'}
                </div>
              )}
              <div style={{ maxWidth: '75%' }}>
                {!esUser && (
                  <p style={{ fontSize: '10px', color: c.subtext, marginBottom: '4px', fontWeight: '600' }}>
                    {esAgente ? 'Carlos Quispe · Agente' : 'Asistente TelNet'}
                  </p>
                )}
                <div style={{
                  padding: '12px 15px',
                  borderRadius: esUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: esUser ? 'linear-gradient(135deg, #1a237e, #0288d1)' : c.botBubble,
                  color: esUser ? 'white' : c.text,
                  fontSize: '13px',
                  lineHeight: '1.6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: esUser ? 'none' : `1px solid ${c.border}`,
                  whiteSpace: 'pre-line',
                }}>
                  {msg.texto}
                </div>
                <p style={{ fontSize: '10px', color: c.subtext, marginTop: '4px', textAlign: esUser ? 'right' : 'left' }}>
                  {msg.hora} {esUser && '✓✓'}
                </p>
              </div>
              {esUser && (
                <div style={{ width: '32px', height: '32px', background: '#6a1b9a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>
                  👤
                </div>
              )}
            </div>
          )
        })}

        {/* Indicador escribiendo */}
        {escribiendo && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: c.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🤖</div>
            <div style={{ background: c.botBubble, border: `1px solid ${c.border}`, borderRadius: '18px 18px 18px 4px', padding: '14px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: '7px', height: '7px', background: c.subtext, borderRadius: '50%', animation: `bounce${j} 0.8s infinite alternate` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ background: c.card, padding: '12px 15px', borderTop: `1px solid ${c.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: darkMode ? '#0d1b2e' : '#f5f5f5', borderRadius: '25px', padding: '8px 15px', border: `1px solid ${c.border}` }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder="Escribe tu consulta..."
              style={{ flex: 1, background: 'none', border: 'none', fontSize: '14px', color: c.text, outline: 'none' }}
            />
            <span style={{ fontSize: '18px', cursor: 'pointer', opacity: 0.6 }}>😊</span>
          </div>
          <button onClick={() => enviar()}
            style={{ width: '46px', height: '46px', background: input.trim() ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', border: 'none', borderRadius: '50%', color: 'white', fontSize: '18px', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s', flexShrink: 0 }}>
            ➤
          </button>
        </div>
        <p style={{ fontSize: '10px', color: c.subtext, textAlign: 'center', marginTop: '8px' }}>
          Escribe <strong style={{ color: c.accent }}>"agente"</strong> para hablar con un humano
        </p>
      </div>

      <style>{`
        @keyframes bounce0 { from { transform: translateY(0); opacity: 0.4; } to { transform: translateY(-6px); opacity: 1; } }
        @keyframes bounce1 { 0% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-6px); opacity: 1; } 100% { transform: translateY(0); opacity: 0.4; } }
        @keyframes bounce2 { from { transform: translateY(-6px); opacity: 1; } to { transform: translateY(0); opacity: 0.4; } }
      `}</style>
    </div>
  )
}