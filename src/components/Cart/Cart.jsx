import styles from './Cart.module.css'
import { useSelector } from 'react-redux'

import Item from './Item/Item'
export default function Cart(props) {
    const cartItems = useSelector(state => state.catalogue.items).filter(item=>item.inCart>0);
    const cartSize = cartItems.reduce((acc, item) => acc + item.inCart, 0);
    const cartPrice = cartItems.reduce((acc, item) => acc + item.price*item.inCart, 0);

    return <div className={styles.container}>
        <div className={styles.list}>
            <p className={styles.title}>Корзина</p>
            {cartItems.find(item=>item.inCart>0)?cartItems.map(item => <Item key={item.id} good={item} quantity={item.inCart} />):'Ваша корзина пуста'}
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
                        {cartPrice.toLocaleString() + ' руб.'}
                    </div>
                </div>
                <div className={styles.goodsResult}>
                    <div>
                        Итого к оплате:
                    </div>
                    <div className={styles.totalPrice}>
                        { cartPrice.toLocaleString() + ' руб.'}
                    </div>
                    
                </div>
                <button className={styles.checkoutButton}>Оформить заказ</button>
            </div>
        </div>
    </div>;
}
