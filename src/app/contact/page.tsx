import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Vinay Krishnan',
  description:
    'Get in touch with Vinay Krishnan. Open to Senior PM roles — Remote or Bangalore.',
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Info */}
        <div className="space-y-8">
          <div>
            <p className="section-header mb-3">Contact</p>
            <h1 className="text-4xl font-black text-text-primary mb-4">
              Let&apos;s Talk
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-md">
              Open to Senior PM roles — Remote or Bangalore. If you&apos;re building
              something complex and ambitious, I&apos;d love to hear about it.
            </p>
          </div>

          <Badge variant="green" className="text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
            Available from March 2026
          </Badge>

          <div className="space-y-4">
            <a
              href="mailto:hello@vinaykrishnan.in"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/[0.06] hover:border-accent-blue/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/20 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-text-secondary text-xs mb-0.5">Email</div>
                <div className="text-text-primary font-medium text-sm group-hover:text-accent-blue transition-colors">
                  hello@vinaykrishnan.in
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/vinay-krishnan28"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/[0.06] hover:border-accent-blue/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/20 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-text-secondary text-xs mb-0.5">LinkedIn</div>
                <div className="text-text-primary font-medium text-sm group-hover:text-accent-blue transition-colors">
                  linkedin.com/in/vinay-krishnan28
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-text-secondary text-xs mb-0.5">Location</div>
                <div className="text-text-primary font-medium text-sm">
                  Bangalore, India (open to remote)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
