import styles from "./Auth.module.css"
import {useState} from "react"
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"

import { setName, setRole, setLoginState, setCart, setFavs } from "../../../store/ProfileSlice"
import {setUsers} from "./../../../store/UsersSlice"
export default function Auth() {
    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [errorText, setErrorText] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state=>state.profile)
    const navigate = useNavigate()

    function authAttempt(event, login, password) {
        event.preventDefault()
        
        fetch("http://localhost:3001/auth", {
            "method": "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, password})
        })
            .then(res=>{
                if(res.status === 401){
                    throw "Пароль и/или логин введен(ы) неверно"
                } else if(res.status === 403){
                    throw "Аккаунт заблокирован"
                }else{
                    return res
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setErrorText("")
                dispatch(setLoginState(res.login))
                dispatch(setName(res.name))
                dispatch(setCart({cart: res.cart}))
                dispatch(setRole(res.role))
                navigate("/")
            })
            .catch(error=>{
                setErrorText(error)
            })
    }

    function logout(){
        dispatch(setName(""))
        dispatch(setLoginState(""))
        dispatch(setCart({cart: []}))
        dispatch(setRole(""))
        dispatch(setFavs([]))
        dispatch(setUsers([]))
        Cookies.remove("storeToken")
    }   
    
    return (
        <div className={styles.container}>
            {!user.login?
                <form onSubmit={(e) => authAttempt(e, login, password)}>
                    <p className={styles.header}>
                Вход в кабинет покупателя
                    </p>
                    <p className={styles.title}>
                Телефон или Email
                    </p>
                    <input className={styles.input} required name="login" value={login} onChange={event => setLogin(event.target.value)} ></input>
                    <p className={styles.title}>
                Пароль
                    </p>
                    <input className={styles.input} required type="password" name="password" value={password} onChange={event => setPassword(event.target.value)}></input>
                    <p className={styles.error}>{errorText}</p>
                    <button type="submit" className={styles.button}>
                    Войти
                    </button>
               
                </form>:<><h3>Здравствуйте, {user.name}!</h3>
                    <button className={styles.button} onClick={logout}>
                        Выйти
                    </button></>}
        </div>
    )
}

