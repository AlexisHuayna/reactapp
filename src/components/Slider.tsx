import React from 'react';

const Slider = (props: any) => {

    const less = () => {
        if((props.value - parseFloat(props.step)) < parseFloat(props.min)) {
            props.setValue(parseFloat(props.min))
        } else {
            props.setValue(props.value - parseFloat(props.step));
        }
    }

    const add = () => {
        if((props.value + parseFloat(props.step)) > parseFloat(props.max)) {
            props.setValue(parseFloat(props.max));
        } else {
            props.setValue(props.value + parseFloat(props.step));
        }
    }

    const handleOnChange = (e:any) => {
        props.setValue(parseFloat(e));
    }

    return (
        <div>
            {props.title ? <p>{props.title}</p>: <></>}
            <button
                onClick={less}>
                -
            </button>
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={e => handleOnChange(e.target.value)}
                value={props.value}
            />
            <button
                onClick={add}>
                + 
            </button>
            <p>{props.value} {props.measurement}</p>
            
        </div>
    );
}

export default Slider;