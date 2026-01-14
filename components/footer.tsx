"use client"

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-4">TECHLETICS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A futuristic college sports event where technology meets athletics. Experience the future of competitive
              sports.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-magenta-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#sports" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#rules" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Rules
                </a>
              </li>
              <li>
                <a href="#registration" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">Head of Software Engineering Department</p>
            <p className="text-gray-500 text-xs">Email: info@techletics.edu</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-gray-500 text-sm">© 2026 TECHLETICS. All rights reserved. Athletics 2.0</p>
        </div>
      </div>
    </footer>
  )
}
