import { useSelector, useDispatch } from 'react-redux'

import { addItem } from './../../../../store/cartSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/fontawesome-free-solid'

import styles from './Item.module.css'
import defImg from './../../../../img/default.png'


export default function Item({good}) {

    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    let quantity = items.find(item => item[0].id === good.id)?.[1] ?? 0;

    return <div className={styles.item}>
        <img alt={good.title} src={good.img ?? defImg} className={styles.img} />
        {good.title}
        <div className={styles.buyBlock}>
            <div className={styles.price}>{good.price}</div>
            <div className={styles.cart} onClick={() => { dispatch(addItem(good)) }}>
                {quantity === 0 ? <FontAwesomeIcon icon={faCartPlus} /> : "+1"}
            </div>
            {quantity !== 0 ? <div className={styles.quantity}>{quantity}</div>:""}
        </div>
        
    </div>;
}
