import React from 'react'
import styles from "./Bar.module.scss";
// https://codepen.io/MrHill/pen/avKfz

const Bar = () => (
    <div className={styles.loader}>
        <div className={styles.progressbar}>
            <div className={styles.progressstripes}/>
            <div className={styles.percentage}>0%</div>
        </div>
    </div>
);

export default Bar;

