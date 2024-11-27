import styles from "./Item.module.css"
import defImg from "./../../../img/default.png"

import { useDispatch, useSelector } from "react-redux"
import {
    addToCart as addToCartAPI,
    removeOneFromCart as removeOneFromCartAPI,
} from "../../../APIHandlers/CartAPI"
import { setCart, clearItem, setFavs } from "../../../store/ProfileSlice"
import {
    addToFavs as addToFavsAPI,
    removeFromFavs as removeFromFavsAPI,
} from "../../../APIHandlers/FavsAPI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/fontawesome-free-solid"
import { Link, useNavigate } from "react-router-dom"

export default function Item(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const favs = useSelector((state) => state.profile.favs)

    const addToCart = async function (itemId) {
        const resultCart = await addToCartAPI(itemId, navigate)
        if (resultCart != null) {
            dispatch(setCart({ cart: resultCart }))
        }
    }

    const removeOneFromCart = async function (itemId) {
        const resultCart = await removeOneFromCartAPI(itemId, navigate)
        if (resultCart != null) {
            dispatch(setCart({ cart: resultCart }))
        }
    }

    const addToFavs = async function (itemId) {
        const resultFavs = await addToFavsAPI(itemId, navigate)
        if (resultFavs != null) {
            dispatch(setFavs(resultFavs))
        }
    }
    const removeFromFavs = async function (itemId) {
        const resultFavs = await removeFromFavsAPI(itemId, navigate)
        if (resultFavs != null) {
            dispatch(setFavs(resultFavs))
        }
    }

    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.good.img ?? defImg}></img>
                <div className={styles.text}>
                    <Link
                        className={styles.link}
                        to={`/ItemCard/${props.good._id}`}
                    >
                        <p className={styles.title}>{props.good.title}</p>
                    </Link>
                    <p className={styles.specs}>
                        {props.good.specs ?? "medium"}
                    </p>
                    <p className={styles.price}>
                        {props.good.price.toLocaleString() + " руб/шт"}
                    </p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <div className={styles.quantity}>
                        <div
                            className={styles.plus}
                            onClick={() => removeOneFromCart(props.good._id)}
                        >
                            -
                        </div>
                        {props.quantity}
                        <div
                            className={styles.plus}
                            onClick={() => addToCart(props.good._id)}
                        >
                            +
                        </div>
                    </div>
                    <div className={styles.totalPrice}>
                        {(props.good.price * props.quantity).toLocaleString() +
                            " Р"}
                    </div>
                    <svg
                        className={
                            favs.includes(props.good._id)
                                ? [styles.heartActive, styles.heart].join(" ")
                                : styles.heart
                        }
                        viewBox="0 0 300 300"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="100%" height="100%" />
                        <g
                            onClick={() => {
                                favs.includes(props.good._id)
                                    ? removeFromFavs(props.good._id)
                                    : addToFavs(props.good._id)
                            }}
                        >
                            <path d="m148.39 77.188c57.59-165.22 283.23 0 0 212.42-283.23-212.42-57.59-377.64 0-212.42z" />
                        </g>
                    </svg>
                </div>
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => dispatch(clearItem(props.good))}
                />
            </div>
        </div>
    )
}
