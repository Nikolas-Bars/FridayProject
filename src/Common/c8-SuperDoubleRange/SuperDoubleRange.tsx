import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

type PropsType ={
    value: number[],
    handleChange: (num1: number, num2: number) => void
}

export default function SuperDoubleRange(props: PropsType) {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([52, 3]);

    const handleChange = (event: any, newValue: number | number[]) => {

        // @ts-ignore
        props.handleChange(newValue[0], newValue[1])
       // setValue(newValue as number[]);
    };
        return (
            <>
                <div className={classes.root} style={{marginLeft: '10px'}}>

                    <Slider
                        value={props.value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"

                    />
                </div>
            </>
        )

}