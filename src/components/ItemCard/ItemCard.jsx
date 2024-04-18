import styles from "./ItemCard.module.css"

import defImg from "./../../img/default.png"
import { useState } from "react"
import { addToCart, removeItem, makeFav, unmakeFav } from "./../../store/profileSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link} from "react-router-dom"

export default function ItemCard() {
    const params = useParams()
    const catalogue = useSelector(state => state.catalogue.items)
    const cart = useSelector(state => state.profile.cart)

    const item = catalogue.find(item => item.id == params.ItemID)

    const quantity = cart.find(cartItem=>cartItem._id === item._id)?.num ?? 0

    let [isDescOpen, setIsDescOpen] = useState(false)
    const dispatch = useDispatch()
    return (
        <div className={styles.container}>
            <img className={styles.img} src={item.img ?? defImg} />
            <div className={styles.data}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.price}>{item.price.toLocaleString()+" руб."}</p>
                <p className={styles.configTitle}>Конфигурация</p>
                <div className={styles.config}>{item.config}</div>
                <div className={styles.cartInfo}></div>
                <div className={styles.actions}>
                    <div className={styles.cartActions}>
                        <button className={styles.action} onClick={() => dispatch(removeItem(item))}>-</button>
                        
                        <button className={styles.cart}><Link to="/cart">В корзине {quantity} шт <br />Перейти</Link></button>
                        
                        <button className={styles.action} onClick={() =>dispatch(addToCart(item))}>+</button>
                    </div>
                    <div className={styles.fav} onClick={() => { item.isFav ? dispatch(unmakeFav(item)) : dispatch(makeFav(item)) }}>
                        <svg className={item.isFav ? [styles.heartActive, styles.heart].join(" ") : styles.heart} viewBox="0 0 300 300">
                            <rect width="100%" height="100%" />
                            <g >
                                <path d="m148.39 77.188c57.59-165.22 283.23 0 0 212.42-283.23-212.42-57.59-377.64 0-212.42z" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className={styles.desc} onClick={() => { setIsDescOpen(!isDescOpen) }}>
                    <div className={styles.descHeader}>
                        <div className={styles.descTitle}>Описание</div>
                        <div className={isDescOpen ? styles.arrowUp:styles.arrow}><FontAwesomeIcon icon="fas fa-chevron-down" /></div>
                    </div>
                    <div className={isDescOpen ? styles.description : styles.descriptionClosed}>{item.desc}</div>
                </div>
            </div>
        </div>
    )
}
