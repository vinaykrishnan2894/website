export default function SystemDiagram() {
  const nodes = [
    {
      label: 'Player App',
      sublabel: 'Unity Client',
      color: 'border-accent-blue/40 bg-accent-blue/5',
      textColor: 'text-accent-blue',
    },
    {
      label: 'Real-time Server',
      sublabel: 'SmartFox Engine',
      color: 'border-accent-gold/40 bg-accent-gold/5',
      textColor: 'text-accent-gold',
    },
    {
      label: 'Game Engine',
      sublabel: '+ Persistence Layer',
      color: 'border-purple-400/40 bg-purple-400/5',
      textColor: 'text-purple-400',
    },
    {
      label: 'Admin Portal',
      sublabel: 'Control Plane',
      color: 'border-green-400/40 bg-green-400/5',
      textColor: 'text-green-400',
    },
  ]

  return (
    <div className="my-8">
      <p className="section-header mb-6">System Architecture</p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-3 sm:gap-2 w-full sm:w-auto">
            {/* Node box */}
            <div
              className={`flex-1 sm:flex-none border rounded-xl p-4 text-center min-w-[130px] ${node.color}`}
            >
              <div className={`font-bold text-sm ${node.textColor}`}>{node.label}</div>
              <div className="text-text-secondary text-xs mt-1">{node.sublabel}</div>
            </div>
            {/* Arrow (not after last) */}
            {i < nodes.length - 1 && (
              <div className="text-text-secondary/40 flex-shrink-0">
                <svg className="w-5 h-5 rotate-0 sm:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
