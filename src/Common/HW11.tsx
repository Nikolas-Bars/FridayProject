import React, {ChangeEvent, useState} from 'react'
import SuperRange from './c7-SuperRange/SuperRange'
import SuperDoubleRange from './c8-SuperDoubleRange/SuperDoubleRange'
import HW6 from "./HW6";


function HW11() {
    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(50)

    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=>{
        setValue1(+e.currentTarget.value)

    }

    const handleChange =(num1: number, num2: number)=>{
        setValue1(num1)
        setValue2(num2)
    }

    return (
        <div style={{display: "flex", flexDirection: 'column', alignItems: "center", width: '400px',margin: '10px', backgroundColor: 'wheat', padding: '20px', borderRadius: '15px'}}>
            <hr/>
            <h3>SuperRange</h3>

            {/*should work (должно работать)*/}
            <div>

                <SuperRange value={value1} onChange={onChangeHandler} /> <span>{value1}</span>
            </div>

            <div >
                <SuperDoubleRange value={[value1, value2]} handleChange={handleChange} />
            </div>

            <HW6/>
            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeSuperRange/>*/}
            {/*<AlternativeSuperDoubleRange/>*/}
            <hr/>
        </div>
    )
}

export default HW11
