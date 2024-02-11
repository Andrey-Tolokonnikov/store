import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faUser, faChartBar, faCartArrowDown } from '@fortawesome/fontawesome-free-solid'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

//fontawesome.library.add(faBars);

export default function Header(props) {
    let cartItems = useSelector(state => state.catalogue.items);
    let cartSize = cartItems.reduce((acc, item) => acc+item.inCart, 0);
    return (
        <header className={styles.header}>
            <div><FontAwesomeIcon icon={faBars} size="xl" /> Menu</div>
            <Link to='/'>
                <div className={styles.logo}>Store</div>
            </Link>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faSearch} size="xl" />
                <FontAwesomeIcon icon={faUser} size="xl" />
                <FontAwesomeIcon icon={faChartBar} size="xl" />
                <Link to="cart">
                    <FontAwesomeIcon icon={faCartArrowDown} size="xl" />
                </Link>
                {cartSize>0?<div className={styles.cartSize}>{cartSize}</div>:''}
            </div>
        </header>);
}
