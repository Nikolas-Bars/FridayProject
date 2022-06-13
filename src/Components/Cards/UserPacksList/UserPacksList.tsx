import React from 'react';
import style from "./UserPacksList.module.css";
import {SearchBar} from "./SearchBar/SearchBar";

export const UserPacksList = () => {

    return (
        <div className={style.packs__body}>
            <h2>
                My packs list
            </h2>

            <SearchBar />

            {/*<ProfilePacks/>*/}

        </div>
    )
}