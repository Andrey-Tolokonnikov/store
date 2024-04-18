import styles from "./Auth.module.css"
import {useState} from "react"
import {useDispatch } from "react-redux"

import { setName, setLoginState, addToCart } from "../../../store/profileSlice"
export default function Auth() {

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [errorText, setErrorText] = useState("")
    const dispatch = useDispatch()
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
                if(res.status === 403){
                    throw "Пароль и/или логин введен(ы) неверно"
                } else{
                    return res
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setErrorText("")
                dispatch(setLoginState(res.login))
                dispatch(setName(res.name))
                res.cart.forEach(item=>dispatch(addToCart(item)))
            })
            .catch(error=>{
                setErrorText(error)
            })
    }

    return (
        <div className={styles.container}>
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
               
            </form>
        </div>
    )
}

