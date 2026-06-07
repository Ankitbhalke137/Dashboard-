import ProjectCard from './ProjectCard';

export default function StudentGrid({ students }) {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl opacity-30">📡</span>
          <div className="text-on-surface-variant font-mono text-sm">No signals detected</div>
          <div className="text-outline text-xs font-mono">Adjust filters to scan again</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student, idx) => (
        <ProjectCard key={student._id} student={student} index={idx} />
      ))}
    </div>
  );
}
