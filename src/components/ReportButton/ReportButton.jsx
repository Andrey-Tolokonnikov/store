// components/ReportButton.js
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import "jspdf-autotable"
import { useSelector } from "react-redux"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ReportButton.module.css"
import { generateReport } from "../../APIHandlers/CatalogueAPI"

export default function ReportButton() {
    const user = useSelector(state => state.profile.user)

    const handleGenerateReport = async () => {
        try {
            const reportData = await generateReport()
            console.log(reportData)
            createPDF(reportData)
        } catch (error) {
            console.error("Error generating report:", error)
        }
    }

    const createPDF = (data) => {
        const doc = new jsPDF()
        
        // Заголовок
        doc.setFontSize(18)
        doc.text("Sell Report", 14, 22)
        doc.setFontSize(12)
        doc.text(`Formation date: ${new Date().toLocaleDateString()}`, 14, 28)
      
        // Подготовка данных для таблицы
        const tableData = data.map(item => [
            item.title,
            item.sold,
            item.inCarts,
            item.inFavorites,
            `${(item.sold * item.price).toString()} RUB.`
        ])
      
        // Генерация таблицы с использованием autoTable
        autoTable(doc, {
            startY: 35,
            head: [["Item", "Selled", "In cart", "In favs", "Money"]],
            body: tableData,
            theme: "grid",
            styles: { fontSize: 10 },
            headStyles: { 
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: "bold"
            },
            columnStyles: {
                0: { cellWidth: 60 },
                4: { cellWidth: 40 }
            }
        })
      
        // Итоги
        const totalSold = data.reduce((acc, item) => acc + item.sold, 0)
        const totalRevenue = data.reduce((acc, item) => acc + (item.sold * item.price), 0)
        const finalY = doc.lastAutoTable.finalY || 35
      
        doc.setFontSize(12)
        doc.text(`Selled: ${totalSold} things.`, 14, finalY + 10)
        doc.text(`Total Sum: ${totalRevenue.toLocaleString()} RUB.`, 14, finalY + 16)
      
        doc.save(`sales-report-${new Date().toISOString().slice(0,10)}.pdf`)
    }

    return (
        <button 
            className={styles.reportButton} 
            onClick={handleGenerateReport}
            aria-label="Сформировать отчет в PDF"
        >
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Экспорт отчета</span>
        </button>
    )
}