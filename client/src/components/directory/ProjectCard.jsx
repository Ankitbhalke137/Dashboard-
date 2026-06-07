export default function ProjectCard({ student }) {
  const techColors = {
    'React': 'text-cyan-400 border-cyan-400/30',
    'Node.js': 'text-green-400 border-green-400/30',
    'MongoDB': 'text-emerald-400 border-emerald-400/30',
    'TypeScript': 'text-blue-400 border-blue-400/30',
    'Python': 'text-yellow-400 border-yellow-400/30',
    'JavaScript': 'text-yellow-300 border-yellow-300/30',
    'Go': 'text-cyan-300 border-cyan-300/30',
    'Rust': 'text-orange-400 border-orange-400/30',
    'Solidity': 'text-purple-400 border-purple-400/30',
    'AWS': 'text-orange-300 border-orange-300/30',
    'Docker': 'text-blue-300 border-blue-300/30',
    'Kubernetes': 'text-indigo-400 border-indigo-400/30',
    'Flutter': 'text-sky-400 border-sky-400/30',
    'Firebase': 'text-amber-400 border-amber-400/30',
    'Tailwind CSS': 'text-teal-400 border-teal-400/30',
    'Figma': 'text-pink-400 border-pink-400/30',
    'TensorFlow': 'text-orange-500 border-orange-500/30',
    'PyTorch': 'text-red-400 border-red-400/30',
    'C++': 'text-blue-500 border-blue-500/30',
    'Java': 'text-red-500 border-red-500/30',
  };

  const defaultColor = 'text-gray-400 border-gray-400/30';

  return (
    <div className="relative bg-dark-600 rounded border border-gray-800 card-hover group">
      {student.isLeapxIntern && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-dark-500 text-neon-green text-xs font-bold px-3 py-1 rounded-full border border-neon-green animate-pulse-neon font-mono">
            [LEAPX INTERN]
          </div>
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
            alt={student.name}
            className="w-12 h-12 rounded-full border border-neon-green/30 bg-dark-700"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate font-mono text-sm">{student.name}</h3>
            {student.titles && student.titles.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {student.titles.slice(0, 3).map((title) => (
                  <span key={title._id} className="text-xs" title={title.name}>
                    {title.icon}
                  </span>
                ))}
                {student.titles.length > 3 && (
                  <span className="text-xs text-gray-500">+{student.titles.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-xs line-clamp-2 font-mono leading-relaxed">
            {student.about || 'No description available'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          {student.location && <span>📍 {student.location}</span>}
          {student.batch && <span>📅 {student.batch}</span>}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(student.techStack || []).slice(0, 5).map((tech) => (
            <span
              key={tech}
              className={`px-2 py-0.5 text-xs rounded border font-mono ${techColors[tech] || defaultColor}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
          {student.github && (
            <a href={student.github} target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors" title="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          {student.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {student.portfolio && (
            <a href={student.portfolio} target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-green transition-colors" title="Portfolio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            </a>
          )}
          <div className="flex-1" />
          <span className="text-xs text-gray-600 font-mono">{student.campus || ''}</span>
        </div>
      </div>
    </div>
  );
}
