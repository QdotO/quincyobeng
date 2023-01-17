import React from 'react'
import styles from '../../../../styles/Message.module.css'

type Props = {}

const Message = (props: Props) => {
  const years = new Date().getUTCFullYear() - 2014
  const resumeUrl =
    'https://drive.google.com/uc?export=download&id=1vR0ZK-7SwM_lpSj1c2Yx0XMJnRAugO5g'
  const handleResumeClick = () => {
    window?.open(resumeUrl)
  }
  return (
    <div className={styles.messageContainer}>
      <div className={styles.welcomeMessage}>{`Hi, I'm Quincy Obeng`}</div>
      <div className={styles.description}>
        {`I am a Senior Software Engineer with ${years} years of
        experience. I'm passionate about user experience and
        building solutions that are `}
        <span className={styles.descriptors}>simple</span>
        {', '} <span className={styles.descriptors}>easy to use</span>
        {', '} <span className={styles.descriptors}>helpful</span>
        {'. '} <br /> {`Let's build something!`}
      </div>
      <button
        className={styles.resumeDownload}
        type='button'
        onClick={handleResumeClick}
      >
        Download My Resume
      </button>
    </div>
  )
}

export default Message
