import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const direcciones = [
  { label: '🏠 Casa Principal', value: 'Casa Principal - Miraflores' },
  { label: '🏢 Oficina', value: 'Oficina - San Isidro' },
]

const tiposProblema = [
  { icon: '🌐', label: 'Sin internet' },
  { icon: '🐌', label: 'Velocidad lenta' },
  { icon: '📺', label: 'Cable TV sin señal' },
  { icon: '📞', label: 'Telefonía sin tono' },
  { icon: '🔄', label: 'Intermitencia' },
  { icon: '📶', label: 'Señal débil' },
]

const prioridades = [
  { label: '🔴 Alta', value: 'Alta' },
  { label: '🟡 Media', value: 'Media' },
  { label: '🟢 Baja', value: 'Baja' },
]

export default function ReportarIncidencia() {
  const navigate = useNavigate()
  const { darkMode, agregarTicket } = useApp()
  const [paso, setPaso] = useState(1)
  const [direccion, setDireccion] = useState('')
  const [tipo, setTipo] = useState('')
  const [prioridad, setPrioridad] = useState('Media')
  const [descripcion, setDescripcion] = useState('')
  const [enviado, setEnviado] = useState(false)

  const c = {
    bg: darkMode ? '#0a0f1e' : '#f0f4ff',
    card: darkMode ? '#131929' : '#ffffff',
    text: darkMode ? '#e8eaf6' : '#1a1a2e',
    subtext: darkMode ? '#8892b0' : '#666',
    border: darkMode ? '#1e2d4a' : '#e8e8e8',
    accent: '#0288d1',
  }

  const enviar = () => {
    agregarTicket({ tipo, direccion, prioridad, descripcion: descripcion || `Problema reportado: ${tipo} en ${direccion}` })
    setEnviado(true)
    setTimeout(() => navigate('/incidencias'), 2500)
  }

  if (enviado) return (
    <div style={{ background: c.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <div style={{ fontSize: '70px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ color: c.text, fontSize: '22px', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>¡Ticket creado!</h2>
      <p style={{ color: c.subtext, textAlign: 'center', fontSize: '14px' }}>Tu incidencia fue reportada exitosamente. Te redirigiremos en un momento...</p>
    </div>
  )

  return (
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '30px' }}>

      {/* Header */}
      <div style={{ background: darkMode ? 'linear-gradient(135deg, #0a0f1e, #1a237e)' : 'linear-gradient(135deg, #1a237e, #0288d1)', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <button onClick={() => navigate('/incidencias')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800' }}>Reportar Incidencia</h1>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>Paso {paso} de 3</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '6px' }}>
          <div style={{ background: 'white', borderRadius: '10px', height: '6px', width: `${(paso / 3) * 100}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ padding: '20px' }}>

        {/* PASO 1 — Dirección */}
        {paso === 1 && (
          <div>
            <h2 style={{ color: c.text, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>¿En qué dirección tienes el problema?</h2>
            <p style={{ color: c.subtext, fontSize: '13px', marginBottom: '20px' }}>Selecciona la ubicación afectada</p>
            {direcciones.map((d, i) => (
              <div key={i} onClick={() => setDireccion(d.value)}
                style={{ background: c.card, border: `2px solid ${direccion === d.value ? c.accent : c.border}`, borderRadius: '15px', padding: '18px', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: c.text }}>{d.label}</p>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${direccion === d.value ? c.accent : c.border}`, background: direccion === d.value ? c.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {direccion === d.value && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                </div>
              </div>
            ))}
            <button onClick={() => setPaso(2)} disabled={!direccion}
              style={{ width: '100%', padding: '15px', background: direccion ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: direccion ? 'pointer' : 'not-allowed', marginTop: '10px' }}>
              Siguiente →
            </button>
          </div>
        )}

        {/* PASO 2 — Tipo de problema */}
        {paso === 2 && (
          <div>
            <h2 style={{ color: c.text, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>¿Qué tipo de problema tienes?</h2>
            <p style={{ color: c.subtext, fontSize: '13px', marginBottom: '20px' }}>Selecciona el problema y su prioridad</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {tiposProblema.map((t, i) => (
                <div key={i} onClick={() => setTipo(t.label)}
                  style={{ background: c.card, border: `2px solid ${tipo === t.label ? c.accent : c.border}`, borderRadius: '15px', padding: '15px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <p style={{ fontSize: '28px', marginBottom: '6px' }}>{t.icon}</p>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: c.text }}>{t.label}</p>
                </div>
              ))}
            </div>

            <p style={{ color: c.text, fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Prioridad</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {prioridades.map((p, i) => (
                <button key={i} onClick={() => setPrioridad(p.value)}
                  style={{ flex: 1, padding: '10px', background: prioridad === p.value ? c.accent : c.card, border: `2px solid ${prioridad === p.value ? c.accent : c.border}`, borderRadius: '10px', color: prioridad === p.value ? 'white' : c.text, fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPaso(1)}
                style={{ flex: 1, padding: '15px', background: c.card, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={() => setPaso(3)} disabled={!tipo}
                style={{ flex: 2, padding: '15px', background: tipo ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: tipo ? 'pointer' : 'not-allowed' }}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 — Descripción y confirmación */}
        {paso === 3 && (
          <div>
            <h2 style={{ color: c.text, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Detalles adicionales</h2>
            <p style={{ color: c.subtext, fontSize: '13px', marginBottom: '20px' }}>Opcional — ayúdanos a entender mejor el problema</p>

            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describe el problema con más detalle... ej: El internet se cae cada 30 minutos desde ayer en la noche."
              style={{ width: '100%', padding: '15px', border: `2px solid ${c.border}`, borderRadius: '15px', fontSize: '14px', background: c.card, color: c.text, minHeight: '120px', resize: 'none', outline: 'none', marginBottom: '20px' }}
            />

            {/* Resumen */}
            <div style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '20px', border: `1px solid ${c.border}` }}>
              <p style={{ color: c.text, fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>📋 Resumen del ticket</p>
              {[
                { label: 'Dirección', value: direccion },
                { label: 'Problema', value: tipo },
                { label: 'Prioridad', value: prioridad },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? `1px solid ${c.border}` : 'none' }}>
                  <p style={{ fontSize: '13px', color: c.subtext }}>{item.label}</p>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: c.text }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPaso(2)}
                style={{ flex: 1, padding: '15px', background: c.card, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={enviar}
                style={{ flex: 2, padding: '15px', background: 'linear-gradient(135deg, #1a237e, #0288d1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                ✅ Enviar ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}