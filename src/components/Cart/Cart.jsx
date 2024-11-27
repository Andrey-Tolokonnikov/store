import styles from "./Cart.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addOrder as addOrderAPI } from "../../APIHandlers/OrdersAPI"

import Item from "./Item/Item"
import Recommends from "./Recommends/Recommends"
import { useNavigate } from "react-router-dom"
import { clearCart as clearCartAPI} from "../../APIHandlers/CartAPI"
import { setCart } from "../../store/ProfileSlice"
import { setOrders } from "../../store/OrdersSlice"
import { useEffect } from "react"


export default function Cart() {
    const cartItems = useSelector(state => state.profile.cart)
    const catalogueItems = useSelector(state => state.catalogue.items)
    const profileID = useSelector(state => state.profile._id)

    const navigate = useNavigate()

    useEffect(()=>{
        if(!profileID){
            navigate("/auth")
        }
    }, [])
    
    const dispatch = useDispatch()

    const cartSize = cartItems.reduce((acc, item) => acc + item.num, 0)
    const cartPrice = cartItems.reduce((acc, item) => acc + catalogueItems.find(catItem=>catItem._id===item._id).price*item.num, 0)

    const favs = useSelector(state => state.profile.favs)
    const favItems = catalogueItems.filter(item=>favs.includes(item._id))

    async function checkout(){
        const orders = await addOrderAPI(cartItems, profileID, navigate)
        const cart = await clearCartAPI(navigate)

        if(cart != null){
            dispatch(setCart({cart:cart}))
        }
        if(orders != null){
            dispatch(setOrders(orders))
        }
        navigate("/")
    }
    return (<>
        <div className={styles.container}>
            <div className={styles.list}>
                <p className={styles.title}>Корзина</p>
                {cartItems.length>0
                    ?cartItems.map(
                        item =>{
                            const catalogueItem = catalogueItems.find(catItem=>catItem._id === item._id) 
                            return <Item key={item._id} good={catalogueItem} quantity={cartItems.find(cartItem=>cartItem._id === item._id).num} />
                        }
                    )
                    
                    :"Ваша корзина пуста"}
            </div>
            <div className={styles.checkout}>
                <div className={styles.promocode}>
                    <p className={styles.inputTitle}>
                    Введите промокод
                    </p>
                    <div className={styles.inputWrapper}>
                        <input className={styles.input} placeholder='Промокод'></input>
                        <button className={styles.confirmPromocode}></button>
                    </div>
                </div>
                <div className={ styles.result}>
                    <div className={styles.goodsResult}>
                        <div>
                        Товары({cartSize})
                        </div>
                        <div>
                            {cartPrice.toLocaleString() + " руб."}
                        </div>
                    </div>
                    <div className={styles.goodsResult}>
                        <div>
                        Итого к оплате:
                        </div>
                        <div className={styles.totalPrice}>
                            { cartPrice.toLocaleString() + " руб."}
                        </div>
                    </div>
                    <button className={styles.checkoutButton} onClick={checkout}>Оформить заказ</button>
                </div>
            </div>
        </div>
        <Recommends favItems={favItems} />
        
    </>)
}
