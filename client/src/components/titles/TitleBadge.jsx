export default function TitleBadge({ title, size = 'sm' }) {
  if (!title) return null;

  const sizeClasses = {
    sm: 'text-sm w-6 h-6',
    md: 'text-xl w-8 h-8',
    lg: 'text-2xl w-10 h-10',
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeClasses[size] || sizeClasses.sm} rounded-full bg-dark-700 border border-gray-700 cursor-help`}
      title={title.name}
    >
      {title.icon}
    </span>
  );
}
