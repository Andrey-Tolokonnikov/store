import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import MainPage from "./components/MainPage/MainPage"
import Cart from "./components/Cart/Cart"
import ItemCard from "./components/ItemCard/ItemCard"
import Auth from "./components/Profile/Auth/Auth"
import Users from "./components/Users/Users"
import Catalogue from "./components/Catalogue/Catalogue"

import "./App.css"
import { Routes, Route } from "react-router-dom"
import { getMe } from "./APIHandlers/UsersAPI"
import { useEffect } from "react"
import {
    setCart,
    setFavs,
    setID,
    setLoginState,
    setName,
    setRole,
} from "./store/ProfileSlice"
import { useDispatch } from "react-redux"
import Registration from "./components/Profile/Registration/Registration"
import Orders from "./components/Orders/Orders"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        async function getSetMe() {
            const me = await getMe()
            if (me != null) {
                dispatch(setLoginState(me.login))
                dispatch(setName(me.name))
                dispatch(setCart({ cart: me.cart }))
                dispatch(setFavs(me.favs ? me.favs : []))
                dispatch(setRole(me.role))
                dispatch(setID(me._id))
            }
        }
        getSetMe()
    }, [])
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/ItemCard/:ItemID" element={<ItemCard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/users" element={<Users />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
