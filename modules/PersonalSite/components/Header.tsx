import Link from 'next/link'
import React from 'react'
import styles from '../../../styles/Header.module.css'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className={styles.headerContainer}>
      <Link className={styles.headerText} href='/'>
        QuincyObeng.com
      </Link>
      {/* <div className={styles.headerLinkContainer} >
                <a className={styles.headerLink} href='/about'>About</a>
                <hr className={styles.divider} />
                <a className={styles.headerLink}  href='/posts'>Posts</a>
                <hr className={styles.divider} />
                <a className={styles.headerLink}  href='/contact'>Contact Quincy</a>
            </div className={styles.headerLinkContainer} > */}
    </div>
  )
}

export default Header
