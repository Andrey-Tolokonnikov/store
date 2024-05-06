import styles from "./Users.module.css"
import User from "./User/User"

import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import {setUsers} from "./../../store/UsersSlice"
import {getUsers as getUsersAPI} from "./../../APIHandlers/UsersAPI"
import { useNavigate } from "react-router-dom"

export default function Users(){
    const users = useSelector(state=>state.users.usersList)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        async function getSetUsers(){
            const users = await getUsersAPI(navigate)
            if(users != null){
                dispatch(setUsers(users))
            }
        }
        getSetUsers()
    },
    [])
    return (
        <div className={styles.container}>
            <p className={styles.title}>Пользователи системы:</p>
            {users.map(item=><User key={item._id} user={item}/>)}
        </div>
    )
}