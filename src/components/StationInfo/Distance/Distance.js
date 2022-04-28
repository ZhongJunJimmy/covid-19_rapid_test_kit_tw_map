import React from 'react';
import classes from './Distance.module.css';

const distance = (props) => {
    return(
        <div className={classes.DistanceWrapper}>
            {(props.data > 1000)?`${(Math.floor(props.data)/1000).toFixed(2)}km`:`${(Math.floor(props.data)).toFixed(2)}m`}
        </div>
    );
}

export default distance;