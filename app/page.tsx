import Hero from "@/components/hero"
import About from "@/components/about"
import Sports from "@/components/sports"
import Footer from "@/components/footer"
import Slider from "@/components/slider"

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Slider></Slider>
      <Sports />
      <About />
      <Footer />
    </main>
  )
}
