import React from 'react';
import classes from './StationInfo.module.css';

/*import Date from './Date/Date';*/
import Distance from './Distance/Distance'
import Name from './Name/Name'
import KitCount from './KitCount/KitCount'
/*import KitBrand from './KitBrand/KitBrand'*/
import Phone from './Phone/Phone'
import Description from './Description/Description'



const stationInfo = (props) => {
    return(
        <div className={classes.StationInfoWrapper}>
            <div className={classes.StationDistanceWrapper}>

                <Name data={props.data} currentLat={props.curLat} currentLng={props.curLng}/>
                <Phone data={props.data.phone}/>
                <Distance data={props.data.distance}/>
            </div>
            <div className={classes.StationDataWrapper}>
                <KitCount data={props.data.kitCnt} brand={props.data.kitBrand} />
                {/*<KitBrand data={props.data.kitBrand}/>*/}
                <Description data={props.data.description}/>
                {/* <Date data={props.data.date}/> */}
            </div>

        </div>
    );
}

export default stationInfo;
