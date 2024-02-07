import styles from './Item.module.css'
import defImg from './../../../img/default.png'

import { useDispatch } from 'react-redux'
import { addItem, removeItem, clearItem } from './../../../store/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'
import heartIcon from './../../../img/heart.svg'

export default function Item(props) {
    let dispatch = useDispatch();
    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.good.img ?? defImg}></img>
                <div className={ styles.text}>
                    <p className={styles.title}>{props.good.title}</p>
                    <p className={styles.specs}>{props.good.specs ?? 'medium'}</p>
                    <p className={styles.price}>{props.good.price + ' руб/шт'}</p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <div className={styles.quantity}>
                        <div className={styles.plus} onClick={() => dispatch(removeItem(props.good))}>-</div>
                        {props.quantity}
                        <div className={styles.plus} onClick={() => dispatch(addItem(props.good))}>+</div>
                    </div>
                    <div className={styles.totalPrice}>{props.good.price * props.quantity + ' Р'}</div>
                    <img src={heartIcon} ></img>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(clearItem(props.good))} />
            </div>
        </div>
    );
}
