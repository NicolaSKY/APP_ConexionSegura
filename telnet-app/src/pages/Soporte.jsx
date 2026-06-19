import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const mensajesIniciales = [
  { de: 'bot', texto: '¡Hola! Soy el asistente virtual de TelNet 👋 ¿En qué puedo ayudarte hoy?' },
]

export default function Soporte() {
  const navigate = useNavigate()
  const [mensajes, setMensajes] = useState(mensajesIniciales)
  const [input, setInput] = useState('')

  const respuestas = {
    'internet': 'Entiendo que tienes problemas con tu internet. ¿Puedes decirme si el router tiene luces encendidas? 🔴🟢',
    'velocidad': 'Para problemas de velocidad, te recomiendo reiniciar el router y esperar 2 minutos. ¿Lo has intentado?',
    'cable': 'Para problemas con Cable TV, verifica que el cable coaxial esté bien conectado. ¿Cuántos canales no tienes señal?',
    'telefono': 'Para problemas con telefonía, verifica que el cable esté conectado al puerto correcto del router.',
    'pago': 'Para consultas de pago, te conectaré con un agente humano. Un momento por favor... 👨‍💼',
    'default': 'Entiendo tu consulta. Un agente especializado te contactará en menos de 5 minutos. ¿Hay algo más en que pueda ayudarte? 😊',
  }

  const enviar = () => {
    if (!input.trim()) return
    const nuevo = { de: 'user', texto: input }
    const textoLower = input.toLowerCase()
    let respuesta = respuestas.default
    for (const clave of Object.keys(respuestas)) {
      if (textoLower.includes(clave)) { respuesta = respuestas[clave]; break }
    }
    setMensajes(prev => [...prev, nuevo, { de: 'bot', texto: respuesta }])
    setInput('')
  }

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0052cc, #0099ff)', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>←</button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>Soporte TelNet</h1>
              <p style={{ fontSize: '11px', opacity: 0.8 }}>🟢 En línea ahora</p>
            </div>
          </div>
          <span style={{ fontSize: '22px' }}>🎧</span>
        </div>
      </div>

      {/* Opciones rápidas */}
      <div style={{ padding: '12px 15px', background: 'white', borderBottom: '1px solid #eee' }}>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Consultas frecuentes:</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Sin internet', 'Velocidad lenta', 'Sin señal TV', 'Pago'].map((op, i) => (
            <button
              key={i}
              onClick={() => setInput(op)}
              style={{ padding: '6px 12px', background: '#f0f4ff', border: '1px solid #0052cc', borderRadius: '20px', color: '#0052cc', fontSize: '12px', cursor: 'pointer' }}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', paddingBottom: '80px' }}>
        {mensajes.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.de === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
            {msg.de === 'bot' && (
              <div style={{ width: '32px', height: '32px', background: '#0052cc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginRight: '8px', flexShrink: 0 }}>🤖</div>
            )}
            <div style={{ maxWidth: '75%', padding: '12px 15px', borderRadius: msg.de === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.de === 'user' ? '#0052cc' : 'white', color: msg.de === 'user' ? 'white' : '#333', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', background: 'white', padding: '12px 15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar()}
          placeholder="Escribe tu consulta..."
          style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '25px', fontSize: '13px', outline: 'none' }}
        />
        <button
          onClick={enviar}
          style={{ width: '44px', height: '44px', background: '#0052cc', border: 'none', borderRadius: '50%', color: 'white', fontSize: '18px', cursor: 'pointer' }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}