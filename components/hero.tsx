"use client"

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
      <div className="absolute inset-0 overflow-hidden">
        {/* Cyan glow element */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        {/* Magenta glow element */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-magenta-500/20 blur-3xl animate-pulse" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(100,200,255,.05)_25%,rgba(100,200,255,.05)_26%,transparent_27%,transparent_74%,rgba(100,200,255,.05)_75%,rgba(100,200,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(100,200,255,.05)_25%,rgba(100,200,255,.05)_26%,transparent_27%,transparent_74%,rgba(100,200,255,.05)_75%,rgba(100,200,255,.05)_76%,transparent_77%,transparent)] bg-[length:60px_60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 inline-block px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-mono animate-fade-in">
          Athletics 2.0
        </div>

        <h1
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-magenta-400 bg-clip-text text-transparent">
            TECHLETICS
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Where technology meets athletics. Experience the future of sports.
        </p>

        <p
          className="text-sm md:text-base text-cyan-300/80 mb-12 font-mono animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Organized by: Head of Software Engineering Department
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <a href="#sports">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-6 text-lg rounded-lg glow-cyan transition-all duration-300">
              Register Now
            </button>
          </a>
          <a href="#about">
            <button className="border border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/10 px-8 py-6 text-lg rounded-lg bg-transparent transition-all duration-300">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
