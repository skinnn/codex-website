import './TrustedByClients.css'

const clients = [
  { name: 'Vidoomy', placeholder: 'V' },
  { name: 'Intelligent Betting Software', placeholder: 'IBS' },
  { name: 'Shotcall', placeholder: 'S' },
  { name: 'Biciklica Dostava', placeholder: 'BD' },
]

export default function TrustedByClients() {
  return (
    <section className="trusted">
      <div className="container">
        <p className="trusted__label">Trusted By</p>
        <div className="trusted__grid">
          {clients.map((client) => (
            <div key={client.name} className="trusted__item">
              {/* TODO: Replace with real logos — task tracked for Nikola to provide */}
              <div className="trusted__logo-placeholder">{client.placeholder}</div>
              <span className="trusted__name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
