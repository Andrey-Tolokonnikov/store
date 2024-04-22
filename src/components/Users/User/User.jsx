import styles from "./User.module.css"
import userImg from "./Sample_User_Icon.png"

export default function User({user}){
    return(
        <div className={styles.wrapper}>
            <img className={styles.avatar} src={userImg} alt="" />
            <div>
                <p className={styles.name}>Имя: {user.name}</p>
                <p className={styles.login}>Логин: {user.login}</p>
                <p className={styles.role}>Роль: {user.role}</p>
            </div>
        </div>
    ) 
    
}