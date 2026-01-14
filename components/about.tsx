"use client"

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-cyan-400">About</span> TECHLETICS
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-lg border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 hover:glow-cyan">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">What is TECHLETICS?</h3>
            <p className="text-gray-300 leading-relaxed">
              TECHLETICS is a revolutionary college sports event that merges cutting-edge technology with traditional
              athletics. It's not just sports—it's athletics reimagined for the digital age.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-magenta-500/30 bg-slate-900/50 backdrop-blur-sm hover:border-magenta-400/60 transition-all duration-300 hover:glow-magenta">
            <h3 className="text-xl font-bold text-magenta-400 mb-3">Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To showcase the pinnacle of college athletics through an innovative lens, celebrating both physical
              excellence and technological innovation in competitive sports.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-center text-cyan-300">Key Highlights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
              <p className="text-gray-300">Participants</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-magenta-400 mb-2">10+</div>
              <p className="text-gray-300">Events</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">1</div>
              <p className="text-gray-300">Unforgettable Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
