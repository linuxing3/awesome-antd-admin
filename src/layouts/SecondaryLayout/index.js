import React from 'react'

import styles from './index.css'

export default function(props) {
  return (
    <div className={styles.normal}>
      <h1>Layout for SecondaryLayout</h1>
      {props.children}
    </div>
  )
}
