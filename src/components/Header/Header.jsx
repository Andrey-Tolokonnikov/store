import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faUser, faChartBar, faCartArrowDown } from '@fortawesome/fontawesome-free-solid'

import styles from './Header.module.css'

//fontawesome.library.add(faBars);

export default function Header(props) {
    return (
        <header className={styles.header}>
            <div><FontAwesomeIcon icon={faBars} size="xl" /> Menu</div>
            <div className={styles.logo}>Store</div>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faSearch} size="xl" />
                <FontAwesomeIcon icon={faUser} size="xl" />
                <FontAwesomeIcon icon={faChartBar} size="xl" />
                <FontAwesomeIcon icon={faCartArrowDown} size="xl" />
            </div>
        </header>);
}