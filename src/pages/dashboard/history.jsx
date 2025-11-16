import React, { useEffect, useState } from "react";
import styles from './history.module.css';

const History = () => {
return (
    <div className={styles.historyBackground}>
      <div className={styles.historyContainer}>
        <h1>My history</h1>
      </div>
    </div>
  );
}

export default History;