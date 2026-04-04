'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BaseSelect from '@/src/components/common/BaseSelect/BaseSelect'

const projectTypes = [
  { value: 'Free SEO Audit', label: 'Free SEO Audit' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'SEO Campaigns', label: 'SEO Campaigns' },
  { value: 'IT Consulting', label: 'IT Consulting' },
]

const budgetRanges = [
  { value: '$1,000 - $5,000', label: '$1,000 – $5,000' },
  { value: '$5,000 - $10,000', label: '$5,000 – $10,000' },
  { value: '$10,000 - $30,000', label: '$10,000 – $30,000' },
  { value: '$30,000 - $100,000', label: '$30,000 – $100,000' },
  { value: '$100,000+', label: '$100,000+' },
]

export default function ContactForm() {
  const searchParams = useSearchParams()
  const [projectType, setProjectType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'seo-audit') {
      setProjectType('Free SEO Audit')
      setMessage("Hi! I'd like to request a free SEO audit for my website. Please let me know what information you need to get started.")
    }
  }, [searchParams])

  return (
    <div className="card" style={{ padding: 'var(--space-8)' }}>
      <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-6)' }}>Send a Message</h3>
      <form
        action="https://formsubmit.co/1d9e1703e1f21eb8c8eefda5a5936b32"
        method="POST"
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://codexmedia.io/contact?sent=true" />
        <input type="hidden" name="_template" value="box" />
        
        <BaseSelect 
          name="_subject" 
          label="Project Type" 
          options={projectTypes} 
          placeholder="What do you need help with?" 
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          required 
        />
        
        <div>
          <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Name</label>
          <input type="text" name="name" placeholder="Your name" className="input" required />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Email</label>
          <input type="email" name="email" placeholder="your@email.com" className="input" required />
        </div>
        
        <BaseSelect 
          name="budget" 
          label="Estimated Budget" 
          options={budgetRanges} 
          placeholder="Select budget range" 
        />
        
        <div>
          <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Message</label>
          <textarea 
            name="message" 
            placeholder="Tell us about your project..." 
            className="input" 
            style={{ minHeight: '120px', resize: 'vertical' }} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Send Message
        </button>
      </form>
    </div>
  )
}
