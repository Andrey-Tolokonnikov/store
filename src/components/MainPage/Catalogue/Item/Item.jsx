import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setCart, makeFav, unmakeFav } from "./../../../../store/profileSlice"
import { addToCart as addToCartAPI } from "./../../../../APIHandlers/cartAPI"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/fontawesome-free-solid"

import styles from "./Item.module.css"
import defImg from "./../../../../img/default.png"


export default function Item({good}) {

    const items = useSelector(state => state.profile.cart)
    const dispatch = useDispatch()

    const addToCart = async function(itemId){
        const resultCart = await addToCartAPI(itemId)
        dispatch(setCart({cart:resultCart}))
    }
    
    let quantity = items.find(item => item._id === good._id)?.num ?? 0
    return <div className={styles.item}>
        <img alt={good.title} src={good.img ?? defImg} className={styles.img} />
        <Link className={styles.link} to={`/ItemCard/${good.id}`}>{good.title}</Link>
        <div className={styles.buyBlock}>
            <div className={styles.price}>{good.price.toLocaleString()}</div>
            <div className={styles.cart} onClick={() => { addToCart(good._id)}}>
                {quantity === 0 ? <FontAwesomeIcon icon={faCartPlus} /> : "+1"}
            </div>
            {quantity !== 0 ? <div className={styles.quantity}>{quantity}</div> : ""}
        </div>
        
        <svg className={good.isFav?[styles.heartActive, styles.heart].join(" "):styles.heart} viewBox="0 0 242 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" />
            <g onClick={() => { good.isFav ? dispatch(unmakeFav(good)) : dispatch(makeFav(good)) }}>
                <path d="m127.3 66.43c29.167-83.675 143.44 0 0 107.58-143.44-107.58-29.167-191.26 0-107.58z"/>
            </g>
        </svg>

    </div>
}
