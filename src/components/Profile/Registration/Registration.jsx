import styles from "./Registration.module.css"
import {useState} from "react"
//import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
//import Cookies from "js-cookie"

//import { setName, setRole, setLoginState, setCart} from "../../../store/ProfileSlice"
//import {setUsers} from "./../../../store/UsersSlice"
export default function Registration() {
    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [errorText, setErrorText] = useState("")
    let [name, setName] = useState("")
    //const user = useSelector(state=>state.profile)
    const navigate = useNavigate()

    function registrate(event, login, password) {
        event.preventDefault()
        
        fetch("http://localhost:3001/registration", {
            "method": "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, password, name})
        })
            .then(res=>{
                if(res.status === 401){
                    throw "Введённый логин уже занят"
                }else if(res.status === 201){
                    navigate("/auth")
                } else {
                    return res
                }
            })
            .catch(error=>{
                setErrorText(error)
            })
    }
 
    return (
        <div className={styles.container}>
            <form onSubmit={(e) => registrate(e, login, password)}>
                <p className={styles.header}>
                Регистрация клиента
                </p>

                <p className={styles.title}>
                        Телефон или Email
                </p>
                <input className={styles.input} required name="login" value={login} onChange={event => setLogin(event.target.value)} ></input>
                <p className={styles.title}>
                        ФИО
                </p>
                <input className={styles.input} required name="name" value={name} onChange={event => setName(event.target.value)} ></input>
                <p className={styles.title}>
                        Пароль
                </p>
                <input className={styles.input} required type="password" name="password" value={password} onChange={event => setPassword(event.target.value)}></input>
                <p className={styles.error}>{errorText}</p>
                <button type="submit" className={styles.button}>
                        Зарегистрироваться
                </button>
               
            </form>
        </div>
    )
}

