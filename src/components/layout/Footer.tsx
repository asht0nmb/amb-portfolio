export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#faf9f6] border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Ashton Meyer Bibbins
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/asht0nmb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ashton-meyer-bibbins/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:ameyerbibbins@gmail.com"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
