import { ToastContainer } from 'react-toastify'
import './App.css'
import SectionsContainer from './sections/SectionsContainer'
import Header from './sections/Home/Header/Header'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <div>
      <Header />
      <ToastContainer/>
      <SectionsContainer/>
      <ScrollToTop />
    </div>
  )
}

export default App