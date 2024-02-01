import styles from './Catalogue.module.css'
import { NavLink } from 'react-router-dom'
import Item from './Item/Item'
import coat from './Item/img/coat.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'
import {useState} from 'react'
export default function Catalogue(props) {
    let goods = [{ id: 1, title: "Название 1", price: 5000, img: coat },
        { id: 2, title: "Название 2", price: 10000 },
        { id: 3, title: "Название 3", price: 10000 },
        { id: 4, title: "Название 4", price: 10000 },
        { id: 5, title: "Название 5", price: 10000 },
        { id: 6, title: "Название 6", price: 10000 },
        { id: 7, title: "Название 7", price: 10000 }]
    let [catMode, setCatMode] = useState('promo');
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <a onClick={() => { setCatMode('promo')}} className={catMode==='promo'?[styles.activeLink, styles.link].join(" "):styles.link}>Акции</a>
                <a onClick={() => { setCatMode('popular') }} className={catMode === 'popular' ? [styles.activeLink, styles.link].join(" ") : styles.link}>Популярное</a>
            </div>
            <div className={styles.itemsWrapper}>
                {goods.map(good => <Item key={good.id} title={good.title} price={good.price} img={good.img} />)}
            </div>
            <div className={styles.linkContainer}><a className={styles.link}>Смотреть все <FontAwesomeIcon icon={faArrowRight} /></a></div>
        </div>
    );
}