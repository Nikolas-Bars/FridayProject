import React, {useState} from 'react'
import SuperEditableSpan from './c4-SuperEditableSpan/SuperEditableSpan'
import SuperButton from './c2-SuperButton/SuperButton'
import {restoreState, saveState} from './localStorage/localStorage'

function HW6() {
    const [value, setValue] = useState<string>('')

    const save = () => {
        saveState<string>('editable-span-value', value)
    }
    const restore = () => {
        let valueFromLocalStorage = localStorage.getItem('editable-span-value')
        if(valueFromLocalStorage ) {
            setValue(valueFromLocalStorage.replace(/^.|.$/g,""))
        }}

    return (
        <div style={{display: "flex", flexDirection:"column", justifyContent: 'center'}}>
            <hr/>
            {/*should work (должно работать)*/}
            <div>
                <h3>SuperEditableSpan</h3>
                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />
            </div>
            <SuperButton onClick={save}>save</SuperButton>
            <SuperButton onClick={restore}>restore</SuperButton>

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeSuperEditableSpan/>*/}
            <hr/>
        </div>
    )
}

export default HW6
