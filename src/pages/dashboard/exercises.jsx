import React, { useEffect, useState } from "react";
import styles from './exercises.module.css';

const Exercises = () => {
return (
    <div className={styles.exercisesBackground}>
      <div className={styles.exercisesContainer}>
        <h1>My Exercises</h1>
      </div>
    </div>
  );
}

export default Exercises;