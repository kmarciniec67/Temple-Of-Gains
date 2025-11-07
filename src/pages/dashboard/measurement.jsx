import React from "react";
import styles from './measurement.module.css';
import { Link } from "react-router-dom";

const Measurement = () =>{
    return(
        <div className={styles.measurementBackground}>
            <div className={styles.measurementContainer}>
                <h1>Measurement Page</h1>
                <p>Measurement page content</p>
                </div>
        </div>
    );
}

export default Measurement;