import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const premios = [
  {
    id: 1, icon: '🍔', nombre: 'Bembos', categoria: 'Comida',
    descripcion: 'Hamburguesa clásica + papas + bebida en cualquier local Bembos a nivel nacional.',
    puntos: 150, stock: 12, color: '#ff6f00', bg: '#fff3e0',
  },
  {
    id: 2, icon: '🎬', nombre: 'Entradas al Cine', categoria: 'Entretenimiento',
    descripcion: '2 entradas para cualquier película en Cineplanet o Cinemark. Válido para función 2D.',
    puntos: 200, stock: 8, color: '#6a1b9a', bg: '#f3e5f5',
  },
  {
    id: 3, icon: '📱', nombre: 'Sorteo iPhone 16', categoria: 'Sorteo',
    descripcion: 'Participa en el sorteo mensual de un iPhone 16 Pro. ¡Cada canje es un ticket!',
    puntos: 100, stock: 999, color: '#1565c0', bg: '#e3f2fd',
  },
  {
    id: 4, icon: '☕', nombre: 'Café Starbucks', categoria: 'Comida',
    descripcion: 'Bebida grande a elección en cualquier local Starbucks del Perú.',
    puntos: 80, stock: 20, color: '#2e7d32', bg: '#e8f5e9',
  },
  {
    id: 5, icon: '🎮', nombre: 'Gift Card Steam', categoria: 'Gaming',
    descripcion: 'Tarjeta de regalo Steam por S/ 30 para comprar juegos o contenido digital.',
    puntos: 250, stock: 5, color: '#0288d1', bg: '#e3f2fd',
  },
  {
    id: 6, icon: '🛒', nombre: 'Descuento en factura', categoria: 'Beneficio',
    descripcion: 'S/ 20 de descuento en tu próxima factura TelNet. Se aplica automáticamente.',
    puntos: 120, stock: 50, color: '#c62828', bg: '#ffebee',
  },
]

const categorias = ['Todos', 'Comida', 'Entretenimiento', 'Sorteo', 'Gaming', 'Beneficio']

