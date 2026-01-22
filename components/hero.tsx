// "use client"
// import Lightning from './Lightning';
// export default function Hero() {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-black">

      
//       {/* Lightning Background - positioned absolutely behind everything */}
//       <div className="absolute inset-0 z-0">
//         <Lightning />
//       </div>

//       {/* Cyan glow element */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl z-10" />
      
//       {/* Magenta glow element */}
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/30 rounded-full blur-3xl z-10" />
      
//       {/* Grid overlay */}
//       <div className="absolute inset-0 z-10 opacity-20"
//            style={{
//              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//              backgroundSize: '50px 50px'
//            }} />
      
//       {/* Content */}
//       <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
//         <div className="mb-4 text-sm font-semibold tracking-wider text-cyan-400 uppercase">
//           TECHLETICS 2.0
//         </div>
  
//       <h1 className="font-extrabold text-4xl md:text-8xl lg:text-[clamp(2rem,10vw,8rem)] whitespace-nowrap relative mx-auto select-none cursor-pointer mb-6">
//         <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent"
//               style={{
//                 WebkitTextStroke: '2px cyan'
//               }}>
//           TECHLETICS
//         </span>
//       </h1>
              

        
//         <p className="mb-2 text-xl md:text-2xl text-gray-300 max-w-2xl">
//           Where technology meets athletics. Code less, play more.
//         </p>
        
//         <p className="mb-8 text-sm text-gray-400">
//           Organized under the supervision of the Head of the Software Engineering Department, 
//           in collaboration with NED Software Community (NSC), and managed by 3rd Year Software Engineering students.
//         </p>

        
//         <div className="flex gap-4 flex-wrap justify-center">
//           <a href="#sports">
//             <button className="px-8 py-3 border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
//               Register Now
//             </button>
//           </a>
//          <a href="#about">
//           <button className="px-8 py-3 border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
//             Learn More
//           </button>
//          </a>
          
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"
import Lightning from './Lightning'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Lightning Background - positioned absolutely behind everything */}
      <div className="absolute inset-0 z-0">
        <Lightning />
      </div>

      {/* Cyan glow element */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl z-10" />
      
      {/* Magenta glow element */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/30 rounded-full blur-3xl z-10" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-4 text-sm font-semibold tracking-wider text-cyan-400 uppercase">
          TECHLETICS 2.0
        </div>
  
        <h1 className="font-extrabold text-4xl md:text-8xl lg:text-[clamp(2rem,10vw,8rem)] whitespace-nowrap relative mx-auto select-none cursor-pointer mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent"
                style={{
                  WebkitTextStroke: '2px cyan'
                }}>
            TECHLETICS
          </span>
        </h1>

        {/* Event Details Cards */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {/* Free Entry Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative flex items-center gap-3 px-6 py-3 backdrop-blur-sm border border-cyan-500/30 rounded-lg group-hover:border-cyan-400/60 transition-all duration-300">
              <div className="text-center">
                <div className="text-sm font-bold text-white">No Participation Fees</div>
              </div>
            </div>
          </div>
        </div>
                
        <p className="mb-2 text-xl md:text-2xl text-gray-300 max-w-2xl">
          Where technology meets athletics. Code less, play more.
        </p>
        
        <p className="mb-8 text-sm text-gray-400 max-w-2xl">
          Organized under the supervision of the Head of the Software Engineering Department, 
          in collaboration with NED Software Community (NSC), and managed by 3rd Year Software Engineering students.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#sports">
            <button className="px-8 py-3 border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
              Register Now
            </button>
          </a>
          <a href="#about">
            <button className="px-8 py-3 border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
              Learn More
            </button>
          </a>
        </div>
      </div>
     
    </section>

  )
}