import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSearch, faUser, faChartBar, faCartArrowDown } from "@fortawesome/fontawesome-free-solid"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import styles from "./Header.module.css"



export default function Header() {
    let cartItems = useSelector(state => state.profile.cart)
    let cartSize = cartItems.reduce((acc, item) => acc+item.num, 0)
    return (
        <header className={styles.header}>
            <div><FontAwesomeIcon icon={faBars} size="xl" /> Menu</div>
            <Link to='/'>
                <div className={styles.logo}>Store</div>
            </Link>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faSearch} size="xl" />
                <Link to="auth">
                    <FontAwesomeIcon icon={faUser} size="xl" />
                </Link>
                
                <FontAwesomeIcon icon={faChartBar} size="xl" />
                <Link to="cart">
                    <FontAwesomeIcon icon={faCartArrowDown} size="xl" />
                </Link>
                {cartSize>0?<div className={styles.cartSize}>{cartSize}</div>:""}
            </div>
        </header>)
}
