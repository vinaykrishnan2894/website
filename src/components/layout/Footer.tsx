import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-primary mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © 2026 Vinay Krishnan
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/vinay-krishnan28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-blue transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-blue transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@vinaykrishnan.in"
              className="text-text-secondary hover:text-accent-blue transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
