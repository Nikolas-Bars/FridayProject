import React from 'react';
import style from "./UserPacksList.module.css";
import {SearchBarAddPack} from "./SearchBar_addPack/SearchBarAddPack";
import {ProfilePacks} from './ProfilePacks/ProfilePacks';

export const UserPacksList = () => {

    return (
        <div className={style.packs__body}>
            <h2>
                My packs list
            </h2>

            <SearchBarAddPack />

            <ProfilePacks/>

        </div>
    )
}