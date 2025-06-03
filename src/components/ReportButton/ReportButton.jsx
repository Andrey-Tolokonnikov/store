import { Document, Paragraph, TextRun, HeadingLevel, Packer } from "docx"
import { saveAs } from "file-saver"
import { useSelector } from "react-redux"
import { faFileWord } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ReportButton.module.css"
import { generateReport } from "../../APIHandlers/CatalogueAPI"
import { TableCell, Table, TableRow } from "docx"
import { WidthType } from "docx"
import { useState } from "react"
import { DateRangeModal } from "../DateRangeModel/DateRangeModal"

export default function ReportButton() {
    const user = useSelector(state => state.profile.user)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dateRange, setDateRange] = useState(null)

    const handleGenerateReport = () => {
        setIsModalOpen(true)
    }

    const handleApplyDateRange = async (range) => {
        setDateRange(range)
        try {
            const reportData = await generateReport(range)
            createDocx(reportData, range)
        } catch (error) {
            console.error("Error generating report:", error)
        }
    }

    // const handleGenerateReport = async () => {
    //     try {
    //         const reportData = await generateReport()
    //         createDocx(reportData)
    //     } catch (error) {
    //         console.error("Error generating report:", error)
    //     }
    // }

    const createDocx = async (data, range) => {
        // Подготовка данных для таблицы
        const tableRows = data.map(item => [
            new Paragraph({
                children: [new TextRun({ text: item.title, size: 22 })],
            }),
            new Paragraph({
                children: [new TextRun({ text: item.sold.toString(), size: 22 })],
                alignment: "right"
            }),
            new Paragraph({
                children: [new TextRun({ text: item.inCarts.toString(), size: 22 })],
                alignment: "right"
            }),
            new Paragraph({
                children: [new TextRun({ text: item.inFavorites.toString(), size: 22 })],
                alignment: "right"
            }),
            new Paragraph({
                children: [new TextRun({ 
                    text: `${(item.sold * item.price).toLocaleString("ru-RU")} RUB.`, 
                    size: 22 
                })],
                alignment: "right"
            })
        ])

        // Итоговые значения
        const totalSold = data.reduce((acc, item) => acc + item.sold, 0)
        const totalRevenue = data.reduce((acc, item) => acc + (item.sold * item.price), 0)

        // Создание документа
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        text: "Отчёт по продажам",
                        heading: HeadingLevel.HEADING_1,
                        alignment: "center",
                        spacing: { after: 400 }
                    }),
                    new Paragraph({
                        text: `Дата формирования: ${new Date().toLocaleDateString()}`,
                        alignment: "center",
                        spacing: { after: 400 }
                    }),
                    new Paragraph({
                        text: `Период совершения заказов: ${new Date(range.startDate).toLocaleDateString()}-${new Date(range.endDate).toLocaleDateString()}`,
                        alignment: "center",
                        spacing: { after: 400 }
                    }),
                    new Paragraph({
                        text: "Данные по продажам",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { after: 200 }
                    }),
                    // Таблица
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            // Заголовки таблицы
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Товар")] }),
                                    new TableCell({ children: [new Paragraph("Продано")] }),
                                    new TableCell({ children: [new Paragraph("В корзинах")] }),
                                    new TableCell({ children: [new Paragraph("В избранном")] }),
                                    new TableCell({ children: [new Paragraph("Сумма")] }),
                                ],
                                tableHeader: true
                            }),
                            // Данные таблицы
                            ...data.map(item => new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph(item.title)] }),
                                    new TableCell({ children: [new Paragraph(item.sold.toString())] }),
                                    new TableCell({ children: [new Paragraph(item.inCarts.toString())] }),
                                    new TableCell({ children: [new Paragraph(item.inFavorites.toString())] }),
                                    new TableCell({ 
                                        children: [new Paragraph(
                                            `${(item.sold * item.price).toLocaleString("ru-RU")} RUB.`
                                        )] 
                                    }),
                                ]
                            }))
                        ]
                    }),
                    // Итоги
                    new Paragraph({
                        text: `Количество проданного товара: ${totalSold}`,
                        spacing: { before: 400, after: 100 }
                    }),
                    new Paragraph({
                        text: `Общая сумма продаж: ${totalRevenue.toLocaleString("ru-RU")} руб.`,
                        spacing: { after: 400 }
                    })
                ]
            }]
        })

        // Генерация и сохранение файла
        const blob = await Packer.toBlob(doc)
        saveAs(blob, `sales-report-${new Date().toISOString().slice(0,10)}.docx`)
    }

    return (
        <>
            <button 
                className={styles.reportButton} 
                onClick={handleGenerateReport}
                aria-label="Generate report in Word"
            >
                <FontAwesomeIcon icon={faFileWord} />
                <span>Сгенерировать отчёт</span>
            
            </button>
            <DateRangeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={handleApplyDateRange}
            />
        </>
    )
}