import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import { getCatalogue as getCatalogueAPI } from "../../APIHandlers/CatalogueAPI"
import { setCatalogue } from "../../store/CatalogueSlice"
import ActiveItem from "./Item/ActiveItem/ActiveItem"
import Item from "./Item/Item"
import styles from "./Catalogue.module.css"

export default function Catalogue(){
    const catalogue = useSelector(state=>state.catalogue.items)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [activeItem, setActiveItem] = useState(null)
    useEffect(()=>{
        async function getSetCatalogue(){
            const catalogue = await getCatalogueAPI(navigate)
            if(catalogue != null){
                dispatch(setCatalogue(catalogue))
            }
        }
        getSetCatalogue()
    },
    [])
    return (
        <div className={styles.container}>
            <p className={styles.title}>Каталог товаров:</p>
            {catalogue.map(item=>activeItem === item._id?
                <ActiveItem setActiveItem={setActiveItem} key={item._id} item={item}/>:
                <Item setActiveItem={setActiveItem} key={item._id} item={item}/>
            )}
        </div>
    )
}