import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import style from "./Pack.module.css";
import {useAppDispatch} from "../../../../../../Bll/store";
import arrow from '../../../../../../Common/img/arrow/arrow.png'
import {Questions} from "./Questions/Questions";
import {AddCard} from "../../../../SearchBar_addPack/AddCard/AddCard";
import {SearchBarAddPack} from "../../../../SearchBar_addPack/SearchBarAddPack";


export const Pack = () => {

    const {card} = useParams<'card'>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectPageCount, setSelectPageCount] = useState(5);


    useEffect(() => {
        if (card) {
            console.log('hello')
        }
    }, [dispatch, card])


    // useEffect(() => {
    //     setCurrentPage(page)
    // }, [page])

    return (
        <div className={style.pack__container}>
            <div className={style.pack__body}>
                <div className={style.pack__header}>
                    <img
                        src={arrow} alt="back"
                        onClick={() => navigate(-1)}
                    />
                    <h4>Pack Name</h4>
                </div>

                <SearchBarAddPack
                    buttonName='Add new card'
                    ModalComponent={AddCard}
                />

                <Questions />

                {/*<Paginator*/}
                {/*    totalItemsCount={cardPacksTotalCount}*/}
                {/*    pageSize={pageCount}*/}
                {/*    portionSize={5}*/}
                {/*/>*/}

            </div>
        </div>
    )
}