import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setCart, setFavs } from "../../../../store/ProfileSlice"
import { addToCart as addToCartAPI } from "../../../../APIHandlers/CartAPI"
import { addToFavs as addToFavsAPI, removeFromFavs as removeFromFavsAPI } from "../../../../APIHandlers/FavsAPI"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/fontawesome-free-solid"

import styles from "./Item.module.css"
import defImg from "./../../../../img/default.png"


export default function Item({good}) {

    const items = useSelector(state => state.profile.cart)
    const favs = useSelector(state => state.profile.favs)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addToCart = async function(itemId){
        const resultCart = await addToCartAPI(itemId, navigate)
        if(resultCart != null){
            dispatch(setCart({cart:resultCart}))
        }
    }
    const addToFavs = async function(itemId){
        const resultFavs = await addToFavsAPI(itemId, navigate)
        if(resultFavs != null){
            dispatch(setFavs(resultFavs)) 
        }
    }
    const removeFromFavs = async function(itemId){
        const resultFavs = await removeFromFavsAPI(itemId, navigate)
        if(resultFavs != null){
            dispatch(setFavs(resultFavs)) 
        }
    }
    
    let quantity = items.find(item => item._id === good._id)?.num ?? 0
    return <div className={styles.item}>
        <img alt={good.title} src={good.img ?? defImg} className={styles.img} />
        <Link className={styles.link} to={`/ItemCard/${good._id}`}>{good.title}</Link>
        <div className={styles.buyBlock}>
            <div className={styles.price}>{good.price.toLocaleString()}</div>
            <div className={styles.cart} onClick={() => { addToCart(good._id)}}>
                {quantity === 0 ? <FontAwesomeIcon icon={faCartPlus} /> : "+1"}
            </div>
            {quantity !== 0 ? <div className={styles.quantity}>{quantity}</div> : ""}
        </div>
        
        <svg className={favs.includes(good._id)?[styles.heartActive, styles.heart].join(" "):styles.heart} viewBox="0 0 242 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" />
            <g onClick={() => {favs.includes(good._id)?removeFromFavs(good._id):addToFavs(good._id)}}>
                <path d="m127.3 66.43c29.167-83.675 143.44 0 0 107.58-143.44-107.58-29.167-191.26 0-107.58z"/>
            </g>
        </svg>

    </div>
}
