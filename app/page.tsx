import Hero from "@/components/hero"
import About from "@/components/about"
import Sports from "@/components/sports"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Sports />
      <About />
      <Footer />
    </main>
  )
}
