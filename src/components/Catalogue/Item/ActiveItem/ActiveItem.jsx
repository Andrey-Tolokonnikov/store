import styles from "./ActiveItem.module.css"
import defImg from "./../../../../img/default.png"
import { useState, useRef } from "react"
import {
    addToCatalogue,
    updateCatalogue,
} from "../../../../APIHandlers/CatalogueAPI"
import {
    deleteFromCatalogue,
    setCatalogue,
} from "../../../../store/CatalogueSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import CategoriesModal from "./CategoriesModal/CategoriesModal" // Импортируем компонент модального окна

export default function ActiveItem(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const imgInputRef = useRef()

    const [itemTitle, setItemTitle] = useState(props.item.title)
    const [itemConfig, setItemConfig] = useState(props.item.config)
    const [itemPrice, setItemPrice] = useState(props.item.price)
    const [itemDesc, setItemDesc] = useState(props.item.desc)
    const [categories, setCategories] = useState(props.item.categories || []) // Храним категории

    const [imgEncoded, setImgEncoded] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false) // Управляем состоянием модального окна

    function handleImg(e) {
        var reader = new FileReader()
        let f = e.target.files[0]

        reader.onload = function (e) {
            setImgEncoded(e.target.result)
        }
        reader.readAsDataURL(f)
    }

    async function updateItem(e) {
        e.preventDefault()
        const catalogue = await updateCatalogue(
            {
                _id: props.item._id,
                title: itemTitle,
                config: itemConfig,
                price: itemPrice,
                desc: itemDesc,
                img: imgEncoded,
                categories,
            },
            navigate,
        )
        if (catalogue != null) {
            dispatch(setCatalogue(catalogue))
        }
        props.setActiveItem(null)
    }

    async function addItem(e) {
        e.preventDefault()
        const catalogue = await addToCatalogue(
            {
                title: itemTitle,
                config: itemConfig,
                price: itemPrice,
                desc: itemDesc,
                img: imgEncoded,
                categories,
            },
            navigate,
        )
        if (catalogue != null) {
            dispatch(setCatalogue(catalogue))
        }
        props.setActiveItem(null)
    }

    function cancel() {
        if (props.newItem) {
            dispatch(deleteFromCatalogue(props.item._id))
        }
        props.setActiveItem(null)
    }

    return (
        <form
            className={styles.item}
            onSubmit={(e) => (props.newItem ? addItem(e) : updateItem(e))}
        >
            <div className={styles.description}>
                <img
                    className={styles.img}
                    src={props.item.img ?? defImg}
                ></img>
                <div className={styles.text}>
                    Название:{" "}
                    <input
                        required
                        className={styles.title}
                        onChange={(e) => setItemTitle(e.target.value)}
                        value={itemTitle}
                    />
                    Конфигурация:{" "}
                    <input
                        required
                        onChange={(e) => setItemConfig(e.target.value)}
                        value={itemConfig ?? "medium"}
                    />
                    Цена:{" "}
                    <div>
                        <input
                            required
                            type="number"
                            onChange={(e) => setItemPrice(e.target.value)}
                            value={itemPrice}
                        />{" "}
                        руб/шт
                    </div>
                    Описание:{" "}
                    <textarea
                        required
                        onChange={(e) => setItemDesc(e.target.value)}
                        value={itemDesc}
                    />
                    Добавить/Изменить фото:{" "}
                    <input
                        ref={imgInputRef}
                        onChange={(e) => handleImg(e)}
                        type="file"
                        accept="image/png, image/jpeg"
                    />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    <button type="submit" className={styles.confirm}>
                        Подтвердить
                    </button>
                    <button
                        type="button"
                        className={styles.neutral}
                        onClick={() => setIsModalOpen(true)} // Открываем модальное окно
                    >
                        Категории
                    </button>
                    <button className={styles.cancel} onClick={cancel}>
                        Отмена
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <CategoriesModal
                    initialCategories={categories} // Передаём текущие категории
                    onConfirm={(updatedCategories) => {
                        setCategories(updatedCategories) // Применяем только при подтверждении
                        setIsModalOpen(false) // Закрываем окно
                    }}
                    onCancel={() => setIsModalOpen(false)} // Просто закрываем окно без изменений
                />
            )}
        </form>
    )
}
