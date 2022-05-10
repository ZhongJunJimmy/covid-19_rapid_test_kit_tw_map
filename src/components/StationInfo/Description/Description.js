import React from 'react';
import classes from './Description.module.css';

const Description = (props) => {
    return(
        <div className={classes.DescriptionWrapper}>
            {(props.data == '無')?"":props.data}
        </div>
    );
}

export default Description;
