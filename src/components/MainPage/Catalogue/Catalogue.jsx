import styles from "./Catalogue.module.css"
import Item from "./Item/Item"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/fontawesome-free-solid"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRecommendations as getRecommendationsAPI } from "./../../../APIHandlers/CatalogueAPI"
import { setCatalogue} from "../../../store/CatalogueSlice"
import { Link } from "react-router-dom"

export default function Catalogue() {
    //let goods = useSelector(state => state.catalogue.items)
    let [catMode, setCatMode] = useState("promo")
    //const dispatch = useDispatch()
    const [goods, setGoods] = useState([])
    useEffect(() => {
        async function getCatalogueUseEffect(){
            const catalogue = await getRecommendationsAPI()
            setGoods(catalogue)
            //dispatch(setCatalogue(catalogue))
        }
        getCatalogueUseEffect()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.nav}> 
                <a onClick={() => { setCatMode("promo")}} className={catMode==="promo"?[styles.activeLink, styles.link].join(" "):styles.link}>Для вас</a>
                <a onClick={() => { setCatMode("popular") }} className={catMode === "popular" ? [styles.activeLink, styles.link].join(" ") : styles.link}>Популярное</a>
            </div>
            <div className={styles.itemsWrapper}>
                {goods.map(good => <Item key={good._id} good={good} />)}
            </div>
            <div className={styles.linkContainer}><Link to="/catalogue" className={styles.link}>Смотреть все <FontAwesomeIcon icon={faArrowRight} /></Link></div>
        </div>
    )
}
