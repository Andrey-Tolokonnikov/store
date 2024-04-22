import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import MainPage from "./components/MainPage/MainPage"
import Cart from "./components/Cart/Cart"
import ItemCard from "./components/ItemCard/ItemCard"
import Auth from "./components/Profile/Auth/Auth"
import Users from "./components/Users/Users"
import "./App.css"
import { Routes, Route} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/cart' element={<Cart />} />
                <Route path='/ItemCard/:ItemID' element={<ItemCard />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/users' element={<Users />} />
            </Routes>
            <Footer/>
          
        </div>
    )
}

export default App
