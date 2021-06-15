import './App.css';
import Home from './components/Home'

function App() {
  return (
    <div className="App-header" style={{backgroundImage: "url(/background2.jpeg)", backgroundPosition: 'center', position: 'relative'}}>
      <div style={{backgroundColor: 'rgba(82, 83, 85, 0.644)', position: 'absolute', top:'0', left:'0', width:'100%', height:'100%'}}>

      </div>
      <Home/>
    </div>
  );
}

export default App;
