import styles from "./Item.module.css"
import defImg from "./../../../img/default.png"

import { useDispatch, useSelector } from "react-redux"
import { addToCart as addToCartAPI, removeOneFromCart as removeOneFromCartAPI} from "../../../APIHandlers/CartAPI"
import {setCart, clearItem, setFavs } from "../../../store/ProfileSlice"
import { addToFavs as addToFavsAPI, removeFromFavs as removeFromFavsAPI } from "../../../APIHandlers/FavsAPI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/fontawesome-free-solid"

export default function Item(props) {
    let dispatch = useDispatch()
    const favs = useSelector(state => state.profile.favs)

    const addToCart = async function(itemId){
        const resultCart = await addToCartAPI(itemId)
        dispatch(setCart({cart:resultCart}))
    }

    const removeOneFromCart = async function(itemId){
        const resultCart = await removeOneFromCartAPI(itemId)
        dispatch(setCart({cart:resultCart}))
    }

    const addToFavs = async function(itemId){
        const resultFavs = await addToFavsAPI(itemId)
        dispatch(setFavs(resultFavs))
    }
    const removeFromFavs = async function(itemId){
        const resultFavs = await removeFromFavsAPI(itemId)
        dispatch(setFavs(resultFavs))
    }

    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.good.img ?? defImg}></img>
                <div className={ styles.text}>
                    <p className={styles.title}>{props.good.title}</p>
                    <p className={styles.specs}>{props.good.specs ?? "medium"}</p>
                    <p className={styles.price}>{props.good.price.toLocaleString() + " руб/шт"}</p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <div className={styles.quantity}>
                        <div className={styles.plus} onClick={() => removeOneFromCart(props.good._id)}>-</div>
                        {props.quantity}
                        <div className={styles.plus} onClick={() => addToCart(props.good._id)}>+</div>
                    </div>
                    <div className={styles.totalPrice}>{(props.good.price * props.quantity).toLocaleString() + " Р"}</div>
                    <svg className={favs.includes(props.good._id) ? [styles.heartActive, styles.heart].join(" ") : styles.heart} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" />
                        <g onClick={() => {favs.includes(props.good._id)?removeFromFavs(props.good._id):addToFavs(props.good._id)}}>
                            <path d="m148.39 77.188c57.59-165.22 283.23 0 0 212.42-283.23-212.42-57.59-377.64 0-212.42z" />
                        </g>
                    </svg>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(clearItem(props.good))} />
            </div>
        </div>
    )
}

