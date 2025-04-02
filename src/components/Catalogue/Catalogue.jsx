import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { getCatalogue as getCatalogueAPI } from "../../APIHandlers/CatalogueAPI"
import { setCatalogue, addToCatalogue } from "../../store/CatalogueSlice"
import ActiveItem from "./Item/ActiveItem/ActiveItem"
import Item from "./Item/Item"
import styles from "./Catalogue.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReportButton from "../ReportButton/ReportButton"
export default function Catalogue() {
    const catalogue = useSelector(state => state.catalogue.items)
    const cart = useSelector(state => state.profile.cart)
    const profile = useSelector(state => state.profile)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [activeItem, setActiveItem] = useState(null)
    
    // Состояния для управления интерфейсом
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [sortBy, setSortBy] = useState("price")
    const [sortOrder, setSortOrder] = useState("asc")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    useEffect(() => {
        async function getSetCatalogue() {
            const catalogue = await getCatalogueAPI(navigate)
            if (catalogue != null) {
                dispatch(setCatalogue(catalogue))
            }
        }
        getSetCatalogue()
    }, [])

    // Получение уникальных категорий
    const allCategories = useMemo(() => 
        [...new Set(catalogue.flatMap(item => item.categories || []))], 
    [catalogue]
    )

    // Обработка данных для отображения
    const processedCatalogue = useMemo(() => {
        let filtered = [...catalogue]
        
        // Фильтрация по категориям
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(item => 
                item.categories?.some(cat => selectedCategories.includes(cat)))
        }
        
        // Фильтрация по цене
        filtered = filtered.filter(item => {
            const price = item.price || 0
            const min = minPrice ? Number(minPrice) : -Infinity
            const max = maxPrice ? Number(maxPrice) : Infinity
            return price >= min && price <= max
        })
        
        // Сортировка
        return filtered.sort((a, b) => {
            const valA = a[sortBy]
            const valB = b[sortBy]
            
            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc" 
                    ? valA.localeCompare(valB) 
                    : valB.localeCompare(valA)
            }
            return sortOrder === "asc" ? valA - valB : valB - valA
        })
    }, [catalogue, selectedCategories, minPrice, maxPrice, sortBy, sortOrder])

    // Пагинация
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = processedCatalogue.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(processedCatalogue.length / itemsPerPage)

    // Сброс страницы при изменении параметров
    useEffect(() => setCurrentPage(1), [
        selectedCategories, 
        minPrice, 
        maxPrice, 
        sortBy, 
        sortOrder,
        itemsPerPage
    ])

    function addItemWithNoSave() {
        dispatch(addToCatalogue({ _id: 1, price: 0 }))
        setActiveItem(1)
    }

    function getQuantity(id) {
        const item = cart.find(item => item._id === id)
        return item ? item.num : 0
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ReportButton/>
                <p className={styles.title}>Каталог товаров:</p>
                {profile.role === "moder" && (
                    <div>
                        <FontAwesomeIcon 
                            onClick={addItemWithNoSave} 
                            className={styles.addButton} 
                            icon="fas fa-plus-circle" 
                        />
                    </div>
                )}
            </div>

            {/* Блок управления */}
            <div className={styles.controls}>
                <div className={styles.sorting}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="price">Цена</option>
                        <option value="title">Название</option>
                    </select>
                    
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>

                <div className={styles.filters}>
                    <div className={styles.priceFilter}>
                        <input
                            type="number"
                            placeholder="Мин. цена"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Макс. цена"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className={styles.categoryFilter}>
                        <h4>Категории:</h4>
                        {allCategories.map(cat => (
                            <label key={cat}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={(e) => {
                                        const checked = e.target.checked
                                        setSelectedCategories(prev =>
                                            checked 
                                                ? [...prev, cat] 
                                                : prev.filter(c => c !== cat)
                                        )
                                    }}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Список товаров */}
            {currentItems.map(item =>
                activeItem === item._id ? (
                    <ActiveItem
                        newItem={item._id === 1}
                        setActiveItem={setActiveItem}
                        key={item._id}
                        item={item}
                    />
                ) : (
                    <Item
                        setActiveItem={setActiveItem}
                        key={item._id}
                        item={item}
                        quantity={getQuantity(item._id)}
                    />
                )
            )}

            {/* Управление пагинацией */}
            <div className={styles.paginationControls}>
                <div className={styles.pageSizeSelector}>
                    <span>Показывать по:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Назад
                    </button>
                    
                    <span>
                        Страница {currentPage} из {totalPages || 1}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </div>
    )
}