export default function PuntosCanjeables() {
  const navigate = useNavigate()
  const { darkMode } = useApp()
  const [filtro, setFiltro] = useState('Todos')
  const [modalPremio, setModalPremio] = useState(null)
  const [canjeExito, setCanjeExito] = useState(false)
  const { puntos, canjearPuntos, historialCanjes } = useApp()

  const filtrados = filtro === 'Todos' ? premios : premios.filter(p => p.categoria === filtro)

  const canjear = (premio) => {
  canjearPuntos(premio)
  setCanjeExito(true)
  setTimeout(() => { setCanjeExito(false); setModalPremio(null) }, 2500)
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
    <div style={{ background: c.bg, minHeight: '100vh', paddingBottom: '30px', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ background: c.header, padding: '20px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => navigate('/cuenta')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Puntos TelNet</h1>
            <p style={{ fontSize: '11px', opacity: 0.7 }}>Canjea tus puntos por premios</p>
          </div>
        </div>

        {/* Card puntos */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '11px', opacity: 0.8, letterSpacing: '2px', marginBottom: '5px' }}>TUS PUNTOS DISPONIBLES</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '48px', fontWeight: '900', lineHeight: 1 }}>{puntos}</p>
              <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>⭐ puntos acumulados</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>Nivel</p>
              <span style={{ background: 'rgba(255,255,255,0.25)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '800' }}>
                🥇 Gold
              </span>
            </div>
          </div>

          {/* Barra progreso al siguiente nivel */}
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontSize: '11px', opacity: 0.7 }}>Progreso al nivel Platinum</p>
              <p style={{ fontSize: '11px', opacity: 0.7 }}>{puntos}/1000 pts</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px' }}>
              <div style={{ width: `${(puntos / 1000) * 100}%`, background: 'white', borderRadius: '10px', height: '8px', transition: 'width 0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Historial reciente */}
        {historialCanjes.length > 0 && (
          <div style={{ background: c.card, borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: c.text, marginBottom: '10px' }}>🕐 Canjes recientes</h3>
            {historialCanjes.slice(0, 3).map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < historialCanjes.slice(0, 3).length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{h.icon}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: c.text }}>{h.nombre}</p>
                    <p style={{ fontSize: '11px', color: c.subtext }}>{h.fecha}</p>
                  </div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#c62828' }}>-{h.puntos} pts</span>
              </div>
            ))}
          </div>
        )}

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '15px' }}>
          {categorias.map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)}
              style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '12px', background: filtro === cat ? c.accent : c.card, color: filtro === cat ? 'white' : c.subtext, whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Premios */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {filtrados.map((premio, i) => {
            const puedesCanjear = puntos >= premio.puntos
            return (
              <div key={i} onClick={() => puedesCanjear && setModalPremio(premio)}
                style={{ background: c.card, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: `1px solid ${c.border}`, cursor: puedesCanjear ? 'pointer' : 'not-allowed', opacity: puedesCanjear ? 1 : 0.6, transition: 'all 0.2s' }}>
                <div style={{ background: darkMode ? premio.color + '20' : premio.bg, padding: '20px', textAlign: 'center' }}>
                  <span style={{ fontSize: '36px' }}>{premio.icon}</span>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ fontSize: '13px', fontWeight: '800', color: c.text, marginBottom: '3px' }}>{premio.nombre}</p>
                  <p style={{ fontSize: '10px', color: c.subtext, marginBottom: '8px', lineHeight: '1.4' }}>{premio.descripcion.substring(0, 50)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: premio.color }}>⭐ {premio.puntos} pts</span>
                    <span style={{ fontSize: '10px', color: c.subtext }}>{premio.stock} disp.</span>
                  </div>
                  <div style={{ marginTop: '8px', padding: '7px', background: puedesCanjear ? premio.color : '#ccc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', fontWeight: '800', color: 'white' }}>{puedesCanjear ? 'Canjear' : 'Puntos insuficientes'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cómo ganar más puntos */}
        <div style={{ background: c.card, borderRadius: '18px', padding: '15px', marginTop: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: c.text, marginBottom: '12px' }}>💡 ¿Cómo ganar más puntos?</h3>
          {[
            { icon: '💳', label: 'Pagar a tiempo', puntos: '+50 pts' },
            { icon: '📅', label: 'Pago anticipado', puntos: '+30 pts' },
            { icon: '👥', label: 'Referir un amigo', puntos: '+100 pts' },
            { icon: '⭐', label: 'Completar tu perfil', puntos: '+20 pts' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <p style={{ fontSize: '13px', color: c.text, fontWeight: '600' }}>{item.label}</p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#2e7d32' }}>{item.puntos}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal canjear */}
      {modalPremio && (
        <div onClick={() => !canjeExito && setModalPremio(null)}
          style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '390px', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: c.card, borderRadius: '24px', padding: '25px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>

            {canjeExito ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: '60px', marginBottom: '15px' }}>🎉</p>
                <h3 style={{ color: '#2e7d32', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>¡Canje exitoso!</h3>
                <p style={{ color: c.subtext, fontSize: '14px' }}>Tu premio <strong>{modalPremio.nombre}</strong> fue canjeado. Recibirás instrucciones en tu correo.</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ background: darkMode ? modalPremio.color + '20' : modalPremio.bg, borderRadius: '20px', padding: '20px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '50px' }}>{modalPremio.icon}</span>
                  </div>
                  <h3 style={{ color: c.text, fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>{modalPremio.nombre}</h3>
                  <p style={{ color: c.subtext, fontSize: '13px', lineHeight: '1.5' }}>{modalPremio.descripcion}</p>
                </div>

                <div style={{ background: c.rowBg, borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${c.border}` }}>
                    <p style={{ fontSize: '13px', color: c.subtext }}>Tus puntos</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: c.text }}>⭐ {puntos} pts</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${c.border}` }}>
                    <p style={{ fontSize: '13px', color: c.subtext }}>Costo del canje</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#c62828' }}>-{modalPremio.puntos} pts</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <p style={{ fontSize: '13px', color: c.subtext }}>Puntos restantes</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#2e7d32' }}>⭐ {puntos - modalPremio.puntos} pts</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setModalPremio(null)}
                    style={{ flex: 1, padding: '13px', background: c.rowBg, border: `1px solid ${c.border}`, borderRadius: '12px', color: c.text, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                  <button onClick={() => canjear(modalPremio)}
                    style={{ flex: 2, padding: '13px', background: `linear-gradient(135deg, ${modalPremio.color}, #0288d1)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                    ⭐ Confirmar canje
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}