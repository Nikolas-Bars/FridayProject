import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



type PropsType ={
    value: number[],
    handleChange: (num1: number, num2: number) => void
    width?: string
}

export default function SuperDoubleRange(props: PropsType) {

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });

    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([52, 3]);

    const handleChange = (event: any, newValue: number | number[]) => {

        // @ts-ignore
        props.handleChange(newValue[0], newValue[1])
       // setValue(newValue as number[]);
    };

    const style={
        marginLeft: '10px',
        width: props.width
    }

        return (
            <>
                <div className={classes.root} style={style}>

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