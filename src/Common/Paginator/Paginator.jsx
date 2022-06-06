import React, {useState} from "react";
import s from './Paginator.module.css'


const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize}) => {
debugger

       let pagesCount = Math.ceil(totalItemsCount / pageSize) // количество страниц (порций)

        let pages = []; // каждый номер страницы

        for (let i = 1; i <= pagesCount; i++){
            pages.push(i);
        }

        let portionCount = Math.ceil(pages.length / portionSize) // делим количество страниц на размер порций (151 / 10)
        let [portinonNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portinonNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portinonNumber * portionSize

        return <div className={s.paginator}>
            {portinonNumber > 1 &&
            <button onClick={()=>{setPortionNumber(portinonNumber - 1)}}>PREV</button>}

            {pages
                .filter(p=>p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p)=>{
                    return <div style={{
                        color: 'white',
                        backgroundColor: "black",
                        padding: '3px',
                        border: '1px solid gold'
                    }} //стиль pageNumber применится в любом случае,
                                 key={p}
                                 onClick={(e)=>{
                                     onPageChange(p)
                                 }}>{p}</div>
                    })}


{portionCount > portinonNumber  &&
<button onClick={()=> {setPortionNumber(portinonNumber + 1)}}>NEXT</button>}

        </div>

}


 export default Paginator