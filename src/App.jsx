import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Timeline from './components/timeline/timeline';

function App() {
  return (
    <div className="relative w-full overflow-y-auto scroll-smooth bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Footer />
    </div>
  );
}

export default App;
