import styles from "./Item.module.css"
import defImg from "./../../../img/default.png"

import { useDispatch, useSelector } from "react-redux"
import { addToCart as addToCartAPI, removeOneFromCart as removeOneFromCartAPI} from "../../../APIHandlers/CartAPI"
import {setCart, clearItem, setFavs } from "../../../store/ProfileSlice"
import { addToFavs as addToFavsAPI, removeFromFavs as removeFromFavsAPI } from "../../../APIHandlers/FavsAPI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"
import {setCatalogue } from "../../../store/CatalogueSlice"
import { deleteFromCatalogue as deleteFromCatalogueAPI } from "../../../APIHandlers/CatalogueAPI"

export default function Item(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profile = useSelector(state=>state.profile)

    const favs = profile.favs
    

    const addToCart = async function(itemId){
        const resultCart = await addToCartAPI(itemId, navigate)
        if(resultCart != null){
            dispatch(setCart({cart:resultCart}))
        }
    }

    const removeOneFromCart = async function(itemId){
        const resultCart = await removeOneFromCartAPI(itemId, navigate)
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

    const deleteItemFromCatalogue = async function(itemID){
        const resultCatalogue = await deleteFromCatalogueAPI(itemID, navigate)
        if(resultCatalogue != null){
            dispatch(setCatalogue(resultCatalogue))
        }
    }

    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.item.img ?? defImg}></img>

                <div className={ styles.text}>
                    <Link className={styles.link} to={`/ItemCard/${props.item._id}`}>{props.item.title}</Link>
                    <p className={styles.specs}>{props.item.specs}</p>
                    <p className={styles.price}>{props.item.price.toLocaleString() + " руб/шт"}</p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    {profile.role === "moder"?
                        <>
                            <FontAwesomeIcon className={styles.edit} icon={faEdit} onClick={()=>props.setActiveItem(props.item._id)}/>
                            <FontAwesomeIcon className={styles.clear} icon={faTrash} onClick={()=>deleteItemFromCatalogue(props.item._id)}/>
                        </>:
                        <>
                            <div className={styles.quantity}>
                                <div className={styles.plus} onClick={() => removeOneFromCart(props.item._id)}>-</div>
                                {props.quantity}
                                <div className={styles.plus} onClick={() => addToCart(props.item._id)}>+</div>
                            </div>
                            
                            <svg className={favs.includes(props.item._id) ? [styles.heartActive, styles.heart].join(" ") : styles.heart} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" />
                                <g onClick={() => {favs.includes(props.item._id)?removeFromFavs(props.item._id):addToFavs(props.item._id)}}>
                                    <path d="m148.39 77.188c57.59-165.22 283.23 0 0 212.42-283.23-212.42-57.59-377.64 0-212.42z" />
                                </g>
                            </svg>
                        </>
                    }
                </div>  
                {profile.role === "moder"?"":<FontAwesomeIcon icon={faTrash} onClick={() => dispatch(clearItem(props.item))} />}
            </div>
        </div>
    )
}

