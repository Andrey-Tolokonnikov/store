
import styles from "./ActiveItem.module.css"
import defImg from "./../../../../img/default.png"
import { useState } from "react"
import { updateCatalogue } from "../../../../APIHandlers/CatalogueAPI"
import { setCatalogue } from "../../../../store/CatalogueSlice"
//import { useDispatch, useSelector } from "react-redux"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function ActiveItem(props){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [itemTitle, setItemTitle] = useState(props.item.title)
    const [itemConfig, setItemConfig] = useState(props.item.config)
    const [itemPrice, setItemPrice] = useState(props.item.price)
    const [itemDesc, setItemDesc] = useState(props.item.desc)

    async function updateItem(e){
        e.preventDefault()
        const catalogue = await updateCatalogue(
            {
                _id: props.item._id,
                title: itemTitle, 
                config: itemConfig, 
                price: itemPrice,
                desc: itemDesc
            }, navigate)
        if(catalogue != null){
            dispatch(setCatalogue(catalogue))
        }
        props.setActiveItem(null)
    }

    return (
        <form className={styles.item} onSubmit={e=>updateItem(e)}>
            <div className={styles.description}>
                <img src={props.item.img ?? defImg}></img>
                <div className={ styles.text}>
                    Название: <input required className={styles.title} onChange={e=>setItemTitle(e.target.value)} value={itemTitle}/>
                    Конфигурация: <input required  onChange={e=>setItemConfig(e.target.value)} value={itemConfig ?? "medium"}/>
                    Цена: <div><input required type="number"  onChange={e=>setItemPrice(e.target.value)} value={itemPrice}/> руб/шт</div>
                    Описание: <textarea required onChange={e=>setItemDesc(e.target.value)} value={itemDesc}/>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <button type="submit" className={styles.confirm}>
                        Подтвердить
                    </button>
                    <button className={styles.cancel} onClick={()=>props.setActiveItem(null)}>
                        Отмена
                    </button>
                </div> 
            </div>
        </form>
    )
}