import styles from "./Catalogue.module.css"
import Item from "./Item/Item"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/fontawesome-free-solid"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addToCatalogue, clearCatalogue} from "./../../../store/catalogueSlice"

export default function Catalogue() {
    let goods = useSelector(state => state.catalogue.items)
    let [catMode, setCatMode] = useState("promo")
    const dispatch = useDispatch()
    useEffect(() => {
        fetch("http://localhost:3001/catalogue", {
            credentials: "include"
        }).then(res => res.json()).then(res => {
            dispatch(clearCatalogue())
            res.forEach(item => {
                let tmp = {
                    img: null,
                    title: "No title",
                    config: "simple",
                    price: 0,
                    isFav: false,
                    ...item
                }
                dispatch(addToCatalogue(tmp))
            })
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.nav}> 
                <a onClick={() => { setCatMode("promo")}} className={catMode==="promo"?[styles.activeLink, styles.link].join(" "):styles.link}>Акции</a>
                <a onClick={() => { setCatMode("popular") }} className={catMode === "popular" ? [styles.activeLink, styles.link].join(" ") : styles.link}>Популярное</a>
            </div>
            <div className={styles.itemsWrapper}>
                {goods.map(good => <Item key={good._id} good={good} />)}
            </div>
            <div className={styles.linkContainer}><a className={styles.link}>Смотреть все <FontAwesomeIcon icon={faArrowRight} /></a></div>
        </div>
    )
}
