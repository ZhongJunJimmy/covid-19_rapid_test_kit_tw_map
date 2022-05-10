import {React} from 'react'

import classes from './FloatCard.module.css';

const floatCard = (props) => {
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <div className={classes.Card}>
                    TTT
                </div>
            </div>
        </div>
    ):"";
}

export default floatCard;