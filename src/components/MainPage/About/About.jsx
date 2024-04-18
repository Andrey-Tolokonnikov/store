import styles from "./About.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStore } from "@fortawesome/fontawesome-free-solid"
export default function Catalogue() {
	return (
		<div className={styles.container}>
			<p className={styles.icon}><FontAwesomeIcon icon={faStore} /></p>
			<p className={styles.title}>О магазине</p>
			<p className={styles.description}>Описание. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut</p>
			<p><a className={styles.link} href="#">Подробнее</a></p>
		</div>
	)
}