import './App.css';
import Home from './components/Home'
import Footer from './components/Footer';
import { useMediaQuery } from 'react-responsive'

function App() {
  const isMobile = useMediaQuery({ maxHeight: 900, maxWidth: 550 })

  return (
    <div >
      <Home/>
      {/* {isMobile? <></>:<Footer/>} */}
      <Footer />
    </div>
  );
}

export default App;
