'use client'

export default function ResumeViewer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
      <object
        data="/Vinay_Krishnan_Resume.pdf"
        type="application/pdf"
        className="w-full"
        style={{ height: '80vh', minHeight: '600px' }}
        aria-label="Vinay Krishnan Resume PDF"
      >
        <div className="flex flex-col items-center justify-center h-64 gap-4 text-text-secondary">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>PDF preview not available in this browser.</p>
          <a
            href="/Vinay_Krishnan_Resume.pdf"
            download="Vinay_Krishnan_Resume.pdf"
            className="text-accent-blue hover:underline font-medium"
          >
            Download resume instead
          </a>
        </div>
      </object>
    </div>
  )
}
