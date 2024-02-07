import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import MainPage from './components/MainPage/MainPage'
import Cart from './components/Cart/Cart'
import './App.css';
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
      <div className="App">
          <Header />
          <Routes>
              <Route path='/' element={<MainPage />}/>
              <Route path='/cart' element={<Cart/>} />
          </Routes>
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
