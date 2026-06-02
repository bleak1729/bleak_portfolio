import Navbar from './components/Navbar'
import { GlowyWavesHero } from './components/ui/glowy-waves-hero-shadcnui'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Stack from './components/Stack'
import WhyMe from './components/WhyMe'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <GlowyWavesHero />
        <About />
        <Services />
        <Projects />
        <Stack />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
