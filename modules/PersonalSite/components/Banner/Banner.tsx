import Image from 'next/image'
import React from 'react'
import styles from '../../../../styles/Banner.module.css'
import HeroImg from '../../../../public/heroImage.jpeg'
import Message from './Message'

type Props = {}

const Banner = (props: Props) => {
  return (
    <div className={styles.BannerContainer}>
      <div>
        <div className={styles.dividerContainer}>
          <hr className={styles.divider} />
        </div>
        <Message />
      </div>
      <Image className='banner-img' src={HeroImg} alt='Quincy Obeng' priority />
    </div>
  )
}

export default Banner
