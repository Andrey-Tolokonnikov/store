import styles from "./Cart.module.css"
import { useSelector } from "react-redux"

import Item from "./Item/Item"
import Recommends from "./Recommends/Recommends"


export default function Cart() {
    const cartItems = useSelector(state => state.profile.cart)
    const catalogueItems = useSelector(state => state.catalogue.items)

    const cartSize = cartItems.reduce((acc, item) => acc + item.num, 0)
    const cartPrice = cartItems.reduce((acc, item) => acc + catalogueItems.find(catItem=>catItem._id===item._id).price*item.num, 0)

    const favs = useSelector(state => state.profile.favs)
    const favItems = catalogueItems.filter(item=>favs.includes(item._id))
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
                    <button className={styles.checkoutButton}>Оформить заказ</button>
                </div>
            </div>
        </div>
        <Recommends favItems={favItems} />
        
    </>)
}
