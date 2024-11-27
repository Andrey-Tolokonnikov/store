import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import { getCatalogue as getCatalogueAPI } from "../../APIHandlers/CatalogueAPI"
import { setCatalogue, addToCatalogue } from "../../store/CatalogueSlice"
import ActiveItem from "./Item/ActiveItem/ActiveItem"
import Item from "./Item/Item"
import styles from "./Catalogue.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Catalogue(){
    const catalogue = useSelector(state=>state.catalogue.items)
    const cart = useSelector(state=>state.profile.cart)
    const profile = useSelector(state=>state.profile)

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

    function addItemWithNoSave(){
        dispatch(addToCatalogue({_id: 1, price: 0}))
        setActiveItem(1)
    }

    function getQuantity(id){
        const item = cart.find(item=>item._id === id)
        const res = item == undefined?0:item.num
        return res
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Каталог товаров:</p>
                {profile.role === "moder"?<div><FontAwesomeIcon onClick={addItemWithNoSave} className={styles.addButton} icon="fas fa-plus-circle" /></div>:""}
            </div>
            {catalogue.map(item=>activeItem === item._id?
                <ActiveItem newItem={item._id===1} setActiveItem={setActiveItem} key={item._id} item={item}/>:
                <Item setActiveItem={setActiveItem} key={item._id} item={item} quantity={getQuantity(item._id)}/>
            )}
        </div>
    )
}