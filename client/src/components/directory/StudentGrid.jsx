import ProjectCard from './ProjectCard';

export default function StudentGrid({ students }) {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500 text-lg font-mono">&gt; No students match the current filters</div>
        <div className="text-gray-600 text-sm mt-2 font-mono">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student) => (
        <ProjectCard key={student._id} student={student} />
      ))}
    </div>
  );
}
