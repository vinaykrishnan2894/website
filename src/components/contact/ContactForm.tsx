'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Reaching out from vinaykrishnan.in`)
    const body = encodeURIComponent(
      `Hi Vinay,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    )
    window.location.href = `mailto:hello@vinaykrishnan.in?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full bg-white/5 border border-white/[0.06] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent-blue/40 focus:bg-white/[0.07] transition-all duration-200 text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jane Smith"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role / project..."
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>
      <Button type="submit" variant="primary" size="md" className="w-full">
        Send Message
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </Button>
    </form>
  )
}
