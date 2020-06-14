import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'

const SizeSlider = (props) => {
    // console.log(props);
    const updateBoardSize = props.updateBoardSize;
    const board = props.board;

    const handleRowChange = (event, newValue) => {
        // console.log('row ', newValue);
        updateBoardSize(newValue, board.current[0].length);
    };

    const handleColChange = (event, newValue) => {
        // console.log('col ', newValue);
        console.log(board.current[0].length);
        updateBoardSize(board.current.length, newValue);
    };

    return (
        <div className="content-header__slider"
            // disabled={isVisualized}
            id = "size-slider">
            <Typography id="discrete-slider-restrict" 
                        className="header-font"
                        gutterBottom>
                Row / Col Size
            </Typography>
            <SingleSilder
                id = 'row-slider'
                defVal = {16}
                step = {1}
                min = {12}
                max = {16}
                handleChange = {handleRowChange}
                disabled={props.disabled}
                />
            <SingleSilder
                id = 'col-slider'
                defVal = {30}
                step = {1}
                min = {18}
                max = {30}
                handleChange = {handleColChange}
                disabled={props.disabled}
                />
            {/* <Typography id="discrete-slider-restrict" gutterBottom>
                Col Size
            </Typography> */}
        </div>
    );
};

export const SingleSilder = (props) => {
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
            disabled={props.disabled}
            />
    );
}

export default SizeSlider;