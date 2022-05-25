import React, {ChangeEvent, useState} from 'react'
import SuperInputText from './c1-SuperInputText/SuperInputText'
import s from './HW4.module.css'
import SuperButton from './c2-SuperButton/SuperButton'
import SuperCheckbox from './c3-SuperCheckbox/SuperCheckbox'

function HW4() {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <hr/>
            <h3>SuperInput</h3>

            <div className={s.column}>
                <SuperInputText type={'password'} value={text} onChangeText={setText} onEnter={showAlert} spanClassName={s.testSpanError} className={s.testInputClassName} error = {error}/>


                <SuperInputText type={'number'} className={s.blue} />


                {/*----------------------------------------------------*/}
                <h3>SuperButton</h3>
                <SuperButton>
                    default
                </SuperButton>

                <SuperButton red  onClick={showAlert} >{/*// пропсу с булевым значением не обязательно указывать true*/}
                     delete {/*// название кнопки попадёт в children*/}
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>

                {/*----------------------------------------------------*/}

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>

                {/*// onChange тоже должен работать*/}

                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeSuperInputText/>*/}
            {/*<AlternativeSuperButton/>*/}
            {/*<AlternativeSuperCheckbox/>*/}
            <hr/>
        </div>
    )
}

export default HW4
