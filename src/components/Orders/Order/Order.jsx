import { useSelector } from "react-redux"
import Item from "./Item/Item"
import styles from "./Order.module.css"
import { useEffect, useRef } from "react"

function getStatusTag(status){
    const text = getStatusText(+status)
    
    let statusClass = null

    switch(+status){
    case 0:{
        statusClass = styles.pending
        break
    }
    case 1:{
        statusClass = styles.delivering
        break
    }
    case 2:{
        statusClass = styles.completed
        break
    }
    case 3:{
        statusClass = styles.cancelled
        break
    }}

    return <span className={statusClass}>{text}</span>
}

function getStatusText(status){
    switch(status){
    case 0:{
        return "На рассмотрении"
    }
    case 1:{
        return "Доставляется"
    }
    case 2:{
        return "Вручён"
    }
    case 3:{
        return "Отменён"
    }
    }
}

export default function Order(props){
    const role = useSelector(state=>state.profile.role)
    const selectRef = useRef()
    useEffect(()=>{
        if(role === "admin"){
            selectRef.current.value = props.order.status
        }
    }, [])

    return <div className={styles.container}>
        <div className={styles.title}>
            <div>Заказчик: {props.order.user.name}</div>
            <div>Статус:
                {
                    role!=="admin"?
                        getStatusTag(props.order.status):
                        <select ref={selectRef} onChange={(e)=>props.changeStatus(props.order._id, e.target.value, e)}>
                            <option value="0">На рассмотрении</option>
                            <option value="1">Доставляется</option>
                            <option value="2">Вручён</option>
                            <option value="3">Отменён</option>
                        </select>
                }
                <div>Дата: {props.order.date}</div></div>
        </div>
        <div className={styles.cart}>
            
            {props.order.cart.map(item=>{
                return (
                    <Item key={item._id} item={item.item} quantity={item.num}/>
                )
            })}
        </div>
    </div>
}