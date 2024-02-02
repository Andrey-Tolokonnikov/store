import Header from './components/Header/Header';
import Slider from './components/Slider/Slider';
import Catalogue from './components/Catalogue/Catalogue'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import './App.css';
import { useState } from 'react';

function App() {
    let [count, setCount] = useState(1);
  return (
      <div className="App">
          <Header />
          <Slider />
          <Catalogue />
          <About />
          <Footer/>
          {/*<div onClick={()=>setCount(count+1)}>
              Count: {count}
          </div>
          <Link to="/click">Link</Link>
          <Routes>
              <Route path="/click" element={ <h1>hello</h1>} />
          </Routes>*/}
          
    </div>
  );
}

export default App;
