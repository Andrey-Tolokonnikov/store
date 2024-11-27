import { useDispatch, useSelector } from "react-redux"
import { getOrdersAll as getOrdersAllAPI, getMyOrders as getMyOrdersAPI} from "../../APIHandlers/OrdersAPI"
import { setOrderStatus as setOrderStatusAPI} from "../../APIHandlers/OrdersAPI"
import styles from "./Orders.module.css"

import Order from "./Order/Order"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { setOrders } from "../../store/OrdersSlice"

export default function Orders(){
    const orders = useSelector(state=>state.orders.items)
    const userRole = useSelector(state=>state.profile.role)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        async function getSetOrders(){
            const orders = userRole==="admin"?await getOrdersAllAPI(navigate):await getMyOrdersAPI(navigate)
            if(orders != null){
                dispatch(setOrders(orders))
            }
        }
        getSetOrders()
    },
    [userRole])

    async function changeStatus(orderID, status){
        const orders = await setOrderStatusAPI(orderID, status, navigate)
        if(orders != null){
            dispatch(setOrders(orders))
            
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Перечень заказов:</p>
            </div>
            {orders.map(item=>
                <Order key={item._id} order={item} changeStatus={changeStatus}/>
            )}
        </div>
    )
}