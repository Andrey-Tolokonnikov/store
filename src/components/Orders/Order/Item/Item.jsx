import styles from "./Item.module.css"
import defImg from "../../../../img/default.png"
import { Link } from "react-router-dom"

export default function Item(props) {
    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.item.img ?? defImg}></img>
                <div className={styles.text}>
                    <Link
                        className={styles.link}
                        to={`/ItemCard/${props.item._id}`}
                    >
                        <p className={styles.title}>{props.item.title}</p>
                    </Link>
                    <p className={styles.specs}>{props.item.specs}</p>
                    <p className={styles.price}>
                        {props.item.price.toLocaleString() + " руб/шт"}
                    </p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <>
                        <div className={styles.quantity}>
                            {props.quantity + " шт."}
                        </div>
                    </>
                </div>
            </div>
        </div>
    )
}
