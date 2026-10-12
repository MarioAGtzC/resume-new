import { ToastContainer } from 'react-toastify';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Background from './sections/Background';
import Contact from './sections/Contact';

function App() {
  return (
    <div className='flex min-h-screen flex-col bg-canvas font-geist text-ink'>
      <Header />
      <ToastContainer theme='colored' />
      <main className='mx-auto flex w-full max-w-[1160px] flex-1 flex-col gap-16 px-4 pb-20 md:px-8'>
        <Hero />
        <Experience />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
