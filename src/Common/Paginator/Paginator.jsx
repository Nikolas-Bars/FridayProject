import React, {useState} from "react";
import s from './Paginator.module.css'
import cn from 'classnames'


const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize) // делим все приходящие с сервера элементы на кол-во элементов отображаемых на одной странице

    let pages = []; // каждый номер страницы

    for (let i = 1; i <= pagesCount; i++) { // пробегаемся по кол-ву страниц и создаем для каждой соответствующую цифру в массиве
        pages.push(i);
    }

    let portionCount = Math.ceil(pages.length / portionSize) // делим количество страниц из массива на размер порций (151 / 10) (порция - количество отображаемых на пагинаторе элементов (а справа и слева будут кнопки))
    let [portinonNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portinonNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portinonNumber * portionSize

    return <div className={s.paginator}>
        {portinonNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portinonNumber - 1)
        }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {

                return <div key={p}
                            onClick={(e) => {
                                onPageChange(p)
                       }} className={p == currentPage ? s.active : s.pageNumber}>{p}</div>
            })}


        {portionCount > portinonNumber &&
        <button onClick={() => {
            setPortionNumber(portinonNumber + 1)
        }}>NEXT</button>}

    </div>

}


export default Paginator