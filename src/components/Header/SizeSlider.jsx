import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'

const SizeSlider = (props) => {
    console.log(props);
    const handleChange = (event, newValue) => {
        console.log(newValue);
    };
    return (
        // <button variant="contained" color="primary" 
        //     className="content-header__button"
        //     tyee="button">
        //     你好，世界
        // </button>
        <div className="content-header__slider"
            // disabled={isVisualized}
            id = "size-slider">
            <Typography id="discrete-slider-restrict" gutterBottom>
                Row / Col Size
            </Typography>
            <SingleSilder
                id = 'col-slider'
                defVal = {14}
                step = {1}
                min = {8}
                max = {16}
                handleChange = {handleChange}
                />
            <SingleSilder
                id = 'col-slider'
                defVal = {14}
                step = {1}
                min = {18}
                max = {30}
                handleChange = {handleChange}
                />
            {/* <Typography id="discrete-slider-restrict" gutterBottom>
                Col Size
            </Typography> */}
        </div>
    );
};

const SingleSilder = (props) => {
    return (
        <Slider
            defaultValue={props.defVal}
            aria-labelledby="discrete-slider-small-steps"
            step={props.step}
            marks
            min={props.min}
            max={props.max}
            valueLabelDisplay="auto"
            onChange={props.handleChange}
            />
    );
}

export default SizeSlider;