import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/fontawesome-free-solid'
import styles from './Item.module.css'
import defImg from './img/default.png'


export default function Item(props) {
    let [quantity, setQuantity] = useState(0);
    return <div className={styles.item}>
        <img alt={props.title} src={props.img ?? defImg} className={styles.img} />
        {props.title}
        <div className={styles.buyBlock} onClick={() => setQuantity(quantity+1)}>
            <div className={styles.price}>{props.price}</div>
            <div className={styles.cart}>
                {quantity === 0 ? <FontAwesomeIcon icon={faCartPlus} /> : "+1"}
            </div>
            {quantity !== 0?<div className={styles.quantity}>{quantity}</div>:""}
        </div>
        
    </div>;
}