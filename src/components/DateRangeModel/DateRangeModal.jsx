// components/DateRangeModal.js
import { useState } from "react"
import styles from "./DateRangeMoal.module.css"

export const DateRangeModal = ({ isOpen, onClose, onApply }) => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (startDate && endDate) {
            onApply({ startDate, endDate })
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Выберите диапазон дат</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Начальная дата:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Конечная дата:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
              Отмена
                        </button>
                        <button type="submit" className={styles.applyButton}>
              Применить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}