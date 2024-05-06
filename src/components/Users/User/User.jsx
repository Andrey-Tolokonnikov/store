import styles from "./User.module.css"
import userImg from "./Sample_User_Icon.png"

import { setUserBlocked as setUserBlockedAPI, setUserRole as setUserRoleAPI} from "../../../APIHandlers/UsersAPI"
import { useDispatch, useSelector } from "react-redux"
import { setUsers } from "../../../store/UsersSlice"
import {useRef, useState} from "react"

export default function User({user}){
    const dispatch = useDispatch()

    const profile = useSelector(state=>state.profile)
    let [role, setRole] = useState(user.role)

    const selectRef = useRef()
    async function setUserBlocked(userID, toBlock){
        const users = await setUserBlockedAPI(userID, toBlock)
        dispatch(setUsers(users))
    }
    async function changeRole(userID, parRole){
        setRole(parRole)
        const users = await setUserRoleAPI(userID, parRole)
        dispatch(setUsers(users))
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <img className={styles.avatar} src={userImg} alt="" />
                <div>
                    <p className={styles.name}>Имя: {user.name}</p>
                    <p className={styles.login}>Логин: {user.login}</p>
                    <p className={styles.role}>Роль:
                        {user.login === profile.login? " admin":
                            <select value={role} onChange={(e)=>changeRole(user._id, e.target.value)} className={styles.select} ref={selectRef}>
                                <option value="admin">admin </option>
                                <option value="moder">moder</option>
                                <option value="user">user</option>
                            </select>
                        }
                    </p>
                    { user.isBlocked?<p className={styles.blocked}>Заблокирован</p>:""}
                   
                </div>
            </div>
            <div className={styles.control}>
                {user.login === profile.login?"":<button onClick={()=>setUserBlocked(user._id, !user.isBlocked)} className={styles.button}>{user.isBlocked?"Разблокировать":"Заблокировать"}</button>}
            </div>
            
        </div>
    ) 
}