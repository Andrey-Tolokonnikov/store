import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import styles from "./Review.module.css"

export default function Review({ review }) {
    return (
        <div className={styles.review}>
            <div className={styles.reviewHeader}>
                <span className={styles.author}>{review.user?.name || "Аноним"}</span>
                <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={index < review.rating ? styles.starActive : styles.star}
                        />
                    ))}
                </div>
                <span className={styles.date}>
                    {new Date(review.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </span>
            </div>
            <p className={styles.text}>{review.text}</p>
        </div>
    )
}