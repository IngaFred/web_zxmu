import React from 'react';
import styles from './index.module.scss';

function Gonggao() {
  return (
    <div className={styles.homeAll}>
      <div className={styles.model_card}>
        <div className={styles.model_title_big}>课程大纲</div>
        <iframe
          style={{
            border: 'none',
            width: '100%',
            height: '100vh',
          }}
          src={'./教学大纲.html'}
        />
      </div>
    </div>
  );
}

export default Gonggao;
