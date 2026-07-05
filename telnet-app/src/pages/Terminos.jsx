import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const secciones = [
  {
    titulo: '1. Aceptación de los Términos',
    contenido: `Al acceder y utilizar los servicios de TelNet — Conexión Segura ("TelNet", "nosotros", "nuestro"), usted acepta estar vinculado por estos Términos y Condiciones de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.

Estos términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el servicio. El uso continuado de nuestros servicios después de cualquier modificación constituye su aceptación de los nuevos términos.`,
  },
  {
    titulo: '2. Descripción del Servicio',
    contenido: `TelNet ofrece servicios de telecomunicaciones que incluyen:

- Internet de fibra óptica con velocidades de hasta 300 Mbps
- Telefonía fija con llamadas ilimitadas locales
- Cable TV con más de 120 canales en HD
- Telefonía móvil con planes de datos 4G LTE

La disponibilidad del servicio puede variar según la zona geográfica del usuario. TelNet se reserva el derecho de modificar, suspender o discontinuar cualquier parte del servicio en cualquier momento.`,
  },
  {
    titulo: '3. Registro y Cuenta de Usuario',
    contenido: `Para acceder a ciertos servicios, deberá crear una cuenta proporcionando información precisa, completa y actualizada. Usted es responsable de:

- Mantener la confidencialidad de su contraseña
- Todas las actividades que ocurran bajo su cuenta
- Notificar inmediatamente a TelNet sobre cualquier uso no autorizado
- Asegurarse de que su información de contacto esté actualizada

TelNet no será responsable por pérdidas derivadas del uso no autorizado de su cuenta cuando usted no haya cumplido con estas obligaciones.`,
  },
  {
    titulo: '4. Facturación y Pagos',
    contenido: `Los servicios de TelNet se facturan mensualmente. Al contratar nuestros servicios usted acepta:

- Pagar puntualmente antes de la fecha de vencimiento indicada
- Los cargos por reconexión en caso de suspensión por falta de pago (S/ 25.00)
- Que los precios pueden ajustarse con previo aviso de 30 días
- Que el primer mes puede tener condiciones especiales de precio

El incumplimiento de pago por más de 30 días puede resultar en la suspensión del servicio. Por más de 60 días puede resultar en la resolución del contrato.`,
  },
  {
    titulo: '5. Uso Aceptable del Servicio',
    contenido: `Usted acepta no utilizar el servicio para:

- Actividades ilegales o que violen derechos de terceros
- Distribuir malware, virus o código malicioso
- Realizar actividades de spam o phishing
- Intentar acceder sin autorización a sistemas informáticos
- Reproducir, distribuir o transmitir contenido con derechos de autor sin autorización
- Sobrecargar intencionalmente la red en perjuicio de otros usuarios

El incumplimiento de estas normas puede resultar en la suspensión inmediata del servicio sin derecho a reembolso.`,
  },
  {
    titulo: '6. Privacidad y Protección de Datos',
    contenido: `TelNet recopila y procesa datos personales de conformidad con la Ley N° 29733 — Ley de Protección de Datos Personales del Perú. Los datos recopilados incluyen:

- Información de identificación personal
- Datos de uso y tráfico de red (anonimizados)
- Información de facturación y pagos
- Datos de dispositivos conectados a la red

No vendemos ni compartimos su información personal con terceros sin su consentimiento, salvo requerimiento legal. Puede solicitar la eliminación de sus datos contactando a privacidad@telnet.pe`,
  },
  {
    titulo: '7. Garantía y Nivel de Servicio (SLA)',
    contenido: `TelNet garantiza una disponibilidad del servicio del 99.5% mensual. En caso de interrupciones:

- Interrupciones menores a 4 horas: sin compensación
- Interrupciones entre 4 y 24 horas: descuento proporcional en factura
- Interrupciones mayores a 24 horas: crédito de 3 días de servicio
- Mantenimientos programados notificados con 48h de anticipación no aplican como interrupción

La garantía no aplica en casos de fuerza mayor, desastres naturales o fallas en infraestructura fuera del control de TelNet.`,
  },
  {
    titulo: '8. Resolución del Contrato',
    contenido: `El contrato puede resolverse:

POR EL CLIENTE:
- Con aviso previo de 30 días sin penalidad
- Inmediatamente en caso de incumplimiento grave por parte de TelNet

POR TELNET:
- Por falta de pago mayor a 60 días
- Por uso indebido del servicio
- Por violación de estos términos y condiciones
- Con aviso previo de 30 días sin causa justificada

La resolución no exime al cliente del pago de facturas pendientes.`,
  },
  {
    titulo: '9. Limitación de Responsabilidad',
    contenido: `TelNet no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de ganancias, datos, uso, fondo de comercio u otras pérdidas intangibles resultantes de:

- El uso o la imposibilidad de usar el servicio
- Acceso no autorizado a sus transmisiones o datos
- Declaraciones o conductas de terceros en el servicio
- Cualquier otro asunto relacionado con el servicio

La responsabilidad máxima de TelNet no excederá el monto pagado en los últimos 3 meses de servicio.`,
  },
  {
    titulo: '10. Modificaciones y Ley Aplicable',
    contenido: `TelNet se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor 30 días después de su publicación en nuestra plataforma.

Estos términos se rigen por las leyes de la República del Perú. Cualquier disputa será sometida a la jurisdicción de los tribunales de Lima, Perú.

Para consultas sobre estos términos contacte a: legal@telnet.pe

Última actualización: 1 de Julio de 2026
Versión: 3.2`,
  },
]

