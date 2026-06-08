export default function Footer() {
  return (
    <footer className="text-center text-gray-600 text-xs py-4 border-t border-neon-green/10 mt-8 font-mono">
      <span className="neon-text opacity-50">[ college portal ]</span> &copy; {new Date().getFullYear()}
    </footer>
  );
}
