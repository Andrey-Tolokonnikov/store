import { useState } from "react"
import styles from "./CategoriesModal.module.css"

export default function CategoriesModal({
    initialCategories,
    onConfirm,
    onCancel,
}) {
    const [localCategories, setLocalCategories] = useState(
        initialCategories || [],
    ) // Локальное состояние

    const allCategories = [
        "периферия",
        "мышь",
        "клавиатура",
        "проводное",
        "беспроводное",
        "процессор",
        "игровое",
        "офисное",
        "надёжное",
        "новое",
        "старое",
        "производительное",
        "экономное",
        "монитор",
        "ноутбук",
        "USB",
        "HDMI",
        "SSD",
        "HDD",
        "материнская плата",
        "видеокарта",
        "оперативная память",
        "блок питания",
        "охлаждение",
        "пылеустойчивое",
        "подсветка",
        "эргономика",
        "аксессуары",
        "разгоняемое",
        "мобильное",
    ]

    // Обработка выбора/снятия категории
    function toggleCategory(category) {
        if (localCategories.includes(category)) {
            setLocalCategories(localCategories.filter((c) => c !== category))
        } else {
            setLocalCategories([...localCategories, category])
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h2>Выберите категории</h2>
                <div className={styles.list}>
                    {allCategories.map((category) => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                checked={localCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.confirm}
                        onClick={() => onConfirm(localCategories)} // Применяем изменения
                    >
                        Подтвердить
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={onCancel} // Закрываем без применения
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}
