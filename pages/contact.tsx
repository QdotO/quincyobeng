import React from 'react'
import styles from '../styles/Contact.module.css'
import Header from '../modules/PersonalSite/components/Header'

type Props = {}

const Contact = (props: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <h2>My Contact Details</h2>
        <div className={styles.contactCard}>
          <div>
            <label>Email</label>
            <div className={styles.detail}>Quincyobeng@gmail.com</div>
          </div>
          <div>
            <label>Phone Number</label>
            <div className={styles.detail}>832 420-8236</div>
          </div>
          <div>
            <label>Twitter</label>
            <div className={styles.detail}>@QuincyTheEngineer</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
