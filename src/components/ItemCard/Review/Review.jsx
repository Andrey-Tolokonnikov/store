import styles from "./Review.module.css"
import def from "./../../Users/User/Sample_User_Icon.png"
export default function Review(props){
    return <div className={styles.container}>
        <img className={styles.img} src={def}></img>
        <div>
            <div className={styles.user}>
                Имя: {props.review.user.name}
            </div>
            <div className={styles.review}>
                {props.review.text}
            </div>
        </div>
    </div>
}