export default function Terminos() {
  const navigate = useNavigate()
  const { darkMode } = useApp()
  const [seccionAbierta, setSeccionAbierta] = useState(null)
  const [aceptado, setAceptado] = useState(false)

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <button onClick={() => navigate('/cuenta')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📄</div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Términos y Condiciones</h1>
              <p style={{ fontSize: '11px', opacity: 0.7 }}>Versión 3.2 — 1 Jul 2026</p>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', backdropFilter: 'blur(10px)' }}>
          <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.5' }}>
            📋 Este documento establece los términos legales que rigen el uso de los servicios TelNet. Lee detenidamente antes de aceptar.
          </p>
        </div>
      </div>

      <div style={{ padding: '15px' }}>

        {/* Resumen rápido */}
        <div style={{ background: c.card, borderRadius: '18px', padding: '15px', marginBottom: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: c.text, marginBottom: '12px' }}>⚡ Resumen rápido</h3>
          {[
            { icon: '✅', texto: 'Servicio con 99.5% de disponibilidad garantizada' },
            { icon: '💳', texto: 'Facturación mensual con aviso de 30 días para cambios' },
            { icon: '🔒', texto: 'Tus datos protegidos bajo Ley N° 29733 del Perú' },
            { icon: '📞', texto: 'Cancelación con 30 días de aviso sin penalidad' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
              <p style={{ fontSize: '12px', color: c.subtext, lineHeight: '1.5' }}>{item.texto}</p>
            </div>
          ))}
        </div>

        {/* Secciones expandibles */}
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: c.text, marginBottom: '12px' }}>📑 Documento completo</h3>
        {secciones.map((sec, i) => (
          <div key={i} style={{ background: c.card, borderRadius: '15px', marginBottom: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: `1px solid ${seccionAbierta === i ? c.accent : c.border}`, transition: 'all 0.2s' }}>

            {/* Título */}
            <div onClick={() => setSeccionAbierta(seccionAbierta === i ? null : i)}
              style={{ padding: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: c.text, flex: 1, paddingRight: '10px' }}>{sec.titulo}</p>
              <span style={{ color: c.accent, fontSize: '18px', fontWeight: '700', flexShrink: 0, transition: 'transform 0.3s', transform: seccionAbierta === i ? 'rotate(180deg)' : 'none' }}>
                ⌄
              </span>
            </div>

            {/* Contenido */}
            {seccionAbierta === i && (
              <div style={{ padding: '0 15px 15px' }}>
                <div style={{ background: c.rowBg, borderRadius: '12px', padding: '15px', border: `1px solid ${c.border}` }}>
                  <p style={{ fontSize: '12px', color: c.subtext, lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                    {sec.contenido}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Aceptar términos */}
        <div style={{ background: c.card, borderRadius: '18px', padding: '20px', marginTop: '15px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: `1px solid ${c.border}` }}>
          <div onClick={() => setAceptado(!aceptado)}
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', marginBottom: '15px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${aceptado ? c.accent : c.border}`, background: aceptado ? c.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', transition: 'all 0.2s' }}>
              {aceptado && <span style={{ color: 'white', fontSize: '13px', fontWeight: '900' }}>✓</span>}
            </div>
            <p style={{ fontSize: '13px', color: c.text, lineHeight: '1.5' }}>
              He leído y acepto los <strong style={{ color: c.accent }}>Términos y Condiciones</strong> y la <strong style={{ color: c.accent }}>Política de Privacidad</strong> de TelNet.
            </p>
          </div>

          <button
            onClick={() => aceptado && navigate('/cuenta')}
            style={{ width: '100%', padding: '14px', background: aceptado ? 'linear-gradient(135deg, #1a237e, #0288d1)' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', cursor: aceptado ? 'pointer' : 'not-allowed', transition: 'all 0.3s' }}>
            {aceptado ? '✅ Confirmar aceptación' : 'Acepta los términos para continuar'}
          </button>
        </div>

        {/* Footer legal */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: c.subtext, marginTop: '15px', lineHeight: '1.6' }}>
          TelNet — Conexión Segura S.A.C.{'\n'}
          RUC: 20612345678{'\n'}
          Av. Javier Prado 1234, San Isidro, Lima — Perú{'\n'}
          legal@telnet.pe
        </p>
      </div>
    </div>
  )
}