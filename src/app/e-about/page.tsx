import React from 'react'
import NavBar from '../e-component/NavBar/NavBar'
import styles from './page.module.css'

const ExperimentAbout = () => {
  return (
    <div className={styles['experimentabout-page-wrapper']}>
      <NavBar />
      <section className={styles['about']}>
        <div>
          gallery
        </div>
        <div>
          about
        </div>
      </section>
    </div>
  )
}

export default ExperimentAbout
