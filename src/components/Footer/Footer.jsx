import styles from "./Footer.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSearch, faUser, faChartBar, faCartArrowDown } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {
    return (
        <footer>
            <div className={styles.contacts}>
                <p>+7 800 222 33 44</p>
                <p>г. Рязань, ул. Гагарина, 59/1</p>
            </div>
            <div className={styles.logo}>Store</div>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faSearch} size="xl"/>
                <FontAwesomeIcon icon={faUser} size="xl" />
                <FontAwesomeIcon icon={faChartBar} size="xl" />
                <FontAwesomeIcon icon={faCartArrowDown} size="xl" />
            </div>
        </footer>
    )
}
