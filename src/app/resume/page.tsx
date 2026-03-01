import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import ResumeViewer from '@/components/resume/ResumeViewer'

export const metadata: Metadata = {
  title: 'Resume — Vinay Krishnan',
  description: 'Resume of Vinay Krishnan, Senior Product Manager.',
}

export default function ResumePage() {
  return (
    <div className="pt-24 pb-24 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <p className="section-header mb-2">Resume</p>
          <h1 className="text-3xl font-black text-text-primary">Vinay Krishnan</h1>
          <p className="text-text-secondary mt-1 text-sm">Last updated Feb 2026</p>
        </div>
        <Button
          href="/Vinay_Krishnan_Resume.pdf"
          variant="primary"
          size="lg"
          target="_blank"
          download="Vinay_Krishnan_Resume.pdf"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </Button>
      </div>

      <ResumeViewer />
    </div>
  )
}
