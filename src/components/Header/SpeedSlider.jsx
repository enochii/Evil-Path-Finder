import { SingleSilder } from "./SizeSlider";
import React from 'react';
import Typography from '@material-ui/core/Typography'

const { DELAY_FAST } = require("constants");


const SpeedSlider = (props) => {
    const MAX_VAL = 300;
    const handleChange = (event, newValue) => {
        console.log(newValue);
        props.onDelayChange(event, newValue);
    };

    return (
        <div className="content-header__delay"
            // onChange={props.onDelayChange}
            // defaultValue={DELAY_FAST}
            // disabled={props.disabled}
            id = "speed-slider">
            <SingleSilder
                id = 'row-slider'
                defVal = {100}
                step = {50}
                min = {50}
                max = {MAX_VAL}
                handleChange = {handleChange}
                disabled={props.disabled}
                
                />
        </div>
    );
}

export default SpeedSlider;