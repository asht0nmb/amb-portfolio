"use client";

export default function Hero() {
  return (
    <section className="relative flex h-[60vh] items-center justify-center px-6 bg-white font-sans">
      <div className="inline-flex flex-col md:flex-row items-start md:items-center gap-12">
        <div className="flex flex-col items-start">
        <span className="text-xl text-gray-600 mb-0">
        {"Hi, I'm"}
        </span>
          <span className="text-8xl md:text-8.5xl font-semibold text-gray-900 leading-[0.9]">
            Ashton
          </span>
          <span className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">
            Meyer-Bibbins
          </span>
        </div>

    <p className="text-lg text-gray-600 max-w-md">
    {"I'm a business & data-science student studying at the University of Washington. I'm passionate about creative UI design, photography, and any or all new experiences. This is a space where I get to experiment, showcase a few photos, and highlight a project or two :)"}
    </p>

      </div>
    </section>
  );
}
