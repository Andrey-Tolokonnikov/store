import styles from './Catalogue.module.css'
import { NavLink } from 'react-router-dom'
import Item from './Item/Item'
export default function Catalogue(props) {
    let goods = [{ id: 1, title: "Название 1", price: 5000 }, { id: 2, title: "Название 2", price: 10000 }]
    console.log(styles.activeLink);
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <NavLink className={({ isActive }) => isActive ? [styles.activeLink, styles.link].join(" ") : styles.link} to="/">Акции</NavLink>
                <NavLink className={({ isActive }) => isActive ? [styles.activeLink, styles.link].join(" ") : styles.link} to="/popular">Популярное</NavLink>
            </div>
            <div className={styles.itemsWrapper}>
                {goods.map(good => <Item key={good.id} title={good.title} price={good.price} />)}
            </div>
        </div>
    );
}