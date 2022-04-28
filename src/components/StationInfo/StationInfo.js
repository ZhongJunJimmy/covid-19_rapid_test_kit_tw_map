import React from 'react';
import classes from './StationInfo.module.css';

import Date from './Date/Date';
import Distance from './Distance/Distance'
import Name from './Name/Name'
import KitCount from './KitCount/KitCount'
import KitBrand from './KitBrand/KitBrand'
import Phone from './Phone/Phone'



const stationInfo = (props) => {
    return(
        <div className={classes.StationInfoWrapper}>
            <div className={classes.StationDistanceWrapper}>
                <Name data={props.data} currentLat={props.curLat} currentLng={props.curLng}/>
                {/* <Phone data={props.data.phone}/> */}
                <Distance data={props.data.distance}/>
            </div>
            <div className={classes.StationDataWrapper}>
                {/* <KitBrand data={props.data.kitBrand}/> */}
                <KitCount data={props.data.kitCnt}/>
                {/* <Date data={props.data.date}/> */}
            </div>
            
        </div>
    );
}

export default stationInfo;