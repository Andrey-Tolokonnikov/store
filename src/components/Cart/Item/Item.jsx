import styles from './Item.module.css'
import defImg from './../../../img/default.png'

import { useDispatch } from 'react-redux'
import { addToCart, removeItem, clearItem, makeFav, unmakeFav } from './../../../store/catalogueSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'
import heartIcon from './../../../img/coat.png'

export default function Item(props) {
    let dispatch = useDispatch();
    return (
        <div className={styles.item}>
            <div className={styles.description}>
                <img src={props.good.img ?? defImg}></img>
                <div className={ styles.text}>
                    <p className={styles.title}>{props.good.title}</p>
                    <p className={styles.specs}>{props.good.specs ?? 'medium'}</p>
                    <p className={styles.price}>{props.good.price.toLocaleString() + ' руб/шт'}</p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <div className={styles.quantity}>
                        <div className={styles.plus} onClick={() => dispatch(removeItem(props.good))}>-</div>
                        {props.quantity}
                        <div className={styles.plus} onClick={() => dispatch(addToCart(props.good))}>+</div>
                    </div>
                    <div className={styles.totalPrice}>{(props.good.price * props.quantity).toLocaleString() + ' Р'}</div>
                    <svg className={props.good.isFav ? [styles.heartActive, styles.heart].join(' ') : styles.heart} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <title>my vector image</title>
                <rect width="100%" height="100%" />
                <g onClick={() => { props.good.isFav ? dispatch(unmakeFav(props.good)) : dispatch(makeFav(props.good)) }}>
                            <path d="m148.39 77.188c57.59-165.22 283.23 0 0 212.42-283.23-212.42-57.59-377.64 0-212.42z" />
                </g>
            </svg>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(clearItem(props.good))} />
            </div>
            
        </div>
    );
}
