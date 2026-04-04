'use client'

import './TechStack.css'

const technologies = [
  { name: 'Angular', color: '#DD0031' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express', color: '#ffffff' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Prisma', color: '#2D3748' },
  { name: 'Three.js', color: '#ffffff' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Git', color: '#F05032' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Photoshop', color: '#31A8FF' },
  { name: 'Illustrator', color: '#FF9A00' },
  { name: 'WordPress', color: '#21759B' },
  { name: 'SEO', color: '#4CAF50' },
  { name: 'Google Analytics', color: '#E37400' },
]

export default function TechStack() {
  // Duplicate for seamless loop
  const items = [...technologies, ...technologies]

  return (
    <section className="tech-stack">
      <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <p className="section-label">Technologies</p>
        <h2 className="section-title" style={{ margin: '0 auto' }}>Our Tech Stack</h2>
      </div>
      <div className="tech-stack__track">
        <div className="tech-stack__scroll">
          {items.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className="tech-stack__item">
              <div className="tech-stack__icon" style={{ borderColor: `${tech.color}30`, color: tech.color }}>
                <span className="tech-stack__letter" style={{ color: tech.color }}>{tech.name.charAt(0)}</span>
              </div>
              <span className="tech-stack__name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
