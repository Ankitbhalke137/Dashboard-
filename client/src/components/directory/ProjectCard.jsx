const gradients = [
  'from-cyan-500/30 via-blue-500/20 to-transparent',
  'from-purple-500/30 via-pink-500/20 to-transparent',
  'from-emerald-500/30 via-teal-500/20 to-transparent',
  'from-orange-500/30 via-red-500/20 to-transparent',
  'from-indigo-500/30 via-violet-500/20 to-transparent',
  'from-rose-500/30 via-pink-500/20 to-transparent',
];

const techTagColors = {
  'React': 'text-[#61dafb] border-[#61dafb]/30',
  'Node.js': 'text-[#339933] border-[#339933]/30',
  'MongoDB': 'text-[#47A248] border-[#47A248]/30',
  'TypeScript': 'text-[#3178C6] border-[#3178C6]/30',
  'Python': 'text-[#3776AB] border-[#3776AB]/30',
  'JavaScript': 'text-[#F7DF1E] border-[#F7DF1E]/30',
  'C++': 'text-[#00599C] border-[#00599C]/30',
  'Rust': 'text-[#DEA584] border-[#DEA584]/30',
  'Go': 'text-[#00ADD8] border-[#00ADD8]/30',
  'Solidity': 'text-[#363636] border-[#363636]/30',
  'AWS': 'text-[#FF9900] border-[#FF9900]/30',
  'Docker': 'text-[#2496ED] border-[#2496ED]/30',
  'Kubernetes': 'text-[#326CE5] border-[#326CE5]/30',
  'Flutter': 'text-[#02569B] border-[#02569B]/30',
  'Firebase': 'text-[#FFCA28] border-[#FFCA28]/30',
  'Tailwind CSS': 'text-[#06B6D4] border-[#06B6D4]/30',
  'TensorFlow': 'text-[#FF6F00] border-[#FF6F00]/30',
  'PyTorch': 'text-[#EE4C2C] border-[#EE4C2C]/30',
  'Figma': 'text-[#F24E1E] border-[#F24E1E]/30',
};

export default function ProjectCard({ student, index = 0 }) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="glass-card rounded-xl overflow-hidden group">
      <div className={`relative h-20 bg-gradient-to-br ${gradient}`}>
        {student.isLeapxIntern && (
          <div className="absolute top-3 right-3 tier-badge tier-platinum z-10 text-[10px]">
            LEAPX PLATINUM
          </div>
        )}
        {!student.isLeapxIntern && student.techStack?.includes('Python') && (
          <div className="absolute top-3 right-3 tier-badge tier-gold z-10 text-[10px]">
            LEAPX GOLD
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="relative -mt-10 mb-3 flex items-end gap-3">
          <img
            src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
            alt={student.name}
            className="w-16 h-16 rounded-xl border-4 border-surface bg-surface-low object-cover"
          />
          <div className="flex gap-0.5 pb-1">
            <span className="text-xs" title="Workspace Premium">⭐</span>
            <span className="text-xs" title="Terminal">💻</span>
            <span className="text-xs" title="Psychology">🧠</span>
          </div>
        </div>

        <h3 className="text-base font-mono font-semibold text-on-surface">{student.name}</h3>
        <p className="text-xs font-mono text-on-surface-variant mt-0.5">
          {student.about?.split(' ').slice(0, 8).join(' ') || 'Student'}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {(student.techStack || []).slice(0, 4).map((tech) => (
            <span key={tech} className={`tech-tag ${techTagColors[tech] || 'text-on-surface-variant border-white/10'}`}>
              {tech}
            </span>
          ))}
          {(student.techStack?.length || 0) > 4 && (
            <span className="tech-tag text-on-surface-variant">+{student.techStack.length - 4}</span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
          {student.github && (
            <a href={student.github} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors" title="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          {student.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors" title="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {student.portfolio && (
            <a href={student.portfolio} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors" title="Portfolio">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            </a>
          )}
          <div className="flex-1" />
          <button className="text-[10px] font-mono text-primary-container border border-primary-container/30 px-2.5 py-1 rounded-md hover:bg-primary-container/10 transition-all opacity-0 group-hover:opacity-100">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
